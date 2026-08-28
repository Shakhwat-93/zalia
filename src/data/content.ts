export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface ApproachStep {
  number: string;
  title: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface ProjectItem {
  id: string;
  tag: string;
  location: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export const SITE_METADATA = {
  name: "Zalia Properties Ltd",
  tagline: "Invest • Develop • Transform",
  subtag: "UK Residential Property Acquisition & Transformation",
  email: "contact@zaliaproperties.com",
  phone: "+44 (0) 20 7946 0892",
  address: "Mayfair, London W1J, United Kingdom",
  registration: "Registered in England & Wales",
};

export const NAVIGATION_LINKS = [
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/#projects" },
  { label: "3D Transformation", href: "/#transformation" },
  { label: "Our Approach", href: "/#approach" },
  { label: "Our Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export const HERO_CONTENT = {
  eyebrow: "ZALIA PROPERTIES LTD",
  headlineLine1: "WE BUY.",
  headlineLine2: "WE TRANSFORM.",
  headlineLine3: "WE CREATE.",
  supportingCopy:
    "We identify residential properties with potential and transform them into exceptional homes.",
  primaryCTA: "Explore Our Projects",
  secondaryCTA: "Let's Talk",
  image: "/images/hero-model.png",
};

export const BRAND_STRIP_POINTS = [
  { number: "01", title: "UK RESIDENTIAL" },
  { number: "02", title: "THOUGHTFUL DEVELOPMENT" },
  { number: "03", title: "QUALITY-LED RENOVATION" },
  { number: "04", title: "LONG-TERM VALUE" },
];

export const WHY_ZALIA_CONTENT = {
  eyebrow: "WHO WE ARE",
  heading: "MORE THAN\nA PROPERTY.",
  tagline: "We see what a property can become.",
  body: "Zalia Properties identifies residential properties with unrealized spatial volume and elevates them through architectural rigor, enduring materials, and modern British design.",
  ctaText: "Discover Zalia",
  image: "/images/brand-statement.png",
};

export const SERVICES_CONTENT = {
  eyebrow: "WHAT WE DO",
  heading: "FROM POTENTIAL TO POSSIBILITY.",
  services: [
    {
      number: "01",
      title: "ACQUIRE",
      description: "Identify residential properties with potential across prime UK locations.",
    },
    {
      number: "02",
      title: "TRANSFORM",
      description: "Develop, renovate and refine with purpose through structural and spatial precision.",
    },
    {
      number: "03",
      title: "CREATE",
      description: "Deliver exceptional homes designed around quality, functionality and modern living.",
    },
  ],
};

export const FEATURED_PROJECTS_CONTENT: ProjectItem[] = [
  {
    id: "project-01",
    tag: "PROJECT 01",
    location: "LONDON, UK",
    category: "Residential Transformation",
    title: "The Kensington Mews & Glass Pavilion",
    description:
      "A comprehensive heritage transformation marrying traditional brickwork with clean-line floor-to-ceiling glass architecture.",
    image: "/images/featured-project.jpg",
  },
  {
    id: "project-02",
    tag: "PROJECT 02",
    location: "MAYFAIR, LONDON",
    category: "Heritage Modernisation",
    title: "The Mayfair Glazed Residence",
    description:
      "Restoration of Victorian brick proportions seamlessly integrated with contemporary glazed living wings.",
    image: "/images/brand-statement.png",
  },
  {
    id: "project-03",
    tag: "PROJECT 03",
    location: "SURREY, UK",
    category: "Bespoke Architecture",
    title: "The Surrey Garden Villa",
    description:
      "Double-height limestone residence with expansive courtyard daylighting and turnkey bespoke joinery.",
    image: "/images/about-zalia.png",
  },
];

export const TRANSFORMATION_3D_CONTENT = {
  eyebrow: "3D PROPERTY TRANSFORMATION",
  heading: "SEE THE TRANSFORMATION.",
  subheading: "From existing property to exceptional home.",
  stages: [
    {
      stage: "01",
      title: "SEE THE POTENTIAL",
      description: "Original property form and baseline structural analysis.",
    },
    {
      stage: "02",
      title: "TRANSFORM",
      description: "Architectural extension appears with steel cantilevers and glazing.",
    },
    {
      stage: "03",
      title: "REFINE",
      description: "Materials and details evolve with warm interior illumination.",
    },
    {
      stage: "04",
      title: "CREATE",
      description: "Complete premium residence — a property, reimagined.",
    },
  ],
  image: "/images/3d-transformation.png",
};

export const BEFORE_AFTER_CONTENT = {
  eyebrow: "BEFORE / AFTER",
  heading: "FROM BEFORE\nTO BEYOND.",
  beforeLabel: "ORIGINAL PROPERTY",
  afterLabel: "TRANSFORMED RESIDENCE",
  beforeImage: "/images/before-split.jpg",
  afterImage: "/images/after-split.jpg",
};

export const APPROACH_CONTENT = {
  eyebrow: "OUR APPROACH",
  heading: "A DISCIPLINED PHILOSOPHY",
  steps: [
    { number: "01", title: "IDENTIFY" },
    { number: "02", title: "ACQUIRE" },
    { number: "03", title: "TRANSFORM" },
    { number: "04", title: "REFINE" },
    { number: "05", title: "CREATE" },
  ],
};

export const ABOUT_CONTENT = {
  eyebrow: "ABOUT ZALIA",
  heading: "WE SEE MORE\nIN EVERY PROPERTY.",
  body: "We look beyond what a property is today to understand what it could become tomorrow. Combining thoughtful acquisition, intelligent development and careful transformation to create quality homes.",
  ctaText: "About Zalia",
  image: "/images/about-zalia.png",
};

export const TEAM_CONTENT = {
  eyebrow: "OUR TEAM",
  heading: "THE PEOPLE BEHIND ZALIA",
  members: [
    {
      name: "Zaki Shamseer",
      role: "Founder & Managing Director",
      initials: "ZS",
    },
    {
      name: "Selina Shamseer",
      role: "Design & Interiors Director",
      initials: "SS",
    },
    {
      name: "Issac Shamseer",
      role: "Development & Structural Director",
      initials: "IS",
    },
    {
      name: "Amelia Shamseer",
      role: "Client Relations & Brand Director",
      initials: "AS",
    },
  ],
};

export const FINAL_CTA_CONTENT = {
  eyebrow: "CONNECT WITH US",
  heading: "HAVE A PROPERTY\nWITH POTENTIAL?",
  supportingText: "Let's start a conversation.",
  ctaText: "Get in Touch",
  image: "/images/cta-model.jpg",
};
