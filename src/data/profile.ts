// ---------------------------------------------------------------------------
// All personal content lives here. Update a value and the whole site follows.
// ---------------------------------------------------------------------------

export const IDENTITY = {
  name: "Kuldeep Rathod",
  firstName: "Kuldeep",
  lastName: "Rathod",
  role: "IT engineering student & aspiring Python developer",
  shortRole: "Aspiring Python developer",
  location: "Gujarat, India",
  // Add your age here (e.g. 21) and it will appear in the info card.
  age: null as number | null,
  github: "https://github.com/kuldeeprathod1305",
  handle: "@kuldeeprathod1305",
  avatar: "https://avatars.githubusercontent.com/u/229272127?s=200&v=4",
  // Add an email to enable Copy Email everywhere. Null keeps the honest fallback.
  email: null as string | null,
  linkedin: null as string | null,
  resumeUrl: "/resume.pdf",
  resumeReady: true,
  availability: "Open to internships & junior roles",
  timezone: "Asia/Kolkata",
};

export const NAV = [
  { id: "info", label: "Info", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "connect", label: "Connect", index: "04" },
];

export const HERO = {
  eyebrow: "Python · Backend · Applied AI",
  lede: "I build things with Python, and I'm learning to build them properly.",
  body: "IT engineering student from Gujarat, working toward backend engineering and applied AI. I care about understanding how a system works before I reach for a shortcut.",
  facts: [
    { label: "Name", value: "Kuldeep Rathod" },
    { label: "Location", value: "Gujarat, India" },
    { label: "Degree", value: "B.E. Information Technology" },
    { label: "Graduating", value: "2027" },
  ],
};

export const STATS = [
  { value: "09", label: "Projects shown", note: "honest statuses" },
  { value: "13", label: "Learning records", note: "certifications, webinars & events" },
  { value: "7.70", label: "CGPA", note: "GTU · 2023–2027" },
  { value: "2027", label: "Graduating", note: "job-ready target" },
];

export const ABOUT = [
  "Hey, I'm Kuldeep Rathod — an Information Technology engineering student, aspiring Python developer and technology enthusiast from Gujarat, India.",
  "My journey revolves around exploring how technology works and using it to solve practical problems. I am particularly interested in Python development, backend engineering, artificial intelligence, machine learning and data science. I enjoy working with data, building backend applications, exploring APIs and experimenting with intelligent systems.",
  "I believe becoming a good developer is not just about knowing languages or frameworks. It's about understanding problems, developing logical solutions, writing maintainable code and improving through practical experience. Right now I'm strengthening my programming fundamentals, improving my independent problem-solving and exploring where backend engineering meets AI.",
];

export const INFO_ROWS = [
  { label: "Role", value: "Aspiring Python developer" },
  { label: "Studying", value: "B.E. Information Technology" },
  { label: "College", value: "SAL College of Engineering" },
  { label: "University", value: "GTU · 2023–2027" },
  { label: "Based in", value: "Gujarat, India" },
  { label: "Focus", value: "Backend engineering · Applied AI" },
];

export const EDUCATION = {
  degree: "Bachelor of Engineering (B.E.)",
  field: "Information Technology",
  college: "SAL College of Engineering",
  affiliation: "Affiliated with Gujarat Technological University (GTU)",
  duration: "2023 – 2027",
  cgpa: "7.70",
  interests: [
    "Programming & software development",
    "Database management systems",
    "Data structures & algorithms",
    "Artificial intelligence",
    "Machine learning",
    "Computer networks",
    "Backend development",
    "Data analytics",
  ],
  note: "My academic journey helped me build an interest in software engineering, programming, databases and emerging technologies. I keep exploring practical applications of the concepts I learn through academic and independent projects.",
};

export type LearningRecord = {
  title: string;
  issuer: string;
  date: string;
  score?: string;
  group: "Certifications" | "Webinars" | "Participation";
};

export const LEARNING: LearningRecord[] = [
  { title: "IBM AI Agents", issuer: "IBM", date: "Aug 2025", group: "Certifications" },
  { title: "GenAI Data Analytics Job Simulation", issuer: "Tata / Forage", date: "Aug 2025", group: "Certifications" },
  { title: "AWS Solutions Architecture Job Simulation", issuer: "AWS / Forage", date: "Dec 2024", group: "Certifications" },
  { title: "Data Literacy & E-Commerce", issuer: "eMPI", date: "Jan 2026", score: "80%", group: "Certifications" },
  { title: "Data Analytics", issuer: "TOPS Technologies", date: "Aug 2023", group: "Webinars" },
  { title: "Full Stack Development", issuer: "TOPS Technologies", date: "Aug 2023", group: "Webinars" },
  { title: "WordPress", issuer: "TOPS Technologies", date: "Sep 2023", group: "Webinars" },
  { title: "PHP Web Application", issuer: "TOPS Technologies", date: "Sep 2023", group: "Webinars" },
  { title: "IT Career Path", issuer: "TOPS Technologies", date: "Dec 2023", group: "Webinars" },
  { title: "Matrix Magic", issuer: "SAL", date: "Feb 2024", group: "Participation" },
  { title: "One Earth One Health Quiz", issuer: "Vivekananda Kendra", date: "Jun 2025", group: "Participation" },
  { title: "TIC TECH TOE", issuer: "2026", date: "2026", group: "Participation" },
  { title: "TARK SHASTRA", issuer: "2026", date: "2026", group: "Participation" },
];

export const LEARNING_GROUPS: LearningRecord["group"][] = ["Certifications", "Webinars", "Participation"];

export type SkillGroup = { title: string; note: string; items: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    note: "The base layer",
    items: ["Python", "SQL"],
  },
  {
    title: "Backend",
    note: "Where I'm headed",
    items: ["FastAPI", "REST APIs", "API endpoints", "HTTP methods & status codes"],
  },
  {
    title: "Databases",
    note: "Storage & queries",
    items: ["PostgreSQL", "SQL queries", "Database integration"],
  },
  {
    title: "Data",
    note: "Finding the signal",
    items: ["Pandas", "Data cleaning", "Data visualisation", "Statistical fundamentals"],
  },
  {
    title: "AI / ML",
    note: "Applied, not buzzwordy",
    items: ["Machine learning fundamentals", "Anomaly detection", "Sentiment analysis", "NLP fundamentals", "Predictive analytics"],
  },
  {
    title: "Tools",
    note: "Day to day",
    items: ["Git", "GitHub", "VS Code", "AI coding assistants"],
  },
];

export const SKILL_COUNT = SKILL_GROUPS.reduce((total, group) => total + group.items.length, 0);

export const SKILL_NOTE =
  "Everything listed here is part of my toolkit today — no pending rows, no percentages pretending to be science.";

export const RESUME = {
  filename: "resume.pdf",
  title: "One page, no filler.",
  meta: "PDF · A4 · updated 2026",
  tabs: ["Overview", "Stack & APIs", "Key builds"] as const,
  overview: [
    { label: "Education", value: "B.E. IT · SAL College · GTU" },
    { label: "Duration", value: "2023 – 2027" },
    { label: "CGPA", value: "7.70" },
    { label: "Focus", value: "Python · Backend · Applied AI" },
  ],
  stack: ["Python", "SQL", "FastAPI", "REST APIs", "PostgreSQL", "Pandas", "ML", "Git"],
};

export const INTERESTS = ["Formula 1", "Cricket", "Gaming", "Video editing", "Thumbnail design", "Visual creativity"];

export const CONNECT = {
  headline: "Let's connect",
  lede: "Looking for a first opportunity where I can contribute to real work, learn from code review and grow into backend and applied AI engineering.",
  guestbookTitle: "Portfolio guestbook",
  guestbookNote:
    "A local demo guestbook: notes are saved in this browser only, not on a server. Feedback on the projects or the site is genuinely useful.",
};

export const PROJECT_NOTE =
  "Learning and development projects. Each status describes where the project stands today. Open a repository for the current code.";

export const STATUS_KEY = [
  { label: "Concept", note: "An idea being shaped. Not yet a working build." },
  { label: "Active build", note: "Being built and improved right now." },
  { label: "MVP", note: "A minimum working version exists. Still open to extension." },
  { label: "Completed", note: "Finished to its planned scope." },
] as const;

export const MARQUEE_WORDS = [
  "Python",
  "Backend engineering",
  "FastAPI",
  "PostgreSQL",
  "Applied AI",
  "Learning in public",
  "Read the error",
  "Understand the why",
];
