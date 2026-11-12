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

  // View counter shown in the top-left badge. The count is kept by a free counter service (abacus.jasoncameron.dev).
  // Changing the namespace or key starts a new count from zero. Remove this block to show your initials instead.
  viewCounter: { namespace: "arianjander-abergas-portfolio", key: "views" },

  hero: {
    eyebrow: "Portfolio · 2026",
    role: "BS Information Technology Student & Web Developer",
    tagline: "Can't find it? I'll make it.",
  },

  about: {
    photo: "", // e.g. "assets/profile.jpg" — leave empty to show your initials instead
    paragraphs: [
      "I'm a fourth-year BS Information Technology student at La Consolacion University Philippines. I build full-stack web systems with PHP, JavaScript and Supabase, and I was group leader and lead developer of our capstone project, Campus Event Hub.",
      "I also have hands-on experience in technical support and hardware troubleshooting. I'm looking for an opportunity to apply my skills in software development and IT support while I keep growing in a professional setting.",
    ],
    education: [
      {
        years: "Expected 2027",
        school: "La Consolacion University Philippines",
        detail: "Bachelor of Science in Information Technology",
      },
      {
        years: "Graduated 2023",
        school: "La Consolacion University Philippines",
        detail: "Senior High School",
      },
    ],
  },

  skills: [
    { group: "Languages", items: ["PHP", "JavaScript", "Kotlin", "SQL", "HTML5", "CSS3"] },
    { group: "Databases", items: ["PostgreSQL", "Supabase", "SQLite"] },
    {
      group: "Tools",
      items: ["Git / GitHub", "VS Code", "Android Studio", "XAMPP", "Apache", "Docker", "Nginx", "Vercel", "Microsoft Excel & Access"],
    },
    { group: "IT Support", items: ["Hardware troubleshooting", "Technical support"] },
    { group: "Soft Skills", items: ["Leadership", "Problem-solving", "Customer service", "Creative thinking"] },
  ],

  projects: [
    {
      title: "Campus Event Hub",
      year: "2026",
      type: "Capstone Project",
      image: "", // e.g. "assets/project-1.png" — optional
      description:
        "A campus event platform for La Consolacion University Philippines. Students sign up with their school email, browse every event on one calendar, register, and evaluate the events they attended. Admins publish events, track registrations and attendance, and read reports.",
      role: "Group Leader & Lead Developer, team of five",
      tech: ["PHP 8", "JavaScript", "HTML & CSS", "PostgreSQL", "Supabase"],
      highlights: [
        "Three role levels (Student / Faculty, Admin, Super Admin), with event approvals enforced by database rules",
        "Registration limits by capacity, deadline, audience and year level, plus attendance tracking and printable reports",
        "In-site and email notifications, and installable on a phone's home screen like an app",
      ],
      links: [], // e.g. [{ label: "GitHub", url: "https://github.com/..." }]
    },
    {
      title: "Personal Portfolio Website",
      year: "2026",
      type: "Personal Project",
      image: "",
      description:
        "This website: a responsive personal portfolio with a comic-book visual style, built with plain HTML, CSS and JavaScript and no frameworks.",
      role: "Designer & Developer",
      tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
      highlights: [
        "Comic-book look with ink outlines, halftone dots, speech bubbles and panel layouts",
        "Colour and black-and-white themes with a toggle that is remembered between visits",
      ],
      links: [{ label: "GitHub", url: "https://github.com/arianjander-abergas/Personal-Portfolio" }],
    },
    {
      title: "Android Mobile Apps",
      year: "2026",
      type: "Course Activities",
      image: "",
      description:
        "A set of Android apps built in Kotlin for coursework, covering multi-screen navigation, form controls and local databases.",
      role: "Developer",
      tech: ["Kotlin", "XML Layouts", "SQLite", "Android Studio"],
      highlights: [
        "A two-screen selection app using radio buttons and checkboxes that passes the user's choices to a scrollable results page",
        "An app that queries names from an SQLite database and renders them as styled tiles in a two-column grid",
      ],
      links: [],
    },
  ],

  // Left column. "image" is the certificate picture (optional); "link" is a verification page (optional).
  achievements: [
    {
      date: "April 2026",
      kind: "Certificate",
      title: "Fundamentals of Enterprise Security",
      issuer: "CloudSwyft Global Systems, Inc.",
      image: "assets/certificates/enterprise-security.jpg",
      link: "",
    },
  ],

  // Right column.
  seminars: [
    {
      date: "May 2024",
      kind: "Seminar",
      title: "Coding for Impact: Leveraging Technology to Solve Real-World Challenge",
      issuer: "JPSSITE Pace Level Up v. 4.3 · La Consolacion University Philippines",
      image: "assets/certificates/seminar-pace-level-up-4-3.jpg",
      link: "",
    },
    {
      date: "February 2024",
      kind: "Seminar",
      title: "Ethical Hacking: Juggling Technology and Morality",
      issuer: "JPSSITE Pace Level Up v. 4.2 · La Consolacion University Philippines",
      image: "assets/certificates/seminar-pace-level-up-4-2.jpg",
      link: "",
    },
    {
      date: "October 2023",
      kind: "Seminar",
      title: "IT Trends: Navigating the Ever-Changing Digital Landscape",
      issuer: "JPSSITE Pace Level Up v. 4.0 · La Consolacion University Philippines",
      image: "assets/certificates/seminar-pace-level-up-4-0.jpg",
      link: "",
    },
  ],

  contact: {
    blurb: "Looking for someone in software, website, full stack development or IT support, or have a question about my work? My inbox is open.",
    email: "arianjanderabergas@gmail.com",
    resume: "assets/Abergas_Resume.pdf", // shown as a Resume button in the hero and in Contact; set to "" to hide them
    links: [
      { label: "GitHub", url: "https://github.com/arianjander-abergas" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/arian-jander-abergas-6aa007414" },
    ],
  },
};
