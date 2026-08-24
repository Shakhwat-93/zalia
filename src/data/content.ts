export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  focus: string[];
  tagline: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  bio: string;
  initials: string;
}

export interface ProjectItem {
  id: string;
  tag: string;
  location: string;
  category: string;
  title: string;
  description: string;
  year: string;
  scope: string[];
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
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#services" },
  { label: "3D Transformation", href: "#transformation" },
  { label: "Projects", href: "#projects" },
  { label: "Our Approach", href: "#approach" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const HERO_CONTENT = {
  eyebrow: "ZALIA PROPERTIES LTD",
  headlineLine1: "WE BUY.",
  headlineLine2: "WE TRANSFORM.",
  headlineLine3: "WE CREATE.",
  supportingCopy:
    "We identify residential properties with potential, transform them through thoughtful development, and create quality homes designed for modern living.",
  primaryCTA: "Explore Our Projects",
  secondaryCTA: "Let's Talk",
  image: "/images/hero-model.png",
};

export const BRAND_STATEMENT_CONTENT = {
  eyebrow: "BRAND STATEMENT",
  headline: "PROPERTY HAS POTENTIAL.\nWE SEE WHAT IT CAN BECOME.",
  subHeadline: "We look beyond what a property is today to understand what it could become tomorrow.",
  expandedCopy:
    "Every residential building holds an underlying story waiting to be elevated. At Zalia Properties, our methodology blends rigorous spatial analysis with bespoke architectural craftsmanship, breathing exceptional longevity and contemporary living into prime UK properties.",
  image: "/images/brand-statement.png",
};

export const SERVICES_CONTENT: {
  eyebrow: string;
  heading: string;
  subheading: string;
  services: ServiceItem[];
} = {
  eyebrow: "WHAT WE DO",
  heading: "FROM POTENTIAL TO POSSIBILITY.",
  subheading:
    "Our integrated end-to-end model ensures structural integrity, aesthetic purity, and sustainable value in every acquisition.",
  services: [
    {
      number: "01",
      title: "ACQUIRE",
      tagline: "Strategic Sourcing",
      description:
        "We identify residential properties with strong potential and the opportunity for thoughtful transformation across prime UK regions.",
      focus: ["Off-market opportunities", "Heritage & suburban estates", "Comprehensive feasibility"],
    },
    {
      number: "02",
      title: "TRANSFORM",
      tagline: "Architectural Precision",
      description:
        "We bring together design, renovation and development to unlock what each property can become through structural & spatial ingenuity.",
      focus: ["Structural reconfigurations", "High-performance glazing", "Bespoke materials palette"],
    },
    {
      number: "03",
      title: "CREATE",
      tagline: "Modern Living",
      description:
        "We create refined homes designed around quality, functionality and modern living that stand the test of time.",
      focus: ["Turnkey residential suites", "Sustainable efficiency", "Refined interior curation"],
    },
  ],
};

export const TRANSFORMATION_3D_CONTENT = {
  eyebrow: "3D PROPERTY TRANSFORMATION",
  heading: "THE ARCHITECTURAL METAMORPHOSIS",
  stages: [
    {
      stage: "01",
      title: "SEE THE POTENTIAL",
      description: "Evaluating the raw existing structure, identifying hidden volumes, light corridors, and opportunities for structural expansion.",
    },
    {
      stage: "02",
      title: "TRANSFORM WITH PURPOSE",
      description: "Integrating double-height glazing, modern architectural extensions, steel cantilevers, and precision timber slating.",
    },
    {
      stage: "03",
      title: "CREATE THE HOME",
      description: "Harmonizing natural materials, ambient recessed illumination, landscaped indoor-outdoor terraces, and turnkey finishes.",
    },
    {
      stage: "04",
      title: "A PROPERTY, REIMAGINED.",
      description: "A timeless, ultra-refined residence optimized for contemporary British family living.",
    },
  ],
  image: "/images/3d-transformation.png",
};

export const FEATURED_PROJECT_CONTENT: ProjectItem = {
  id: "project-01",
  tag: "PROJECT 01",
  location: "LONDON, UK",
  category: "RESIDENTIAL TRANSFORMATION",
  title: "The Kensington Mews & Glass Pavilion",
  description:
    "A comprehensive heritage transformation marrying traditional London stock brickwork with clean-line floor-to-ceiling glass architecture, expansive daylighting, and landscaped courtyard grounds.",
  year: "2026",
  scope: ["Full Structural Renovation", "Architectural Glass Extension", "Bespoke Interior Joinery", "Landscape Architecture"],
  image: "/images/featured-project.jpg",
};

export const BEFORE_AFTER_CONTENT = {
  eyebrow: "BEFORE / AFTER",
  title: "FROM WHAT WAS TO WHAT'S POSSIBLE.",
  description:
    "Drag the interactive slider below to explore the seamless transition from an unmodernised suburban home to an architectural statement of light and space.",
  beforeLabel: "ORIGINAL PROPERTY",
  afterLabel: "TRANSFORMED RESIDENCE",
  image: "/images/before-after.jpg",
  beforeImage: "/images/before-split.jpg",
  afterImage: "/images/after-split.jpg",
};

export const APPROACH_CONTENT = {
  eyebrow: "OUR APPROACH",
  heading: "A DISCIPLINED PHILOSOPHY OF VALUE CREATION",
  steps: [
    {
      number: "01",
      title: "IDENTIFY",
      subtitle: "Location & Spatial Audit",
      description:
        "Rigorous algorithmic and on-ground analysis to locate properties with unrealized spatial volume, structural viability, and desirable community connectivity.",
      deliverables: ["Location analytics", "Structural baseline audit", "Value ceiling mapping"],
    },
    {
      number: "02",
      title: "ACQUIRE",
      subtitle: "Decisive Execution",
      description:
        "Direct and agile acquisition structuring ensuring swift, friction-free transactions with private owners and estate administrators.",
      deliverables: ["Discreet transaction handling", "Transparent legal workflow", "Capital deployment agility"],
    },
    {
      number: "03",
      title: "TRANSFORM",
      subtitle: "Architectural Engineering",
      description:
        "Collaborative blueprints with leading architects and craftsmen to strip back inefficiencies and rebuild with sustainable, high-spec engineering.",
      deliverables: ["Envelope optimization", "Glazing & illumination", "Bespoke millwork & MEP systems"],
    },
    {
      number: "04",
      title: "REFINE",
      subtitle: "Curated Materiality",
      description:
        "Obsessive detailing from natural limestone masonry and oiled English oak to acoustically tuned quiet spaces and smart home ecosystems.",
      deliverables: ["Tactile materials review", "Acoustic & thermal sealing", "Zero-snag quality assurance"],
    },
    {
      number: "05",
      title: "CREATE",
      subtitle: "Homes of Distinction",
      description:
        "Delivering residences that elevate the standard of UK residential living, offering peace of mind, beauty, and enduring long-term value.",
      deliverables: ["Turnkey handover", "Comprehensive warranties", "Enduring architectural legacy"],
    },
  ],
};

export const ABOUT_CONTENT = {
  eyebrow: "ABOUT ZALIA",
  heading: "WE SEE MORE IN EVERY PROPERTY.",
  body: "Zalia Properties focuses on residential properties with potential — combining thoughtful acquisition, intelligent development and careful transformation to create quality homes.",
  extendedText:
    "Founded on the principle that true luxury is defined by proportion, natural light, and structural permanence, we operate with singular focus across the United Kingdom. We do not mass-produce; we sculpt each property into a refined sanctuary engineered for the rhythm of contemporary life.",
  ctaText: "Discover Zalia",
  image: "/images/about-zalia.png",
  stats: [
    { label: "Design Principle", value: "White + Minimal" },
    { label: "Geographic Focus", value: "UK Residential" },
    { label: "Standard", value: "Bespoke Excellence" },
  ],
};

export const TEAM_CONTENT: {
  eyebrow: string;
  heading: string;
  subheading: string;
  members: TeamMember[];
} = {
  eyebrow: "OUR TEAM",
  heading: "THE PEOPLE BEHIND ZALIA",
  subheading:
    "A dedicated leadership team combining architectural foresight, development precision, and bespoke client advisory.",
  members: [
    {
      name: "Zaki Shamseer",
      role: "Founder & Managing Director",
      department: "Acquisition & Strategy",
      bio: "Leading Zalia's strategic acquisitions and long-term vision, identifying prime residential assets with untapped transformative potential.",
      initials: "ZS",
    },
    {
      name: "Selina Shamseer",
      role: "Design & Interiors Director",
      department: "Architecture & Aesthetics",
      bio: "Curating the architectural identity, spatial flow, and tactile materials palette that define every Zalia home.",
      initials: "SS",
    },
    {
      name: "Issac Shamseer",
      role: "Development & Structural Director",
      department: "Engineering & Construction",
      bio: "Directing structural execution, MEP engineering, and construction logistics to ensure flawless build quality and efficiency.",
      initials: "IS",
    },
    {
      name: "Amelia Shamseer",
      role: "Client Relations & Brand Director",
      department: "Partnerships & Advisory",
      bio: "Fostering bespoke client relationships, investor communication, and the refined brand experience of Zalia Properties.",
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
