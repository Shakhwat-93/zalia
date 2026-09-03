-- Migration 20260903000006_dedicated_pages_cms.sql
-- Expand public.pages and public.team_members for Phase 6 Dedicated Page CMS

-- 1. Alter pages table
ALTER TABLE public.pages
ADD COLUMN IF NOT EXISTS hero_eyebrow TEXT,
ADD COLUMN IF NOT EXISTS hero_heading TEXT,
ADD COLUMN IF NOT EXISTS hero_description TEXT,
ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- 2. Alter team_members table
ALTER TABLE public.team_members
ADD COLUMN IF NOT EXISTS initials TEXT,
ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- 3. Seed / Update ABOUT page content
UPDATE public.pages
SET 
  hero_eyebrow = 'WHO WE ARE',
  hero_heading = 'WE SEE MORE\nIN EVERY PROPERTY.',
  hero_description = 'We look beyond what a property is today to understand what it could become tomorrow. Combining thoughtful acquisition, intelligent development and careful transformation to create quality homes.',
  hero_image_url = '/images/about-zalia.webp',
  seo_title = 'About Zalia Properties | Who We Are & Architectural Philosophy',
  seo_description = 'Discover Zalia Properties — prime residential development, thoughtful architectural acquisitions, and considered residential transformations across London and the UK.',
  sort_order = 1,
  status = 'published',
  content = '{
    "intro": {
      "eyebrow": "OUR STORY",
      "heading": "PROPERTY HAS POTENTIAL.\nWE SEE WHAT IT CAN BECOME.",
      "narrative": "Zalia Properties identifies residential properties with potential and transforms them through thoughtful development, renovation and design."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "WE DON''T SIMPLY DEVELOP.\nWE REIMAGINE LIVING.",
      "body_p1": "Every property has inherent characteristics shaped by its architecture, history, and surroundings. Rather than imposing standardized templates, we work with the unique spatial volume of each residence to uncover its true modern potential.",
      "body_p2": "From opening axial sightlines to integrating double-height glass pavilions, our philosophy balances structural bravery with respect for architectural heritage.",
      "image_url": "/images/brand-statement.webp"
    },
    "principles": [
      {
        "number": "01",
        "title": "SEE THE POTENTIAL",
        "description": "We look beyond the existing property to understand what it could become."
      },
      {
        "number": "02",
        "title": "TRANSFORM WITH PURPOSE",
        "description": "We approach renovation and development with care, design and practicality."
      },
      {
        "number": "03",
        "title": "CREATE QUALITY",
        "description": "We focus on creating refined homes designed for modern living."
      }
    ],
    "visual_story": {
      "eyebrow": "ARCHITECTURAL METAMORPHOSIS",
      "heading": "FROM WHAT IS\nTO WHAT COULD BE.",
      "description": "Every project begins with potential and ends with a home thoughtfully shaped for modern life.",
      "image_url": "/images/3d-transformation.webp",
      "cta_text": "Explore Our Projects",
      "cta_url": "/projects"
    },
    "statement": {
      "quote": "Transforming residential properties through thoughtful development, renovation and design.",
      "author": "Zalia Properties Ltd"
    },
    "cta": {
      "eyebrow": "START A CONVERSATION",
      "heading": "HAVE A PROPERTY\nWITH POTENTIAL?",
      "supporting_text": "We are actively acquiring prime residential opportunities across London and the home counties.",
      "cta_text": "Get in Touch"
    }
  }'::jsonb
WHERE slug = 'about';

-- 4. Seed / Update WHAT WE DO page content
UPDATE public.pages
SET 
  hero_eyebrow = 'WHAT WE DO',
  hero_heading = 'A DISCIPLINED\nDEVELOPMENT MODEL.',
  hero_description = 'From identifying undervalued potential to executing complex structural renovations, we deliver refined residential properties through three core pillars.',
  hero_image_url = '/images/what-we-do.webp',
  seo_title = 'What We Do | Acquire • Transform • Create | Zalia Properties',
  seo_description = 'Explore Zalia Properties three-pillar development model: strategic acquisition, architectural transformation, and turnkey delivery of prime homes.',
  sort_order = 2,
  status = 'published',
  content = '{
    "capabilities": {
      "eyebrow": "CAPABILITIES",
      "heading": "THREE INTEGRATED PILLARS",
      "description": "A seamless end-to-end process ensuring architectural integrity and superior residential quality."
    },
    "acquire": {
      "pillar": "01 — ACQUIRE",
      "title": "Identifying Unrealized Architectural Potential",
      "description": "We rigorously analyze prime UK residential opportunities with structural, layout, or cosmetic constraints that disguise their true potential.",
      "points": [
        "Discreet off-market sourcing across London and prime UK enclaves",
        "Rapid structural appraisal and feasibility modeling",
        "Disciplined underwriting with long-term value perspective"
      ],
      "image_url": "/images/featured-project.webp"
    },
    "transform": {
      "pillar": "02 — TRANSFORM",
      "title": "Unlocking Light, Flow & Spatial Volume",
      "description": "We strip back awkward layouts and introduce structural interventions that optimize natural daylight and establish contemporary architectural flow.",
      "points": [
        "Floor-to-ceiling glass apertures and modern rear extensions",
        "Harmonizing heritage brickwork with minimalist steel fenestration",
        "Spatial reconfiguration engineered for fluid modern living"
      ],
      "image_url": "/images/before-split.webp"
    },
    "create": {
      "pillar": "03 — CREATE",
      "title": "Delivering Exceptional Finished Homes",
      "description": "Every home is brought to completion with tactile natural materials, bespoke cabinetry, and tailored finishes designed for enduring longevity.",
      "points": [
        "Turnkey delivery with comprehensive documentation",
        "Natural Portuguese limestone, bespoke oak joinery, and artisanal metalwork",
        "Concealed architectural climate control and ambient lighting scenes"
      ],
      "image_url": "/images/brand-statement.webp"
    },
    "journey_3d": [
      {
        "number": "01",
        "title": "IDENTIFY",
        "description": "A simplified architectural property appears and baseline structural viability is established."
      },
      {
        "number": "02",
        "title": "TRANSFORM",
        "description": "Architectural elements begin changing with high-performance double-height glazing and extensions."
      },
      {
        "number": "03",
        "title": "REFINE",
        "description": "Materials, limestone cladding, joinery and ambient illumination become thoroughly refined."
      },
      {
        "number": "04",
        "title": "CREATE",
        "description": "The final premium residence is revealed — a property, reimagined."
      }
    ]
  }'::jsonb
WHERE slug = 'what-we-do';

-- 5. Seed / Update APPROACH page content
UPDATE public.pages
SET 
  hero_eyebrow = 'OUR METHODOLOGY',
  hero_heading = 'A DISCIPLINED\n5-STAGE APPROACH.',
  hero_description = 'From initial volume assessment through to final turnkey handover, our structured methodology ensures every development achieves its fullest potential.',
  hero_image_url = '/images/brand-statement.webp',
  seo_title = 'Our Approach | Disciplined 5-Stage Methodology | Zalia Properties',
  seo_description = 'Discover the 5-stage Zalia methodology: Identify, Acquire, Transform, Refine, and Create. Disciplined residential development.',
  sort_order = 3,
  status = 'published',
  content = '{
    "stages": [
      {
        "number": "01",
        "name": "IDENTIFY",
        "title": "Understand The Property''s Potential",
        "summary": "We look past cosmetic decay, awkward floorplans, and dated finishes to uncover inherent volume, daylight orientation, and structural possibilities.",
        "details": [
          "Comprehensive spatial volume & daylight orientation audit",
          "Structural feasibility and load-bearing layout exploration",
          "Unlocking overlooked residential potential in prime UK enclaves"
        ],
        "image_url": "/images/about-zalia.webp",
        "sort_order": 1,
        "visibility": true
      },
      {
        "number": "02",
        "name": "ACQUIRE",
        "title": "Select Opportunities With Genuine Potential",
        "summary": "Disciplined property acquisition backed by rigorous underwriting. We only commit to properties where our architectural vision can unlock meaningful value.",
        "details": [
          "Strict residential underwriting and heritage compliance review",
          "Direct, off-market, and discreet acquisition networks",
          "Decisive institutional capitalization with long-term perspective"
        ],
        "image_url": "/images/featured-project.webp",
        "sort_order": 2,
        "visibility": true
      },
      {
        "number": "03",
        "name": "TRANSFORM",
        "title": "Reimagine The Space Through Thoughtful Design",
        "summary": "Structural reconfiguration that liberates interior flow. Introducing floor-to-ceiling glass pavilions, double-height volumes, and courtyard integration.",
        "details": [
          "Removal of compartmentalized walls in favor of fluid living zones",
          "Seamless glass apertures, skylights, and indoor-outdoor transitions",
          "Harmonizing heritage masonry with clean architectural lines"
        ],
        "image_url": "/images/before-split.webp",
        "sort_order": 3,
        "visibility": true
      },
      {
        "number": "04",
        "name": "REFINE",
        "title": "Focus On Materials, Details And Quality",
        "summary": "Every tactile touchpoint is selected with permanence in mind. Natural Portuguese limestone, oiled oak joinery, slimline steel fenestration, and silent acoustic envelopes.",
        "details": [
          "Authentic natural stone, bespoke cabinetry, and tailored steelwork",
          "Concealed architectural climate control, lighting scenes, and audio",
          "Micro-level tolerances and artisanal finishes throughout"
        ],
        "image_url": "/images/brand-statement.webp",
        "sort_order": 4,
        "visibility": true
      },
      {
        "number": "05",
        "name": "CREATE",
        "title": "Deliver A Finished Home Designed For Living",
        "summary": "The finished property is delivered turnkey — ready for discerning homeowners who prioritize understated luxury, serene acoustics, and enduring aesthetics.",
        "details": [
          "Turnkey handover with bespoke architectural manual and warranties",
          "Enduring environmental efficiency and thermal envelope excellence",
          "Timeless residential character that appreciates with longevity"
        ],
        "image_url": "/images/after-split.webp",
        "sort_order": 5,
        "visibility": true
      }
    ]
  }'::jsonb
WHERE slug = 'approach';

-- 6. Update team_members with initials and authentic roles
UPDATE public.team_members SET initials = 'ZS', sort_order = 1, status = 'published' WHERE name = 'Zaki Shamseer';
UPDATE public.team_members SET initials = 'SS', sort_order = 2, status = 'published' WHERE name = 'Selina Shamseer';
UPDATE public.team_members SET initials = 'SA', sort_order = 3, status = 'published' WHERE name = 'Sayek Ahmed';
UPDATE public.team_members SET initials = 'AF', sort_order = 4, status = 'published' WHERE name = 'Abdullah Al Faruq';
UPDATE public.team_members SET initials = 'SR', sort_order = 5, status = 'published' WHERE name = 'Md. Shahinur Rahman Utsha';
UPDATE public.team_members SET initials = 'MH', sort_order = 6, status = 'published' WHERE name = 'Mithu Huda';
