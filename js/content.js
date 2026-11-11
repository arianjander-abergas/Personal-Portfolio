/*
  ALL personal content lives in this file.
  Replace every value wrapped in [SQUARE BRACKETS] with your real information.
  Nothing else needs to be edited to update the text on the site.
*/
const CONTENT = {
  name: "Arian Jander C. Abergas",
  initials: "AJA",
  // Hovering (or tapping) this part of the name pops up a thought balloon with the text.
  nameHint: { target: "C.", text: "Cristobal" },

  hero: {
    eyebrow: "Portfolio · 2026",
    role: "[YOUR ROLE, e.g. IT Student & Aspiring Developer]",
    tagline: "[A short one-line tagline about what you do or care about.]",
  },

  about: {
    photo: "", // e.g. "assets/profile.jpg" — leave empty to show your initials instead
    paragraphs: [
      "[First paragraph: who you are, what you study, and what kind of work you enjoy.]",
      "[Second paragraph: what you are currently learning or looking for, e.g. an internship.]",
    ],
    education: [
      {
        years: "[YEAR – YEAR]",
        school: "[COLLEGE / UNIVERSITY NAME]",
        detail: "[Degree or course, e.g. BS in Information Technology]",
      },
      {
        years: "[YEAR – YEAR]",
        school: "[SENIOR HIGH SCHOOL NAME]",
        detail: "[Strand or track]",
      },
    ],
  },

  skills: [
    { group: "Languages", items: ["PHP", "JavaScript", "SQL", "HTML5", "CSS3"] },
    { group: "Frameworks", items: ["[FRAMEWORK 1]", "[FRAMEWORK 2]"] },
    { group: "Databases", items: ["PostgreSQL", "Supabase"] },
    { group: "Tools", items: ["Git", "VS Code", "XAMPP", "Apache", "Docker", "Nginx"] },
  ],

  projects: [
    {
      title: "Campus Event Hub",
      year: "2026",
      type: "Web System",
      image: "", // e.g. "assets/project-1.png" — optional
      description:
        "A campus event platform for La Consolacion University Philippines. Students sign up with their school email, browse every event on one calendar, register, and evaluate the events they attended. Admins publish events, track registrations and attendance, and read reports.",
      role: "Lead Developer, in a team of five",
      tech: ["PHP 8", "JavaScript", "HTML & CSS", "PostgreSQL", "Supabase"],
      highlights: [
        "Three role levels (Student / Faculty, Admin, Super Admin), with event approvals enforced by database rules",
        "Registration limits by capacity, deadline, audience and year level, plus attendance tracking and printable sheets",
        "In-site and email notifications, and installable on a phone's home screen like an app",
      ],
      links: [], // e.g. [{ label: "GitHub", url: "https://github.com/..." }]
    },
    {
      title: "[PROJECT 2 NAME]",
      year: "[YEAR]",
      type: "[TYPE, e.g. Website]",
      image: "",
      description: "[What the project does and who it is for, in two or three sentences.]",
      role: "[YOUR ROLE IN THE PROJECT]",
      tech: ["[TECH 1]", "[TECH 2]", "[TECH 3]"],
      highlights: ["[Highlight or result 1]", "[Highlight or result 2]"],
      links: [],
    },
    {
      title: "[PROJECT 3 NAME]",
      year: "[YEAR]",
      type: "[TYPE, e.g. Game]",
      image: "",
      description: "[What the project does and who it is for, in two or three sentences.]",
      role: "[YOUR ROLE IN THE PROJECT]",
      tech: ["[TECH 1]", "[TECH 2]", "[TECH 3]"],
      highlights: ["[Highlight or result 1]", "[Highlight or result 2]"],
      links: [],
    },
  ],

  achievements: [
    {
      date: "[MONTH YEAR]",
      kind: "Certificate",
      title: "[CERTIFICATE TITLE]",
      issuer: "[ISSUING ORGANIZATION]",
      link: "", // optional: link to the certificate image or verification page
    },
    {
      date: "[MONTH YEAR]",
      kind: "Seminar",
      title: "[SEMINAR OR WEBINAR TITLE]",
      issuer: "[ORGANIZER]",
      link: "",
    },
    {
      date: "[MONTH YEAR]",
      kind: "Award",
      title: "[AWARD OR ACCOMPLISHMENT]",
      issuer: "[WHO GAVE IT]",
      link: "",
    },
  ],

  contact: {
    blurb: "[One or two sentences inviting people to reach out, e.g. open for internship opportunities.]",
    email: "[YOUR EMAIL ADDRESS]",
    resume: "", // e.g. "assets/resume.pdf" — leave empty to hide the resume button
    links: [
      { label: "GitHub", url: "https://github.com/arianjander-abergas" },
      { label: "LinkedIn", url: "[YOUR LINKEDIN URL]" },
    ],
  },
};
