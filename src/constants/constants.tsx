import { AccentColor, ExperienceItem, ProjectItem, SkillItem } from '@/types/types';

export const category = {
  ACADEMIC: "Academic Project",
  PERSONAL: "Personal Project",
  CAPSTONE: "Capstone Project",
  FREELANCE: "Freelance",
  HACKATHON: "Hackathon Project"
}

export const ACCENT_COLORS: AccentColor[] = [
  { name: 'green', value: '#2da44e' },
  { name: 'white', value: '#ffffff' },
  { name: 'blue', value: '#2563eb' },
  { name: 'red', value: '#e63946' },
  { name: 'orange', value: '#ea580c' },
  { name: 'purple', value: '#9333ea' },
  { name: 'gray', value: '#71717a' },
];

export const NAV_ITEMS = [
  { label: 'About Me', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Custom Software Engineer",
    company: "Accenture",
    companyUrl: "accenture.com",
    period: "August 2026 - Present",
    location: "NCR, Philippines | Hybrid",
    description: "Onboarded as an Custom Software Engineer after 4 month long training."
  },
  {
    role: "Full Stack/AI Trainee",
    company: "Accenture Technology Academy",
    companyUrl: "accenture.com",
    period: "April 2026 - July 2026",
    location: "Mandaluyong City, Philippines | Hybrid",
    description: "Got selected to take an exclusive 343-hour training program to sharpen my skills on Full Stack Development and Microservices, covering Core Java, Spring Boot for backend. ReactJS and TypeScript for Frontend.",
    certificate: "/certificates/training.png"
  },
  {
    role: "COBOL Developer Intern",
    company: "Land Bank of the Philippines (HO)",
    companyUrl: "landbank.com",
    period: "February 2026 - April 2026",
    location: "Malate, Manila, Philippines",
    description: "Contributed to the migration and development of 10+ COBOL programs to z/OS mainframe for financial data processing. Worked with PS and VSAM input files to handle data reading, validation, and processing logic. Executed JCL job submissions and monitored execution status to maintain system reliability. Performed unit testing and ensured the programs complied with IBM z/OS coding standards to ensure seamless enterprise integration.",
    certificate: "/certificates/internship.png"
  },
  {
    role: "Salesforce Developer Intern",
    company: "The SmartBridge",
    companyUrl: "thesmartbridge.com",
    period: "March 2025 – May 2025",
    location: "Philippines | Remote",
    description: "Completed 22 superbadges on Salesforce Trailhead, reflecting hands-on experience in CRM concepts, security models, workflow automation, and scalable system design, simulating real-world scenarios on utilizing Salesforce technologies.",
    certificate: "/certificates/salesforce.png"
  },
  {
    role: "Institutional Student Assistant",
    company: "Bulacan State University",
    companyUrl: "bulsu.edu.ph",
    period: "January 2025 – May 2025",
    location: "Malolos City, Bulacan, Philippines",
    description: "Managed front desk operations and document handling, ensuring efficient communication between university offices while maintaining high service standards for student inquiries."
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    title: "MergeMaster AI",
    position: "Full Stack & AI Developer",
    theme: "AI is evolving from a productivity tool into a true collaborator that can help people plan, coordinate, decide, and execute work moreffectively. Build solutions that help individuals, teams, and organizations achieve better outcomes through intelligent automation, workflow orchestration, and decision support. Whether you're building workflow automation systems, AI co-workers, decision intelligence platforms, or business process orchestration tools, your project should demonstrate how AI can help transform work from disconnected tasks into intelligent, outcome-driven systems.",
    hackathonTitle: "IBM AI Builders Challenge (August Wildcard)",
    collaborators: null,
    problem: "Engineering teams lose valuable hours manually reviewing code, routing tickets, and hunting for security flaws, which creates severe friction and slows down shipping velocity. Context-switching to fix minor issues or reviewing PRs outside a developer's expertise stalls progress, while traditional AI review tools only leave passive comments that still require manual effort.",
    description: "MergeMaster AI acts as an active, autonomous co-worker that fixes issues directly and orchestrates the entire pull request workflow. It automatically generates and pushes code fixes for vulnerabilities, intelligently routes PRs to the right domain experts based on touched files, and evaluates deployment safety through AI-driven risk-confidence scoring.",
    techStack: ["Fast API", "React", "Convex", "WorkOS", "Gemini API", "IBM Bob", "Tanstack Router", "Tanstack Query", "Github Apps", "Shadcn UI"],
    image: "/projects/mergemaster.png",
    // demoLink: "",
    repoLink: "https://github.com/elli1216/MergeMasterAI",
    category: category.HACKATHON
  },
  {
    title: "WhatsApp AI Notification Router",
    position: "AI Developer",
    hackathonTitle: "HackerRank Orchestrate 24-hour Hackathon",
    collaborators: null,
    placement: "401st Place",
    placementOutOf: "1983 contestants",
    problem: "WhatsApp is noisy — family chats, school updates, work messages, promotions, image posters, voice notes, and scams all share one stream. Treating every message the same makes important ones get missed and lets unwanted or risky ones interrupt the user. The system must reason over multimodal messages (text, images, voice notes) and decide, per incoming message, whether to interrupt now, batch it into a digest, or mute it — while keeping the decision personalized to each user, and always muting clear scam or safety risks regardless of the user's usual engagement.",
    description: "An AI-powered WhatsApp Message Notification Router that classifies incoming multimodal messages (text, image posters, voice notes) as notify, digest, or mute. It personalizes decisions by fusing per-user notification behavior, group roles and mute states, business account trust signals, and historical reactions into a context-aware prompt, while a heuristic retrieval engine surfaces the three most relevant past messages with real reactions as evidence. Routing runs on a free-tier Gemini model with temperature-0 structured JSON output for deterministic, schema-validated results. The production pipeline writes predictions incrementally to output.csv, making it resumable against the free tier's 15-requests-per-minute limit.",
    metrics: [
      { label: "Action Accuracy", value: "96.67%" },
      { label: "Message Type Accuracy", value: "93.33%" },
      { label: "Messages Routed", value: "110/110" },
    ],
    techStack: ["Python", "Pydantic v2", "Gemini API", "Pandas", "Jaccard", "Heuristic Ranking"],
    image: "https://placehold.co/800/black/white?text=Message+Notification+Router+(Hackathon)&font=playfair-display",
    // demoLink: "",
    repoLink: "https://github.com/elli1216/message-notification-router",
    category: category.HACKATHON
  },
  {
    title: "PlotWeaver AI",
    position: "Full Stack Lead",
    hackathonTitle: "IBM AI Builders Challenge (July Edition)",
    theme: "AI is transforming how people create content, tell stories, design experiences, and bring ideas to life. Creative industries are driven by imagination and expression, but the creative process is often constrained by time-consuming production workflows, technical complexity, limited access to advanced tools, and challenges turning ideas into finished outputs quickly. As demand for digital content continues to grow, creators are expected to produce more, faster, and across multiple formats than ever before. Your challenge is to build AI-powered tools that transform how creative work is imagined, produced, and experienced. Whether you're creating AI creative partners, storytelling tools, multimodal experiences, creative ideation platforms, or personalized creative assistants, your solution should demonstrate how AI can expand creative potential and redefine creative workflows.",
    collaborators: [{
      name: "Karan Munreja",
      link: "https://www.linkedin.com/in/karan-munreja/"
    }, {
      name: "Michael Omijie",
      link: "https://www.linkedin.com/in/michaelomijie/"
    }],
    problem: "Writing complex novels, screenplays, or game lore is notoriously difficult. Authors lose track of character arcs, timelines, and established lore in hundreds of pages, and tracking strict world-building rules across 50 chapters is tedious and error-prone. Most AI writing tools make it worse by ghostwriting prose that dilutes the author's voice instead of fixing the underlying plot logic.",
    description: "Collaborated with 2 AI Engineers to develop PlotWeaver, that offers an infinite node-based canvas where authors map story beats as causal pathways. Its AI companion continuously traces these connections, instantly flagging downstream logic breaks and suggesting modular alternatives, so writers stay immersed while the tool handles consistency.",
    techStack: ["Fast API", "IBM watsonx", "IBM Bob", "React", "React Flow", "Supabase", "Tanstack Router", "Tanstack Query", "Shadcn UI"],
    image: "/projects/plotweaver.png",
    // demoLink: "",
    repoLink: "https://github.com/IBMPlotWeaver/plotweaver",
    category: category.HACKATHON
  },
  {
    title: "EntityForge",
    position: "Front-end Developer",
    collaborators: null,
    description: "A browser-based visual database designer that lets spring boot developers model JPA entities and relationships through an intuitive drag-and-drop canvas. It provides a split-screen workspace where visual design and generated JPA/SQL code stay in sync. The tool solves the common friction of translating entity relationship diagrams into correct, compilable Java persistence code.",
    techStack: ["React", "React Flow", "Tanstack Router", "Tanstack Query", "Shadcn UI"],
    image: "/projects/entityforge.png",
    demoLink: "https://entityforge.degf.workers.dev/",
    repoLink: "https://github.com/elli1216/entityforge",
    category: category.PERSONAL
  },
  {
    title: "QuickRoute",
    position: "Full Stack Developer",
    collaborators: null,
    description: "A Spring Boot mock server that instantly generates live REST endpoints from uploaded JSON definitions. Supports dynamic route registration without restart, configurable HTTP status codes, response delays, and path variable substitution. Includes automatic mock expiry and a built-in management UI for browsing and deleting mocks.",
    techStack: ["Spring Boot", "PostgreSQL", "Docker", "Java", "Maven", "React", "Tanstack Router", "Tanstack Query", "Shadcn UI"],
    image: "/projects/quickroute.png",
    demoLink: "https://quick-route.app/",
    repoLink: "https://github.com/elli1216/QuickRoute-Web",
    category: category.PERSONAL
  },
  {
    title: "BulSU OSAS Grievance and Response Management Portal",
    position: "Full Stack Developer",
    collaborators: [{
      name: "Mico Cerbito",
      link: "https://www.linkedin.com/in/mico-cerbito/"
    }, {
      name: "Romeo Quiñones",
      link: "https://www.linkedin.com/in/romeo-m-quinones-jr/"
    }, {
      name: "Enrico Tienzo",
      link: "https://www.linkedin.com/in/chainsaw-353350379/"
    }],
    description: "Enabled administrators to monitor, categorize, and resolve student concerns in real time. Improved operational efficiency by digitizing submissions and centralizing records using ReactJS. Leveraged GitHub for version control.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Express.js", "Supabase", "Agile Development"],
    image: "/projects/osas.png",
    repoLink: "",
    demoLink: "https://www.osascomplaints.dev/",
    category: category.CAPSTONE
  },
  {
    title: "STC Performing Arts Center Website",
    position: "Full Stack Developer",
    collaborators: null,
    description: "Built a centralized management platform using Tanstack Start, replacing manual scheduling with a digital system for classes, coaches, and studio rentals. Enabled secure, automated transactions by integrating PayMongo, and designed an administrative dashboard.",
    techStack: ["Tanstack Start", "React", "PayMongo", "TypeScript", "Tailwind CSS", "Shadcn UI", "Supabase", "Agile Development"],
    image: "/projects/stc.png",
    repoLink: "",
    demoLink: "https://stcpacv3.vercel.app/",
    category: category.FREELANCE
  },
  // {
  //   title: "QuickRoute - Local",
  //   position: "Developer",
  //   description: "Developed a plug‑and‑play mock server that enables frontend developers and QA testers to simulate REST APIs instantly. Users upload a JSON configuration defining HTTP methods, path patterns (including path variables), response bodies, custom status codes, and artificial network delays.",
  //   techStack: ["Spring Boot", "Java", "Maven", "MVC", "Rest API", "JSON"],
  //   image: "https://placehold.co/800/black/white?text=QuickRoute+-+Local&font=playfair-display",
  //   repoLink: "https://github.com/elli1216/InstantMock-Local",
  //   category: category.PERSONAL
  // },
  // {
  //   title: "COBOL Files",
  //   description: "My files from Z/OS Mainframe Developer Course and IBM Z Xplore hands-on labs.",
  //   techStack: ["COBOL", "JCL", "IBM Z Xplore", "z/OS", "Mainframe", "ISPF", "RACF", "Zowe CLI", "VSAM", "TSO"],
  //   image: "/projects/zos.png",
  //   repoLink: "https://github.com/elli1216/ds-jcl-cbl-files",
  //   category: category.PERSONAL
  // },
  {
    title: "Tic-a-Pic Photobooth",
    position: "Full Stack Developer",
    collaborators: [{
      name: "Paolo Angelo",
      link: "https://www.linkedin.com/in/paolo-angelo/"
    }],
    description: "Developed an interactive web-based photobooth using NextJS to provide users with a fun, seamless, and engaging digital photography experience.",
    techStack: ["Next.js", "DaisyUI"],
    image: "/projects/ticapic.png",
    repoLink: "https://github.com/elli1216/Tic-a-Pic",
    // demoLink: "https://tic-a-pic.vercel.app/",
    category: category.PERSONAL
  },
  {
    title: "Jobinator",
    position: "Full Stack Developer",
    collaborators: null,
    description: "A simple CRUD job application tracker that streamlines the job search process by organizing applications, statuses, and notes in a centralized dashboard.",
    techStack: ["Tanstack Start", "Prisma", "Neon", "Netlify", "Clerk", "Shadcn UI"],
    image: "/projects/jobinator.png",
    repoLink: "https://github.com/elli1216/Jobinator",
    category: category.PERSONAL
  },
  {
    title: "My Own Portfolio",
    position: "Developer",
    collaborators: null,
    description: "A portfolio website built with Motion and ReactBits components that you are viewing right now. Showcases my skills and projects as well as my social media accounts.",
    techStack: ["React", "TypeScript", "Motion React", "ReactBits"],
    image: "/projects/portfolio.png",
    repoLink: "https://github.com/elli1216/eli",
    category: category.PERSONAL
  },
  {
    title: "Scroll Report",
    position: "Developer",
    collaborators: null,
    description: "A project I practiced with Next.js using the News API for the data just for practicing NextJS.",
    techStack: ["Next.js", "News API", "Tanstack React Query", "TypeScript"],
    image: "https://placehold.co/800/black/white?text=Scroll+Report&font=playfair-display",
    repoLink: "https://github.com/elli1216/Scroll-Report",
    category: category.PERSONAL
  },
  {
    title: "ByteBazaar",
    position: "Developer",
    collaborators: [{
      name: "Mico Cerbito",
      link: "https://www.linkedin.com/in/mico-cerbito/"
    }, {
      name: "Romeo Quiñones",
      link: "https://www.linkedin.com/in/romeo-m-quinones-jr/"
    }, {
      name: "Enrico Tienzo",
      link: "https://www.linkedin.com/in/chainsaw-353350379/"
    }],
    description: "A final project presented during my 3rd year, 1st Semester in Web Systems and Technologies (1). A full-stack e-commerce application built with React (TypeScript) frontend and Express.js backend, featuring Firebase authentication and XML-based data storage.",
    techStack: ["React", "Node.js", "Express.js", "XML", "Firebase", "TypeScript"],
    image: "https://placehold.co/800/purple/white?text=ByteBazaar&font=playfair-display",
    repoLink: "https://github.com/elli1216/Bytebazaar",
    category: category.ACADEMIC
  },
  {
    title: "Student Management System",
    position: "Developer",
    collaborators: [{
      name: "Paolo Angelo",
      link: "https://www.linkedin.com/in/paolo-angelo/"
    }, {
      name: "James Godoy",
      link: "https://www.linkedin.com/in/jamessamuelgodoy/"
    }, {
      name: "Ervin Ilarde",
      link: "https://www.linkedin.com/in/ervinilarde/"
    },
    {
      name: "Ryan Gomez",
      link: "https://ph.linkedin.com/in/ryan-carlo-gomez-4aa035292"
    }],
    description: "A final project presented during my 2nd year, 2nd Semester in Advanced Programming. A school management system designed in Java with MVC Framework. Features included Student, Faculty, and Admin Dashboards. Check the repository for more details.",
    techStack: ["Java", "Java Swing", "JDBC", "MVC Framework", "SQL Server", "Agile Development"],
    image: "https://placehold.co/800/darkblue/white?text=School+Management+System&font=playfair-display",
    repoLink: "https://github.com/elli1216/School-Enrollment-System",
    category: category.ACADEMIC
  },
];

export const SKILL_DATA: SkillItem[] = [
  { name: "Java", category: "backend", icon: "java" },
  { name: "COBOL", category: "backend", icon: "" },
  { name: "Spring Boot", category: "backend", icon: "spring" },
  { name: "ReactJS", category: "frontend", icon: "react" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
  { name: "NextJS", category: "frontend", icon: "nextjs2" },
  { name: "Tanstack", category: "frontend", icon: "tanstack2" },
  { name: "JavaScript", category: "frontend", icon: "js" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "HTML5", category: "frontend", icon: "html5" },
  { name: "CSS3", category: "frontend", icon: "css3" },
  { name: "SQL", category: "backend", icon: "mysql" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "SQLite", category: "backend", icon: "sqlite" },
  { name: "JCL", category: "backend", icon: "" },
  { name: "ExpressJS", category: "backend", icon: "expressjs" },
  { name: "NodeJS", category: "backend", icon: "nodejs" },
  { name: "Docker", category: "tools", icon: "docker" },
  { name: "Git", category: "tools", icon: "git" },
  { name: "GitHub", category: "tools", icon: "github" },
  { name: "Bash", category: "tools", icon: "bash" },
  { name: "Supabase", category: "tools", icon: "supabase" },
  { name: "Python", category: "backend", icon: "python" },
  { name: "Prisma", category: "backend", icon: "prisma" },
  { name: "OpenAI", category: "tools", icon: "openai" },
  { name: "Vite", category: "frontend", icon: "vitejs" },
];

export const certificates = [
  { src: "/certificates/hackerrank.png", alt: "HackerRank Orchestrate August", href: "https://www.hackerrank.com/contests/hackerrank-orchestrate-august26/challenges/message-notification-router/leaderboard?username=darl" },
  { src: "/certificates/assocai.png", alt: "Associate AI Engineer for Developers", href: "https://www.datacamp.com/completed/statement-of-accomplishment/track/185ae827af3fb597750701fb515e41c0c01cff74" },
  { src: "/certificates/javadev-1.png", alt: "Java Developer", href: "https://www.datacamp.com/completed/statement-of-accomplishment/track/d24f11d25eef873a334251eaac3d132d5e082d51" },
  { src: "/certificates/mainframedeveloper.jpg", alt: "IBM Mainframe Developer", href: "https://www.coursera.org/account/accomplishments/specialization/certificate/GTA3SGF8S3NV" },
  { src: "/certificates/advocate.jpg", alt: "IBM Z Advocate", href: "https://www.credly.com/badges/d122ced4-831f-4d44-944e-77c0663ff88b/public_url" },
  { src: "/certificates/learnintermediatejava.jpg", alt: "Learn Intermediate Java", href: "https://www.codecademy.com/profiles/degf/certificates/2624ed9b49bb4d5c994983877e5263f0" },
  { src: "/certificates/IBMZALLSTAR.jpg", alt: "All Star Badge - IBM Z Xplore", href: "https://www.credly.com/badges/9c95a33b-7c50-434b-b7eb-eba86e1c1c0e/linked_in_profile" },
  { src: "/certificates/rest_api-1.png", alt: "Rest API", href: "https://www.hackerrank.com/certificates/1135784070d0" },
  { src: "/certificates/EnterpriseCOBOLProgrammingwithVSCode.png", alt: "Enterprise COBOL Programming with VSCode", href: "https://www.credly.com/badges/9f1d7099-11ed-4ddd-af8f-c296f22c7d4a/linked_in?t=tf4cc7" },
  { src: "/certificates/springbootfundamentals.png", alt: "Spring Boot Fundamentals", href: "https://app.pluralsight.com/achievements/share/1c045e31-29f3-4a9d-a0f7-6f0db161da6b" },
  { src: "/certificates/java8.png", alt: "Java 8 Fundamentals", href: "https://app.pluralsight.com/achievements/share/ece26aa5-2f58-4dc6-91aa-6bbad8e143b8" },
  { src: "/certificates/sfvip2025floresca.jpg", alt: "Salesforce Internship Completion Certificate", href: "https://www.salesforce.com/ap/" },
  { src: "/certificates/nextjsproj_page.jpg", alt: "NextJS Project BootCamp", href: "https://www.udemy.com/certificate/UC-e4312cb7-9b70-4822-ae7a-5270b6759622/" },
  { src: "/certificates/foundations.jpg", alt: "Foundations of Web Development", href: "https://www.udemy.com/certificate/UC-47707ddb-68d9-4661-80e1-c54313587553/" },
  { src: "/certificates/htmlcssjsreact.jpg", alt: "HTML, CSS, JS, React", href: "https://www.udemy.com/certificate/UC-9e5b5a02-e296-462b-9da7-09af19fb1706/" },
  { src: "/certificates/CyberThreatManagement.jpg", alt: "Cyber Threat Management", href: "https://www.credly.com/badges/fedbe3b2-8519-4e22-976e-153dd577c5c7/public_url" },
  { src: "/certificates/SecurityandConnectivitySupport.jpg", alt: "Security and Connectovity Support", href: "https://www.credly.com/badges/fb5d7810-4e12-4d93-ab39-0b54c34bc1a5/public_url" },
];