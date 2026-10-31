import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserSchema } from '../schemas/user.schema';
import { ProfileSchema } from '../schemas/profile.schema';
import { ProjectSchema } from '../schemas/project.schema';
import { ExperienceSchema } from '../schemas/experience.schema';
import { EducationSchema } from '../schemas/education.schema';
import { SkillSchema } from '../schemas/skill.schema';
import { CertificationSchema } from '../schemas/certification.schema';
import { ServiceSchema } from '../schemas/service.schema';
import { WebsiteSettingsSchema } from '../schemas/settings.schema';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rishu_universe';

async function seed() {
  console.log(`Connecting to MongoDB at: ${MONGODB_URI}...`);
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected successfully.');

  const UserModel = mongoose.model('User', UserSchema);
  const ProfileModel = mongoose.model('Profile', ProfileSchema);
  const ProjectModel = mongoose.model('Project', ProjectSchema);
  const ExperienceModel = mongoose.model('Experience', ExperienceSchema);
  const EducationModel = mongoose.model('Education', EducationSchema);
  const SkillModel = mongoose.model('Skill', SkillSchema);
  const CertificationModel = mongoose.model('Certification', CertificationSchema);
  const ServiceModel = mongoose.model('Service', ServiceSchema);
  const SettingsModel = mongoose.model('WebsiteSettings', WebsiteSettingsSchema);

  // Clear existing collections
  await Promise.all([
    UserModel.deleteMany({}),
    ProfileModel.deleteMany({}),
    ProjectModel.deleteMany({}),
    ExperienceModel.deleteMany({}),
    EducationModel.deleteMany({}),
    SkillModel.deleteMany({}),
    CertificationModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    SettingsModel.deleteMany({}),
  ]);
  console.log('Cleared existing collections.');

  // 1. Initial Admin User
  const passwordHash = await bcrypt.hash('RishuUniverse2025!Secure', 10);
  await UserModel.create({
    email: 'shivayjha7@gmail.com',
    passwordHash,
    role: 'admin',
  });
  console.log('Created Admin User: shivayjha7@gmail.com');

  // 2. Profile
  await ProfileModel.create({
    name: 'Rishu Kumar Jha',
    headline: 'Programmer Analyst at Cognizant | Full-Stack Developer | AI Enthusiast',
    tagline: 'Building Digital Experiences Through Code, Creativity & AI.',
    bio: 'Software Engineer / Full-Stack Developer currently working as a Programmer Analyst at Cognizant, with 1+ year of professional experience building and enhancing enterprise applications. In my current role, I work on an enterprise geophysical application for TGS, contributing to feature development, API integrations, and defect resolution with Angular, TypeScript, Java, Spring Boot, Elasticsearch, and GeoServer.',
    location: 'Pune District, Maharashtra, India / Ranchi, Jharkhand, India',
    avatarUrl: '/assets/rishu-avatar.svg',
    photoUrl: '/assets/rishu-photo.png',
    socialLinks: {
      github: 'https://github.com/CODZRISHU',
      linkedin: 'https://www.linkedin.com/in/rishu-kumar-jha-51741328a',
      email: 'shivayjha7@gmail.com',
    },
    resumeUrl: '/resume.pdf',
    yearsOfExperience: '1+ Years',
  });
  console.log('Created Profile for Rishu Kumar Jha');

  // 3. Experiences
  await ExperienceModel.insertMany([
    {
      company: 'Cognizant',
      role: 'Programmer Analyst',
      departmentOrClient: 'TGS (Enterprise Geophysical Application)',
      location: 'Pune District, Maharashtra, India',
      startDate: 'July 2025',
      endDate: 'Present',
      isCurrent: true,
      order: 1,
      responsibilities: [
        'Developed and enhanced multiple features using Angular, TypeScript, HTML and CSS, including reusable components, application workflows and UI functionality.',
        'Integrated Angular components and services with REST APIs, handling request/response flows and error boundaries.',
        'Worked with Java, Spring Boot and REST APIs to deliver end-to-end functionality and service integration.',
        'Worked with Elasticsearch for search and data retrieval functionality within the application.',
        'Worked with GeoServer and geospatial application functionality in an enterprise geophysical domain.',
        'Diagnosed and resolved functional defects and API integration issues through root-cause analysis.',
      ],
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'REST APIs', 'Elasticsearch', 'GeoServer', 'Microservices', 'Git', 'Maven'],
    },
    {
      company: 'CodeAlpha',
      role: 'Web Development Intern / Software Engineer',
      location: 'Kochi, Kerala, India',
      startDate: 'June 2024',
      endDate: 'July 2024',
      isCurrent: false,
      order: 2,
      responsibilities: [
        'Built responsive and user-friendly websites using HTML, CSS, JavaScript, and React.js.',
        'Gained hands-on experience in component-based architecture and clean UI/UX.',
        'Enhanced understanding of Git-based collaboration and web application deployment.',
      ],
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'UI/UX'],
    },
    {
      company: 'Indian Institute of Technology, Patna',
      role: 'Machine Learning Researcher',
      location: 'Patna, Bihar, India',
      startDate: 'February 2024',
      endDate: 'March 2024',
      isCurrent: false,
      order: 3,
      responsibilities: [
        'Researched machine learning algorithms and computational models under faculty mentorship.',
        'Conducted data preprocessing, feature engineering, and statistical evaluations on domain datasets.',
      ],
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'NumPy', 'Pandas'],
    },
  ]);
  console.log('Created Experiences');

  // 4. Education
  await EducationModel.insertMany([
    {
      institution: 'Cochin University of Science and Technology (CUSAT), Kochi, Kerala',
      degree: 'B.Tech in Computer Science and Engineering',
      fieldOfStudy: 'Computer Science and Engineering',
      startDate: 'August 2021',
      endDate: 'May 2025',
      grade: 'CGPA: 8.45 / 10',
      activities: ['Algorithms', 'Distributed Systems', 'Cloud Computing', 'Database Engineering'],
      order: 1,
    },
    {
      institution: 'DAV Nandraj Public School, Ranchi',
      degree: 'Senior Secondary & Secondary (CBSE)',
      fieldOfStudy: 'Science (PCM)',
      startDate: '2019',
      endDate: '2021',
      grade: 'Class XII: 87.4% | Class X: 87.8%',
      activities: ['Science Club', 'Mathematics Competitions'],
      order: 2,
    },
  ]);
  console.log('Created Education');

  // 5. Projects
  await ProjectModel.insertMany([
    {
      title: 'KartCom E-Commerce Platform',
      slug: 'kartcom',
      category: 'full-stack',
      description: 'A microservices-based e-commerce platform with modular product, user and order management, authentication and secure transactions.',
      longDescription: 'KartCom is designed following clean microservices architecture patterns. Each domain (Catalog, Auth, Orders, Payments) operates as an independent service with its own relational database boundary, communicating through high-speed REST contracts and API Gateway routing. Implemented complete JWT token lifecycle and stateless Spring Security sessions.',
      techStack: ['Spring Boot', 'Microservices', 'Angular', 'MySQL', 'JWT', 'Spring Security', 'Maven'],
      githubUrl: 'https://github.com/CODZRISHU',
      architectureNotes: 'Distributed service registry, API Gateway pattern, independent MySQL databases per domain service.',
      challenges: 'Ensuring atomic order transactions across distributed microservices and designing modular Angular client components.',
      featured: true,
      order: 1,
    },
    {
      title: 'Kevin AI — Next-Gen AI Voice Interviewer Platform',
      slug: 'kevin-ai',
      category: 'ai-nlp',
      description: 'An AI-powered voice interview platform designed to help candidates practice interviews through voice-based interactions.',
      longDescription: 'Kevin AI simulates interactive technical interviews with dynamic conversational follow-up questions. Built with credit-based subscription billing, multi-duration interview packages, usage tracking, and Razorpay payment gateway integration for seamless candidate checkout.',
      techStack: ['React', 'Voice AI Synthesis', 'Razorpay Gateway', 'Node.js', 'LLMs', 'Tailwind CSS'],
      githubUrl: 'https://github.com/CODZRISHU',
      liveUrl: 'https://www.kevinhr.in',
      architectureNotes: 'Sub-second audio synthesis pipeline, secure Razorpay webhook signature verification, candidate evaluation engine.',
      challenges: 'Minimizing voice response latency and managing credit billing concurrency.',
      featured: true,
      order: 2,
    },
    {
      title: 'DocuChat — Conversational Question-Answering',
      slug: 'docuchat',
      category: 'ai-nlp',
      description: 'A document-based conversational question-answering system that enables users to upload multiple PDF documents and ask contextual questions.',
      longDescription: 'DocuChat leverages Retrieval-Augmented Generation (RAG) to parse complex PDF documentation into semantic chunks, indexing them in high-dimensional vector spaces (FAISS/Pinecone) and synthesizing answers using state-of-the-art LLMs.',
      techStack: ['Python', 'LangChain', 'FAISS', 'OpenAI/Claude LLMs', 'Embeddings', 'Streamlit'],
      githubUrl: 'https://github.com/CODZRISHU',
      architectureNotes: 'Document chunking pipeline, cosine similarity vector search, citation grounding to reduce hallucinations.',
      challenges: 'Handling dense PDF tables and complex multi-page document hierarchies without losing context.',
      featured: false,
      order: 3,
    },
    {
      title: 'AlanPress — Voice-Driven News Application',
      slug: 'alanpress',
      category: 'voice-ai',
      description: 'A voice-enabled news application that lets users explore and navigate news through voice interactions.',
      longDescription: 'Users can ask "Give me the latest technology news from Wired" or "Read the headlines", and AlanPress parses the intent, queries news APIs, and reads aloud summaries with interactive visual synchronization.',
      techStack: ['React', 'Alan AI', 'News API', 'JavaScript', 'CSS3'],
      githubUrl: 'https://github.com/CODZRISHU',
      architectureNotes: 'Natural Language Understanding (NLU) voice scripts mapped directly to frontend state dispatches.',
      challenges: 'Managing asynchronous speech synthesis with responsive DOM card rendering.',
      featured: false,
      order: 4,
    },
    {
      title: 'EventX — Event Management Platform',
      slug: 'eventx',
      category: 'full-stack',
      description: 'An event management platform with event listing, registration, authentication and management features.',
      longDescription: 'EventX allows organizers to publish events, track participant capacity, generate digital tickets, and inspect registration metrics in an intuitive dashboard.',
      techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Tailwind CSS'],
      githubUrl: 'https://github.com/CODZRISHU',
      architectureNotes: 'Mongoose schema validation, token-authenticated routes, role-based organizer/attendee access control.',
      challenges: 'Preventing overbooking when multiple users register simultaneously.',
      featured: false,
      order: 5,
    },
    {
      title: 'Taxiwala — Taxi Booking & Mapping Application',
      slug: 'taxiwala',
      category: 'full-stack',
      description: 'A taxi booking application with location and mapping functionality.',
      longDescription: 'Taxiwala combines Mapbox GL geospatial APIs with a Spring Boot backend to calculate real-time routing, fare estimates, and driver-passenger pickup coordination.',
      techStack: ['Spring Boot', 'Microservices', 'Angular', 'Mapbox GL', 'REST APIs'],
      githubUrl: 'https://github.com/CODZRISHU',
      architectureNotes: 'Geospatial indexing, route distance calculation, bidirectional state management.',
      challenges: 'High-frequency location update polling and client map marker rendering performance.',
      featured: false,
      order: 6,
    },
  ]);
  console.log('Created Projects');

  // 6. Skills
  await SkillModel.insertMany([
    { name: 'Angular', category: 'frontend', proficiency: 92, featured: true, order: 1 },
    { name: 'TypeScript', category: 'frontend', proficiency: 90, featured: true, order: 2 },
    { name: 'React.js', category: 'frontend', proficiency: 88, featured: true, order: 3 },
    { name: 'JavaScript', category: 'frontend', proficiency: 94, featured: false, order: 4 },
    { name: 'HTML & CSS', category: 'frontend', proficiency: 95, featured: false, order: 5 },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 92, featured: false, order: 6 },
    { name: 'Java', category: 'backend', proficiency: 90, featured: true, order: 7 },
    { name: 'Spring Boot', category: 'backend', proficiency: 88, featured: true, order: 8 },
    { name: 'REST APIs', category: 'backend', proficiency: 94, featured: true, order: 9 },
    { name: 'Microservices', category: 'backend', proficiency: 86, featured: true, order: 10 },
    { name: 'Node.js & Express', category: 'backend', proficiency: 85, featured: false, order: 11 },
    { name: 'Elasticsearch', category: 'database', proficiency: 85, featured: true, order: 12 },
    { name: 'MongoDB', category: 'database', proficiency: 88, featured: true, order: 13 },
    { name: 'MySQL / SQL', category: 'database', proficiency: 86, featured: false, order: 14 },
    { name: 'Python', category: 'aiml', proficiency: 86, featured: true, order: 15 },
    { name: 'LangChain & RAG', category: 'aiml', proficiency: 84, featured: true, order: 16 },
    { name: 'LLMs & Prompt Engineering', category: 'aiml', proficiency: 90, featured: true, order: 17 },
    { name: 'Voice AI Synthesis', category: 'aiml', proficiency: 85, featured: true, order: 18 },
    { name: 'AWS', category: 'cloud', proficiency: 82, featured: true, order: 19 },
    { name: 'Oracle Cloud (OCI)', category: 'cloud', proficiency: 85, featured: true, order: 20 },
    { name: 'Docker', category: 'cloud', proficiency: 84, featured: false, order: 21 },
    { name: 'Git & GitHub', category: 'cloud', proficiency: 92, featured: false, order: 22 },
    { name: 'GeoServer', category: 'other', proficiency: 84, featured: true, order: 23 },
    { name: 'Mapbox', category: 'other', proficiency: 82, featured: false, order: 24 },
    { name: 'System Design', category: 'other', proficiency: 85, featured: true, order: 25 },
  ]);
  console.log('Created Skills');

  // 7. Certifications
  await CertificationModel.insertMany([
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
      issuer: 'Oracle',
      issueDate: '2025',
      verificationLink: 'https://www.oracle.com/cloud/',
      order: 1,
    },
    {
      name: 'Claude Certified Architect Foundations',
      issuer: 'Anthropic Claude',
      issueDate: '2025',
      verificationLink: 'https://anthropic.com',
      order: 2,
    },
    {
      name: 'Build with Gemini',
      issuer: 'Google',
      issueDate: '2025',
      verificationLink: 'https://ai.google.dev',
      order: 3,
    },
  ]);
  console.log('Created Certifications');

  // 8. Services
  await ServiceModel.insertMany([
    {
      title: 'Full Stack Web Application Development',
      slug: 'full-stack-dev',
      description: 'End-to-end production web applications engineered with React 19/Angular, NestJS/Spring Boot, clean databases, and cloud deployments.',
      price: 4999,
      durationMinutes: 60,
      category: 'development',
      deliveryMethod: 'google_meet',
      isActive: true,
      features: ['Modern responsive UI', 'REST/GraphQL backend', 'Database modeling', 'Docker pipeline'],
      order: 1,
    },
    {
      title: 'Spring Boot & Microservices Engineering',
      slug: 'spring-microservices',
      description: 'Enterprise microservices design, service discovery, API gateway routing, and distributed transaction patterns built for scale.',
      price: 3999,
      durationMinutes: 60,
      category: 'development',
      deliveryMethod: 'google_meet',
      isActive: true,
      features: ['Spring Boot 3.x microservices', 'Elasticsearch integration', 'Spring Security JWT', 'Resilience patterns'],
      order: 2,
    },
    {
      title: 'AI, LLM & Voice Applications Development',
      slug: 'ai-voice-apps',
      description: 'Custom generative AI solutions: LangChain RAG pipelines, voice conversational agents, and LLM tool integrations like Kevin AI.',
      price: 4499,
      durationMinutes: 60,
      category: 'ai-solutions',
      deliveryMethod: 'google_meet',
      isActive: true,
      features: ['RAG vector search (FAISS)', 'Sub-second voice pipelines', 'Prompt engineering', 'Razorpay monetization'],
      order: 3,
    },
    {
      title: '1-on-1 Engineering & Career Mentorship',
      slug: 'mentorship-session',
      description: 'Personalized 60-minute technical session covering full-stack system design, career roadmap from CUSAT to Cognizant MNC, and portfolio review.',
      price: 999,
      durationMinutes: 60,
      category: 'mentorship',
      deliveryMethod: 'google_meet',
      isActive: true,
      features: ['Resume & portfolio review', 'System design problem solving', 'Full-stack career transition', 'Written post-call summary'],
      order: 4,
    },
  ]);
  console.log('Created Services');

  // 9. Website Settings
  await SettingsModel.create({
    heroHeadline: "HEY, I'M RISHU JHA.",
    heroTagline: 'Software Engineer | Full Stack Developer | AI Enthusiast',
    heroSubtext: 'Building scalable enterprise applications, intelligent voice products and digital universes.',
    accentColor: '#A855F7',
    secondaryAccent: '#00D9FF',
    enableBookings: true,
    enableTestimonials: true,
    seoTitle: 'Rishu Jha — Personal Digital Universe',
    seoDescription: 'Official portfolio and engineering universe of Rishu Kumar Jha. Programmer Analyst at Cognizant.',
    seoKeywords: ['Rishu Jha', 'Full Stack Developer', 'Cognizant', 'Spring Boot', 'Angular', 'AI Engineer', 'Kevin AI'],
    githubUrl: 'https://github.com/CODZRISHU',
    linkedinUrl: 'https://www.linkedin.com/in/rishu-kumar-jha-51741328a',
    email: 'shivayjha7@gmail.com',
  });
  console.log('Created Website Settings');

  console.log('✅ ALL SEED DATA POPULATED SUCCESSFULLY!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
