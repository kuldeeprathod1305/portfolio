import { IDENTITY } from "./profile";

// Clear, consistent status vocabulary used across every project card.
export type ProjectStatus = "Concept" | "Active build" | "MVP" | "Completed";

export type Project = {
  index: string;
  name: string;
  domain: string;
  status: ProjectStatus;
  summary: string;
  workflow?: string[];
  highlights: string[];
  tech: string[];
  href: string;
  featured?: boolean;
};

// Order matters: RACK AI, IPL and Emotion Recognition lead the page.
export const PROJECTS: Project[] = [
  {
    index: "01",
    name: "RACK AI",
    domain: "Applied AI · Automation",
    status: "Concept",
    summary:
      "An AI-assisted lead-generation system. The idea is to take lead data, process it, and use AI to help qualify and route opportunities into a clean backend workflow. I'm currently shaping the pipeline and the workflow logic.",
    workflow: ["Lead ingestion", "AI qualification & routing", "Backend API & state"],
    highlights: [
      "Lead identification & processing",
      "AI-assisted lead qualification",
      "Automated workflow concept",
      "Backend integration planning",
    ],
    tech: ["Python", "APIs", "AI workflows", "Automation"],
    href: `${IDENTITY.github}/RACK_AI`,
    featured: true,
  },
  {
    index: "02",
    name: "IPL Analytics & Prediction",
    domain: "Data analytics · Sport",
    status: "Active build",
    summary:
      "An IPL cricket data project: player and team form, venue and toss effects, historical match patterns — and eventually match outcome prediction. Built to practise the full analytics flow from raw data to a visual answer.",
    workflow: ["Data ingestion & cleaning", "Exploratory & statistical analysis", "Prediction pipeline"],
    highlights: [
      "Player & team performance analysis",
      "Venue and toss impact",
      "Historical match trends",
      "Outcome prediction experiments",
    ],
    tech: ["Python", "Pandas", "SQL", "PostgreSQL", "Machine learning"],
    href: `${IDENTITY.github}/IPL`,
  },
  {
    index: "03",
    name: "Emotion Recognition",
    domain: "Computer vision · ML",
    status: "Active build",
    summary:
      "A computer-vision build that classifies facial expressions. It covers face detection, image preprocessing and training a model to map expressions to emotion labels, then checking where it gets it wrong.",
    highlights: [
      "Face detection",
      "Image preprocessing",
      "CNN training",
      "Live expression prediction",
    ],
    tech: ["Python", "OpenCV", "CNN", "Machine learning"],
    href: `${IDENTITY.github}/CodeAlpha_EmotionRecognition`,
  },
  {
    index: "04",
    name: "CardioSense AI",
    domain: "Health · Machine learning",
    status: "Active build",
    summary:
      "A machine-learning model that estimates cardiovascular risk from routine health inputs, with careful preprocessing and an honest read of the model's output.",
    highlights: ["Structured health data", "Feature preparation", "Classification model", "Evaluation"],
    tech: ["Python", "scikit-learn", "Pandas"],
    href: `${IDENTITY.github}/CodeAlpha_CardioSenseAI_`,
  },
  {
    index: "05",
    name: "Anomaly Detection System",
    domain: "Machine learning",
    status: "Active build",
    summary:
      "A system that finds unusual observations in a dataset — preprocessing, exploratory analysis, anomaly detection algorithms and an evaluation I can stand behind.",
    highlights: ["Data preprocessing", "EDA & patterns", "Anomaly algorithms", "Model evaluation"],
    tech: ["Python", "Pandas", "scikit-learn"],
    href: `${IDENTITY.github}/anamoly-detection`,
  },
  {
    index: "06",
    name: "Amazon Review Sentiment",
    domain: "NLP · Machine learning",
    status: "Active build",
    summary:
      "NLP on customer reviews: clean the text, classify the sentiment and visualise what customers are actually saying beneath the star ratings.",
    highlights: ["Text preprocessing", "Sentiment classification", "Opinion analysis", "Visualisation"],
    tech: ["Python", "NLP", "Pandas"],
    href: `${IDENTITY.github}/amazon-review-sentiment-analysis`,
  },
  {
    index: "07",
    name: "QUICK-MEET",
    domain: "Web · Real-time",
    status: "MVP",
    summary:
      "A browser-based video-call site: create a room, invite someone, talk. A PHP build used to practise sessions, routing and real-time web basics.",
    highlights: ["Video room flow", "Session handling", "PHP backend", "Responsive UI"],
    tech: ["PHP", "Web", "Real-time"],
    href: `${IDENTITY.github}/QUICK-MEET`,
  },
  {
    index: "08",
    name: "Smart Traffic System",
    domain: "Simulation · Python",
    status: "Active build",
    summary:
      "A Python simulation exploring smarter junctions — signal timing that reacts to traffic flow instead of running on a fixed clock.",
    highlights: ["Traffic flow model", "Adaptive signalling", "Simulation logic", "Python systems"],
    tech: ["Python", "Simulation"],
    href: `${IDENTITY.github}/smart-traffic-system`,
  },
  {
    index: "09",
    name: "IoT Real-time Monitoring",
    domain: "IoT · Sensing",
    status: "MVP",
    summary:
      "An ESP32 + DHT22 monitor that streams temperature and humidity to a dashboard and flags readings that cross safe limits in real time.",
    highlights: ["Sensor data capture", "Live dashboard", "Threshold alerts", "ESP32 setup"],
    tech: ["ESP32", "Python", "IoT"],
    href: `${IDENTITY.github}/Real-time-Temp`,
  },
];

export const OTHER_REPOS = [
  { name: "Credit Scoring Model", note: "Risk modelling exercise", href: `${IDENTITY.github}/CodeAlpha_CreditScoringModel` },
];
