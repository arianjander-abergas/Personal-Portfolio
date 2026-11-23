/**
 * Contact form endpoint (a Vercel serverless function, served at /api/contact).
 *
 * The pop-up on the site posts JSON here:
 *   { name, email, subject, message, attachments: [{ name, data (base64) }], company, elapsed }
 * and this function emails it to the site owner through Gmail, with the visitor's address as Reply-To.
 *
 * Set these in Vercel (Project Settings, Environment Variables), then redeploy:
 *   GMAIL_USER          the Gmail address that sends the message, e.g. arianjanderabergas@gmail.com
 *   GMAIL_APP_PASSWORD  a Google App Password for that account (16 letters, spaces are fine)
 *   CONTACT_TO          optional: where messages are delivered; defaults to GMAIL_USER
 */
const nodemailer = require("nodemailer");

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000, files: 3, totalBytes: 3 * 1024 * 1024 };
const ALLOWED_EXT = new Set([
  "pdf", "png", "jpg", "jpeg", "gif", "webp", "heic",
  "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv", "rtf", "odt", "zip",
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;

// Best-effort limit per visitor. It only lasts while one server instance stays warm,
// so it slows abuse down rather than stopping it completely.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map();

function reply(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  // On Vercel the JSON body is already parsed into req.body.
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 4.5 * 1024 * 1024) throw Object.assign(new Error("too large"), { status: 413 });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

// One line of text, with control characters (including line breaks) removed.
const oneLine = (value) => String(value ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { ok: false, error: "Use POST." });
  }

  // Only accept messages sent from this site's own pages.
  const origin = req.headers.origin;
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch (e) {
      /* malformed origin: treated as foreign */
    }
    if (originHost !== req.headers.host) return reply(res, 403, { ok: false, error: "Not allowed." });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return reply(res, 503, { ok: false, code: "not_configured", error: "The message service is not set up yet." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    const tooBig = e.status === 413;
    return reply(res, tooBig ? 413 : 400, { ok: false, error: tooBig ? "That is too much to send at once." : "The message could not be read." });
  }
  if (!body || typeof body !== "object") return reply(res, 400, { ok: false, error: "The message could not be read." });

  // Bots fill in the hidden "company" field, or submit within a moment of the form opening.
  // Answer as if it worked so they move on, but send nothing.
  const elapsed = Number(body.elapsed);
  if (oneLine(body.company) || (Number.isFinite(elapsed) && elapsed < 3000)) return reply(res, 200, { ok: true });

  const name = oneLine(body.name);
  const email = oneLine(body.email);
  const subject = oneLine(body.subject);
  const message = String(body.message ?? "").replace(/\r\n?/g, "\n").trim();
  const problems = [];
  if (!name || name.length > LIMITS.name) problems.push("your name");
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) problems.push("your email address");
  if (subject.length > LIMITS.subject) problems.push("the subject (150 characters at most)");
  if (!message) problems.push("your message");
  else if (message.length > LIMITS.message) problems.push("the message (5000 characters at most)");
  if (problems.length) return reply(res, 400, { ok: false, error: `Please check ${problems.join(", ")}.` });

  const files = Array.isArray(body.attachments) ? body.attachments : [];
  if (files.length > LIMITS.files) return reply(res, 400, { ok: false, error: `You can attach up to ${LIMITS.files} files.` });
  const attachments = [];
  let total = 0;
  for (const file of files) {
    const filename = oneLine(file && file.name).replace(/[\\/:*?"<>|]+/g, "_").slice(-120) || "attachment";
    const ext = filename.includes(".") ? filename.split(".").pop().toLowerCase() : "";
    if (!ALLOWED_EXT.has(ext)) return reply(res, 400, { ok: false, error: `"${filename}" is not a file type I can accept.` });
    const data = file && typeof file.data === "string" ? file.data : "";
    if (!data || !BASE64_RE.test(data)) return reply(res, 400, { ok: false, error: `"${filename}" could not be read.` });
    const content = Buffer.from(data, "base64");
    total += content.length;
    if (total > LIMITS.totalBytes) return reply(res, 413, { ok: false, error: "Attachments can be up to 3 MB in total." });
    attachments.push({ filename, content }); // the content type is worked out from the file name, not trusted from the browser
  }

  const ip = String(req.headers["x-forwarded-for"] || (req.socket && req.socket.remoteAddress) || "unknown")
    .split(",")[0]
    .trim();
  const now = Date.now();
  if (recent.size > 500) for (const [key, times] of recent) if (times.every((t) => now - t > WINDOW_MS)) recent.delete(key);
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    return reply(res, 429, { ok: false, error: "Too many messages in a short time. Please try again in a few minutes." });
  }
  hits.push(now);
  recent.set(ip, hits);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, "") },
  });
  const site = oneLine(req.headers.host) || "your portfolio";
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : null,
    "",
    message,
    "",
    attachments.length ? `Attachments: ${attachments.map((a) => a.filename).join(", ")}` : null,
    "--",
    `Sent from the contact form on ${site}. Reply to this email to answer ${name} directly.`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: GMAIL_USER },
      to: CONTACT_TO || GMAIL_USER,
      replyTo: { name, address: email },
      subject: `Portfolio message from ${name}${subject ? `: ${subject}` : ""}`,
      text,
      attachments,
    });
  } catch (err) {
    console.error("contact form: sending failed:", err && err.message);
    return reply(res, 502, { ok: false, error: "The message could not be sent right now." });
  }
  return reply(res, 200, { ok: true });
};
