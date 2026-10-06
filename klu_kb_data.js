/**
 * Kalasalingam Academy of Research and Education (KARE / KLU)
 * Comprehensive Admissions Knowledge Base Dataset 2026-2027
 * Source: https://www.kalasalingam.ac.in/admissions/
 */

const KLU_DATA = {
  university: {
    fullName: "Kalasalingam Academy of Research and Education (Deemed to be University)",
    acronym: "KARE / KLU",
    location: "Anand Nagar, Krishnankoil-626126, Srivilliputtur (via), Tamil Nadu, India",
    accreditation: "NAAC 'A++' Grade, NIRF Top Ranked, AICTE & UGC Approved",
    admissionsPhone: "+91 7397760760 / 04563 289042",
    admissionsEmail: "admission@klu.ac.in / coe@klu.ac.in",
    timing: "9:00 AM to 5:00 PM (Monday to Saturday, except major Indian holidays)",
    applyUrl: "https://apply.kalasalingam.ac.in/",
    scholarshipPortal: "http://scholarship.kalasalingam.ac.in/",
    brochureUrl: "https://www.kalasalingam.ac.in/wp-content/uploads/2025/12/Brochure2026.pdf",
    appFeeResident: "₹600",
    appFeeNRI: "$50 USD"
  },

  programs: [
    {
      code: "btech-cse",
      name: "B.Tech Computer Science & Engineering (and Specializations: AI & DS, Cyber Security, IoT)",
      level: "Undergraduate",
      category: "Engineering",
      duration: "4 Years",
      stream: "MPC (Mathematics, Physics, Chemistry)",
      eligibility: "Pass in 10+2 / Intermediate / CBSE / State Board with minimum 50% aggregate in Physics, Chemistry, and Mathematics (PCM). NIOS and NWAC-US diplomas with AIU equivalency allowed.",
      entrance: "KUEE (Kalasalingam University Engineering Entrance) or JEE Main score",
      baseFeePerYear: 195000,
      miscFeePerYear: 12000,
      highlights: "High placement record, AICTE IDEA Lab, Industry collaborated courses with top tech firms."
    },
    {
      code: "btech-ece",
      name: "B.Tech Electronics & Communication Engineering",
      level: "Undergraduate",
      category: "Engineering",
      duration: "4 Years",
      stream: "MPC",
      eligibility: "Pass in 10+2 with min 50% aggregate in PCM.",
      entrance: "KUEE or JEE Main score",
      baseFeePerYear: 160000,
      miscFeePerYear: 12000,
      highlights: "Focus on VLSI, Embedded Systems, 5G, and IoT."
    },
    {
      code: "btech-biotech",
      name: "B.Tech Biotechnology / Food Technology / Biomedical",
      level: "Undergraduate",
      category: "Engineering (Bio-Stream)",
      duration: "4 Years",
      stream: "MPC or BPC (Biology, Physics, Chemistry)",
      eligibility: "Pass in 10+2 with min 50% in Physics, Chemistry, and Biology/Maths. BPC students eligible for Bio-stream programmes.",
      entrance: "KUEE or JEE Main score",
      baseFeePerYear: 160000,
      miscFeePerYear: 12000,
      highlights: "State-of-the-art Interdisciplinary Research Center (IRC) labs."
    },
    {
      code: "btech-mech-civil",
      name: "B.Tech Mechanical / Civil / Electrical & Electronics Engineering",
      level: "Undergraduate",
      category: "Engineering",
      duration: "4 Years",
      stream: "MPC",
      eligibility: "Pass in 10+2 with min 50% aggregate in PCM.",
      entrance: "KUEE or JEE Main score",
      baseFeePerYear: 150000,
      miscFeePerYear: 12000,
      highlights: "Hands-on workshop exposure, AICTE IDEA lab prototyping, CAD/CAM labs."
    },
    {
      code: "btech-lateral",
      name: "B.Tech (Lateral Entry - 2nd Year)",
      level: "Undergraduate",
      category: "Engineering",
      duration: "3 Years",
      stream: "Polytechnic Diploma",
      eligibility: "Average 60% marks in pre-final and final semester put together in a 3-year Diploma Course in relevant branch.",
      entrance: "Merit in Diploma & Counselling",
      baseFeePerYear: 150000,
      miscFeePerYear: 12000,
      highlights: "Direct 2nd-year entry, dedicated lateral entry scholarship categories."
    },
    {
      code: "barch",
      name: "B.Arch (Bachelor of Architecture)",
      level: "Undergraduate",
      category: "Architecture",
      duration: "5 Years",
      stream: "PCM",
      eligibility: "Pass in 10+2 with min 50% aggregate in PCM and minimum 50% overall in 10+2.",
      entrance: "NATA (National Aptitude Test in Architecture) valid score required.",
      baseFeePerYear: 175000,
      miscFeePerYear: 12000,
      highlights: "Council of Architecture approved, studio-based learning, design expos."
    },
    {
      code: "bsc-ahs",
      name: "B.Sc Allied Health Sciences (Nursing, BPT, OTT, MLT, Radiology, Physician Asst, Optometry, Dialysis, Emergency Care)",
      level: "Undergraduate",
      category: "Health Sciences",
      duration: "3 to 4 Years",
      stream: "PCB",
      eligibility: "Pass in 10+2 with Physics, Chemistry, and Biology with minimum 50% marks.",
      entrance: "Kalasalingam Common Entrance Exam & Merit",
      baseFeePerYear: 110000,
      miscFeePerYear: 12000,
      highlights: "Clinical rotation in multi-specialty partner hospitals, high job demand."
    },
    {
      code: "bsc-agri",
      name: "B.Sc (Hons) Agriculture / Horticulture",
      level: "Undergraduate",
      category: "Agricultural Sciences",
      duration: "4 Years",
      stream: "PCM / PCB / Agriculture",
      eligibility: "Pass in 10+2 with Physics, Chemistry, Mathematics/Biology/Agriculture with min 50% aggregate.",
      entrance: "Kalasalingam Common Entrance Exam & Merit",
      baseFeePerYear: 140000,
      miscFeePerYear: 12000,
      highlights: "Demonstration farm fields, polyhouses, organic farming training."
    },
    {
      code: "law-integrated",
      name: "B.A. L.L.B. (Hons) / B.Com L.L.B. (Hons)",
      level: "Undergraduate",
      category: "Law",
      duration: "5 Years Integrated",
      stream: "Any Stream 10+2",
      eligibility: "Pass in 10+2 Higher Secondary with minimum 50% aggregate marks.",
      entrance: "CLAT (Common Law Admission Test) or KLSAT (Kalasalingam Law School Admission Test)",
      baseFeePerYear: 120000,
      miscFeePerYear: 12000,
      highlights: "Moot court hall practice, legal aid clinic, bar council recognized."
    },
    {
      code: "llb-3yr",
      name: "L.L.B. (Hons) (3 Year)",
      level: "Undergraduate",
      category: "Law",
      duration: "3 Years",
      stream: "Graduation",
      eligibility: "Pass in 10+2 (50%) OR 45% aggregate in any Bachelor Degree discipline.",
      entrance: "CLAT or KLSAT",
      baseFeePerYear: 100000,
      miscFeePerYear: 12000,
      highlights: "Ideal for graduates seeking legal practice qualification."
    },
    {
      code: "bba",
      name: "BBA (Bachelor of Business Administration)",
      level: "Undergraduate",
      category: "Management",
      duration: "3 Years",
      stream: "Any 10+2 Stream",
      eligibility: "Pass in 12th standard (10+2) examination from any recognized board.",
      entrance: "Merit in Qualifying Exam & Entrance Interview",
      baseFeePerYear: 75000,
      miscFeePerYear: 5000,
      highlights: "Specializations in HR, Marketing, Finance, Logistics, Business Analytics."
    },
    {
      code: "bca",
      name: "BCA (Bachelor of Computer Applications)",
      level: "Undergraduate",
      category: "Computer Applications",
      duration: "3 Years",
      stream: "10+2 with Maths",
      eligibility: "Pass in 10+2 with minimum 50% marks and Mathematics as a compulsory subject.",
      entrance: "Kalasalingam Common Entrance Examination & Merit",
      baseFeePerYear: 75000,
      miscFeePerYear: 5000,
      highlights: "Cloud computing, Full-stack web dev, Python & AI lab modules."
    },
    {
      code: "bcom",
      name: "B.Com (General / Computer Applications / Professional Accounting)",
      level: "Undergraduate",
      category: "Commerce",
      duration: "3 Years",
      stream: "10+2 Commerce/Maths",
      eligibility: "Pass in 10+2 Higher Secondary with Commerce / Accountancy / Maths.",
      entrance: "Kalasalingam Common Entrance Exam & Merit",
      baseFeePerYear: 65000,
      miscFeePerYear: 5000,
      highlights: "CA foundation coaching integration, Tally & FinTech labs."
    },
    {
      code: "bsc-arts-science",
      name: "B.Sc (Computer Science / IT / Forensic Science / Physics / Chemistry / Maths / VisCom)",
      level: "Undergraduate",
      category: "Arts & Science",
      duration: "3 Years",
      stream: "10+2 Science",
      eligibility: "Pass in 10+2 with relevant science subjects with min 50% marks.",
      entrance: "Kalasalingam Common Entrance Examination",
      baseFeePerYear: 60000,
      miscFeePerYear: 5000,
      highlights: "Forensic crime lab, VisCom studio, research project guidance."
    },
    {
      code: "mba",
      name: "MBA (Master of Business Administration)",
      level: "Postgraduate",
      category: "Management",
      duration: "2 Years",
      stream: "Any Bachelor Degree",
      eligibility: "Pass in any Bachelor Degree with min 50% marks (45% for reserved category). CAT/MAT/TANCET/KUEE score.",
      entrance: "KUEE / MAT / CAT / TANCET + GD/PI",
      baseFeePerYear: 150000,
      miscFeePerYear: 12000,
      highlights: "Dual specializations in HR, Marketing, Finance, Logistics & Supply Chain, Business Analytics, Healthcare."
    },
    {
      code: "mca",
      name: "MCA (Master of Computer Applications)",
      level: "Postgraduate",
      category: "Computer Applications",
      duration: "2 Years",
      stream: "Graduation with Maths",
      eligibility: "60% in any Bachelor's degree with Mathematics at 10+2 level or Graduation level.",
      entrance: "KUEE / TANCET",
      baseFeePerYear: 100000,
      miscFeePerYear: 12000,
      highlights: "Software architecture, AI/ML electives, 6-month industry internship."
    },
    {
      code: "mtech",
      name: "M.Tech (CSE, AI & Robotics, VLSI, Automotive Systems, Biotech, Renewable Energy, Structural)",
      level: "Postgraduate",
      category: "Engineering",
      duration: "2 Years",
      stream: "B.E. / B.Tech in relevant field",
      eligibility: "Bachelor's Degree in Engg/Tech with min 5.5 CGPA or 50% marks.",
      entrance: "GATE / KEEE (Kalasalingam Engineering Entrance Exam)",
      baseFeePerYear: 90000,
      miscFeePerYear: 12000,
      highlights: "GATE qualified students receive ₹12,500/month stipend! Industry collaborated specializations."
    },
    {
      code: "msc",
      name: "M.Sc (Data Science / Computer Science / Physics / Chemistry / Mathematics / Forensic Science)",
      level: "Postgraduate",
      category: "Sciences",
      duration: "2 Years",
      stream: "B.Sc in relevant subject",
      eligibility: "Min 50% in relevant B.Sc major degree.",
      entrance: "Merit in Qualifying Examination",
      baseFeePerYear: 45000,
      miscFeePerYear: 5000,
      highlights: "Research publication opportunities, advanced lab instrumentation."
    },
    {
      code: "phd",
      name: "Ph.D (Engineering / Architecture / Arts & Science / Management Studies)",
      level: "Doctoral",
      category: "Research",
      duration: "3 to 5 Years",
      stream: "Postgraduate Degree",
      eligibility: "Master's Degree with minimum 55% marks (50% for SC/ST) in relevant discipline.",
      entrance: "University Written Test + Research Proposal Interview (NET/GATE exempted)",
      baseFeePerYear: 40000,
      miscFeePerYear: 5000,
      highlights: "Monthly research fellowship for full-time scholars, high-tech IRC facility."
    }
  ],

  scholarships: [
    {
      category: "CAT-01",
      name: "JEE Main Top Ranks Scholarship",
      criteria: "JEE Main All India Rank 1 to 25,000",
      waiver: "100% Tuition Fee Waiver for 4 years",
      notes: "Applicable for B.Tech programs. Valid for 4 years subject to academic maintenance."
    },
    {
      category: "CAT-02",
      name: "JEE Main High Ranks Scholarship",
      criteria: "JEE Main All India Rank 25,001 to 50,000",
      waiver: "75% Tuition Fee Waiver",
      notes: "Applicable for B.Tech programs."
    },
    {
      category: "CAT-03",
      name: "PCM 95%+ Merit Scholarship",
      criteria: "95% and above in 10+2 PCM (Physics, Chemistry, Mathematics)",
      waiver: "Tuition fee reduced to ₹1,50,000 / year (Concession up to ₹45,000/yr)",
      notes: "PCB considered for Biotech/Biomedical/Food Tech if Maths not taken."
    },
    {
      category: "CAT-04",
      name: "PCM 90% - 94.9% Merit Scholarship",
      criteria: "90% to 94.9% aggregate in PCM in 10+2",
      waiver: "Tuition fee capped at ₹1,50,000 / year",
      notes: "Eligible for 70% marks scored in vocational theory subject."
    },
    {
      category: "CAT-05",
      name: "PCM 80% - 89.9% Merit Scholarship",
      criteria: "80% to 89.9% aggregate in PCM in 10+2",
      waiver: "Tuition fee reduced to ₹1,00,000 / year",
      notes: "Significant relief for mid-high scoring engineering applicants."
    },
    {
      category: "CAT-06",
      name: "Lateral Entry Polytechnic Scholarship",
      criteria: "Diploma average 75%+ in pre-final & final semester",
      waiver: "Up to 50% Tuition Fee Concession",
      notes: "Valid for 3 years duration of lateral B.Tech."
    },
    {
      category: "CAT-07",
      name: "Sports Excellence Scholarship",
      criteria: "State level, National level, or International level sports representation",
      waiver: "50% to 100% Tuition Fee waiver + Free Hostel accommodation based on level",
      notes: "Requires trials and certificate verification by KARE Sports Board."
    },
    {
      category: "CAT-08",
      name: "GATE Qualified PG Stipend & Scholarship",
      criteria: "Valid GATE Score in M.Tech admissions",
      waiver: "Stipend of ₹12,500 / month + tuition fee concessions",
      notes: "Awarded by AICTE / KARE for 2 years duration."
    },
    {
      category: "CAT-09",
      name: "PG Merit Scholarship (CGPA / Percentage)",
      criteria: "UG Aggregate CGPA 8.5+ or 80%+ marks for MBA / MCA / M.Sc",
      waiver: "25% to 50% Tuition fee concession for PG programs",
      notes: "Decided at admission based on cumulative marksheets."
    }
  ],

  hostelFees: {
    description: "KLU provides 2-bedded, 4-bedded, and 5-bedded hostel accommodation with modern amenities, Wi-Fi, laundry, and hygienic veg/non-veg mess.",
    policy: "Allotment is strictly on a First-Come, First-Served basis upon seat reservation.",
    options: [
      { type: "5-Bedded Room (Non-AC)", annualFee: "₹95,000", messCharges: "Included", deposit: "₹5,000 (refundable)" },
      { type: "4-Bedded Room (Non-AC)", annualFee: "₹1,10,000", messCharges: "Included", deposit: "₹5,000 (refundable)" },
      { type: "2-Bedded Room (Non-AC)", annualFee: "₹1,25,000", messCharges: "Included", deposit: "₹5,000 (refundable)" },
      { type: "2-Bedded Room (Air-Conditioned)", annualFee: "₹1,45,000", messCharges: "Included", deposit: "₹10,000 (refundable)" }
    ]
  },

  faqs: [
    {
      id: 1,
      category: "Admission Process",
      question: "How do I apply for Kalasalingam University admissions?",
      answer: "You can apply online by visiting the official portal https://apply.kalasalingam.ac.in/. Fill in your personal and academic details, upload required marksheets (+2 / UG transcript), and pay the registration application fee of ₹600 (Resident Indian) or $50 USD (NRI/Foreign). After verification, seat allotment and entrance exam slot will be provided."
    },
    {
      id: 2,
      category: "Entrance Exams",
      question: "What entrance exams are conducted by Kalasalingam University?",
      answer: "Kalasalingam University conducts KUEE (Kalasalingam University Engineering Entrance Exam) for B.Tech & M.Tech, KLSAT for Law courses, and Kalasalingam Common Entrance Exam for B.Sc / AHS / Arts & Science. National entrance scores like JEE Main, NATA (for B.Arch), CLAT (for Law), GATE (for M.Tech), and CAT/MAT/TANCET (for MBA) are also directly accepted for scholarships and admissions."
    },
    {
      id: 3,
      category: "Admission Process",
      question: "Can I apply if my final semester results or 12th board results are pending?",
      answer: "Yes! Final year students appearing for 12th board exams or UG final semester exams can apply provisionally. For PG admissions, you can apply using available semester marksheets or MAT/CAT scores. Final seat confirmation is subject to submitting proof of passing with required minimum marks at counselling."
    },
    {
      id: 4,
      category: "Fee Structure",
      question: "What is the fee structure for B.Tech courses?",
      answer: "The base annual tuition fee for B.Tech CSE/AI-DS is ₹1,95,000/year, while ECE, Biotech, Mechanical, and Civil range between ₹1,50,000 and ₹1,60,000/year. Additionally, Soft skills and Library (Miscellaneous Fees) is ₹12,000/year. However, with PCM/JEE scholarships, tuition fees are reduced to ₹1,50,000, ₹1,00,000, or even 100% waiver!"
    },
    {
      id: 5,
      category: "Scholarships",
      question: "What scholarships are available for 12th PCM / PCB marks?",
      answer: "KLU offers generous scholarships: 95%+ in PCM gets tuition fee reduced to ₹1,50,000/yr (Cat-03); 90-94.9% gets Cat-04 benefits; 80-89.9% in PCM gets tuition fee reduced to ₹1,00,000/yr (Cat-05). For Biotech, Biomedical & Food Tech, PCB scores are considered if Maths was not taken."
    },
    {
      id: 6,
      category: "Hostel & Facilities",
      question: "What hostel facilities and fee structures are available?",
      answer: "KLU provides 2-bedded, 4-bedded, and 5-bedded hostel accommodations with 24/7 security, high-speed Wi-Fi, modern dining halls, and sports facilities. Annual fees range from ₹95,000 (5-bedded non-AC) to ₹1,45,000 (2-bedded AC) including mess charges. Allotment is on a first-come, first-served basis."
    },
    {
      id: 7,
      category: "Postgraduate",
      question: "What are the benefits for GATE qualified candidates in M.Tech?",
      answer: "Candidates who qualify GATE receive a stipend of ₹12,500 per month (awarded through AICTE/KARE scheme) during their 2-year M.Tech program, along with tuition fee concessions!"
    },
    {
      id: 8,
      category: "Law & Architecture",
      question: "What are the eligibility criteria for B.Arch and Integrated Law programs?",
      answer: "For B.Arch: Pass 10+2 with 50% in PCM and valid NATA score. For 5-year integrated BA LLB (Hons) / B.Com LLB (Hons): Pass 10+2 with minimum 50% aggregate and CLAT or KLSAT score. For 3-year LLB: Pass 10+2 with 50% or 45% in any UG degree."
    },
    {
      id: 9,
      category: "Contact & Campus",
      question: "How can I visit the campus or contact the admission office?",
      answer: "The Admission Office is located at Anand Nagar, Krishnankoil-626126, Tamil Nadu. Office timings are 9:00 AM to 5:00 PM (Monday to Saturday). You can call the admission helpline numbers +91 7397760760 or 04563 289042, or email admission@klu.ac.in. Campus visits can be scheduled online at kalasalingam.ac.in/admissions#campusvisit."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KLU_DATA;
}
