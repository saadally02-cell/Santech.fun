import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Search,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  Award,
  Layers,
  Compass,
  Ship,
  Wrench,
  AlertTriangle,
  X
} from 'lucide-react';

export interface CourseDocument {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  category: 'naval-architecture' | 'drydocking' | 'maneuvering' | 'propulsion' | 'stability' | 'safety';
  categoryLabel: string;
  source: string;
  author: string;
  filename: string;
  filePath: string;
  fileSize: string;
  description: string;
  keyTopics: string[];
  keyFormulas?: string[];
  recommendedFor: string;
}

export const ACADEMIC_DOCUMENTS: CourseDocument[] = [
  {
    id: 'nit-srt-04105',
    title: 'Dry Dock and Shipboard Maintenance',
    subtitle: 'Docking procedures, drydock types, block arrangements & stability loss',
    code: 'NIT SRT 04105',
    category: 'drydocking',
    categoryLabel: 'Drydocking & Maintenance',
    source: 'National Institute of Transport (NIT), Dar es Salaam',
    author: 'Department of Maritime Transport & Marine Engineering',
    filename: 'A_dry_dock_and_shipboard_maitenance_251217_192217_036f7c2b.pdf',
    filePath: '/assets/aistudio/A_dry_dock_and_shipboard_maitenance_251217_192217_036f7c2b.pdf',
    fileSize: '252 KB',
    description: 'Comprehensive lecture series covering graving docks, floating dry docks, slipways, syncrolifts, docking procedures, declivity of dock floor, duties of shipyard manager, master and chief officer before, during, and after drydocking.',
    keyTopics: [
      'Graving Dock vs Floating Dock mechanics',
      'Keel & bilge block arrangements',
      'Critical period & loss of GM during docking',
      'Upthrust P = Trim × MCT / a',
      'Dockmaster & Chief Officer handovers',
      'Undocking checks & sea chest valve safety'
    ],
    keyFormulas: [
      'P = (Trim in cm × MCT1cm) / a',
      'Virtual Loss of GM = (P × KM) / W'
    ],
    recommendedFor: 'MEO Class 1, 2, 4 Candidates, Drydock Superintendents, 2nd & Chief Engineers'
  },
  {
    id: 'maneuvering-notes',
    title: 'Introduction to Ship Maneuvering & Steering',
    subtitle: 'Directional stability, turning circle geometry, rudder stall & thrusters',
    code: 'NAVAL CH-06',
    category: 'maneuvering',
    categoryLabel: 'Ship Maneuverability',
    source: 'Naval Architecture Lecture Notes (Maneuverability)',
    author: 'Naval Architecture Faculty',
    filename: 'Maneuverability_notes_f3c7061f.PDF',
    filePath: '/assets/aistudio/Maneuverability_notes_f3c7061f.PDF',
    fileSize: '1.3 MB',
    description: 'Theoretical and hydrodynamic principles of ship directional stability, turning circle phases (advance, transfer, tactical diameter, drift angle), rudder hydrodynamic forces, rudder stall at ~35°, twin-screw operations, and lateral/azimuth thruster performance.',
    keyTopics: [
      'Directional stability & straight-line course stability',
      'Turning circle stages (Phase 1, 2 & Steady Turning)',
      'Advance, Transfer & Tactical Diameter (IMO MSC.137(76))',
      'Spade rudders, semi-balanced & flap rudders',
      'Rudder stall angle at 35° & transverse lift force',
      'Twin-screw interactions & bow/stern tunnel thrusters'
    ],
    keyFormulas: [
      'Advance ≤ 4.5 LBP (IMO MSC.137(76))',
      'Tactical Diameter ≤ 5.0 LBP'
    ],
    recommendedFor: 'Naval Architects, Deck Officers, Masters & Chief Engineers'
  },
  {
    id: 'nit-srt-06107',
    title: 'Ship Design Methodology (Steel Weight & Sizing)',
    subtitle: 'Steel weight estimation, Cubic Number, Method of Differences & Sato formulas',
    code: 'NIT SRT 06107',
    category: 'naval-architecture',
    categoryLabel: 'Ship Design Methodology',
    source: 'National Institute of Transport (NIT), Dar es Salaam',
    author: 'Department of Maritime Transport & Naval Architecture',
    filename: 'Ship_Design_Methodology_3_31e235dc.pdf',
    filePath: '/assets/aistudio/Ship_Design_Methodology_3_31e235dc.pdf',
    fileSize: '989 KB',
    description: 'Detailed engineering design methodologies for preliminary ship sizing, steel weight determination, outfit weight, machinery weight, Cubic Number (CN) technique, Slog-slog logarithmic formulas, Method of Differences (85% L, 55% B, 30% D), and empirical relations by Murray, Buxton, and Sato.',
    keyTopics: [
      'Cubic Number: CN = L × B × D / 100',
      'Method of Differences: 85% ΔL, 55% ΔB, 30% ΔD',
      'Weight per meter of ship length',
      'Buxton & Murray steel weight equations',
      'Sato formula for cargo ships & bulk carriers',
      'Longitudinal weight distribution curve'
    ],
    keyFormulas: [
      'CN = (L_BP × B × D) / 100',
      'Ws = Wso [1 + 0.85(ΔL/Lo) + 0.55(ΔB/Bo) + 0.30(ΔD/Do)]',
      'Ws = 0.0487 × CN^1.077 (Buxton)'
    ],
    recommendedFor: 'Naval Architecture Students (Degree/Higher Diploma), Ship Designers & Estimators'
  },
  {
    id: 'barrass-stability',
    title: 'Ship Stability: Notes & Examples (Dr. C.B. Barrass)',
    subtitle: 'Authoritative textbook on Simpson\'s rules, KM curves, trim & damaged stability',
    code: 'TEXTBOOK-BARRASS',
    category: 'stability',
    categoryLabel: 'Ship Stability',
    source: 'Dr. C.B. Barrass, MSc, CEng, MRINA (Elsevier / Butterworth-Heinemann)',
    author: 'Dr. C.B. Barrass (World Renowned Naval Architect)',
    filename: 'Ship_Stability_Notes___Examples___PDFDrive____2889ac48.pdf',
    filePath: '/assets/aistudio/Ship_Stability_Notes___Examples___PDFDrive____2889ac48.pdf',
    fileSize: '2.0 MB',
    description: 'The definitive textbook for naval architects and seafarers. Covers Simpson\'s 1st and 2nd rules, waterplane areas, KB and BM derivations, transverse stability, GZ curves of statical stability, dynamical stability, free surface effects, bilging of compartments, and drydock stability calculation.',
    keyTopics: [
      'Simpson\'s 1st Rule (1, 4, 1) & 2nd Rule (1, 3, 3, 1)',
      'Metacentric diagram & KM = KB + BM',
      'Transverse Metacentric Height (GM = KM - KG)',
      'GZ curve characteristics & angle of loll',
      'Free Surface Effect: FSE loss = (i × ρ_t) / (W × ρ_w)',
      'Drydocking critical phase upthrust P & virtual KG rise'
    ],
    keyFormulas: [
      'Area = (h / 3) × ∑(y × S1)',
      'BM = I_T / V = (L × B³) / (12 × ∇)',
      'GZ = GM × sin(θ) (for small angles)'
    ],
    recommendedFor: 'MEO Class 1/2 Oral Exam Candidates, Chief Officers, Captains & Naval Architects'
  },
  {
    id: 'barrass-design-performance',
    title: 'Ship Design and Performance for Masters and Mates',
    subtitle: 'Ship squat in open and shallow water, interaction, speed trials & power estimation',
    code: 'TEXTBOOK-PERFORMANCE',
    category: 'naval-architecture',
    categoryLabel: 'Design & Performance',
    source: 'Dr. C.B. Barrass (Butterworth-Heinemann)',
    author: 'Dr. C.B. Barrass',
    filename: 'ShipDesignPerformance_251205_174631_6194e60e.pdf',
    filePath: '/assets/aistudio/ShipDesignPerformance_251205_174631_6194e60e.pdf',
    fileSize: '1.6 MB',
    description: 'Comprehensive guide covering ship speed trials on the measured mile, correction for tide and wind, ship squat in shallow water and confined channels (canal effect), bank suction, ship-to-ship interaction during overtaking, and propulsive efficiency coefficients.',
    keyTopics: [
      'Measured mile speed trials & tide corrections',
      'Ship Squat in open water: Squat = (Cb × V²) / 100',
      'Ship Squat in confined channels: Squat = (Cb × V²) / 50',
      'Bank suction & bank cushion effects',
      'Ship-to-ship interaction in narrow channels',
      'Admiralty Coefficient & fuel consumption laws'
    ],
    keyFormulas: [
      'Squat_open = (C_B × V²) / 100 [meters]',
      'Squat_confined = (C_B × V²) / 50 [meters]',
      'Admiralty Coefficient = (Δ^(2/3) × V³) / P'
    ],
    recommendedFor: 'Masters, Harbor Pilots, Marine Surveyors & Chief Engineers'
  },
  {
    id: 'nit-srt-04104-p1',
    title: 'Ship Dimensions and Lines Plan',
    subtitle: 'Principal dimensions, form coefficients, reference planes & body plan geometry',
    code: 'NIT SRT 04104 (P1)',
    category: 'naval-architecture',
    categoryLabel: 'Ship Dimensions & Lines Plan',
    source: 'National Institute of Transport (NIT), Dar es Salaam',
    author: 'Maritime Transport & Naval Architecture Faculty',
    filename: 'Ship_Knowledge_and_Equipments_01_251213_131122_42ab3817.pdf',
    filePath: '/assets/aistudio/Ship_Knowledge_and_Equipments_01_251213_131122_42ab3817.pdf',
    fileSize: '2.3 MB',
    description: 'Foundational naval architecture courseware introducing hull geometry: LOA, LBP, LWL, beam, molded depth, draft, freeboard, deadrise, camber, tumblehome, flare, form coefficients (Block, Midship, Prismatic, Waterplane), Tonnes Per Centimeter (TPC), and orthogonal 3D projection planes (Sheer plan, Half-breadth plan, Body plan).',
    keyTopics: [
      'LOA, LBP, Molded Breadth & Molded Depth',
      'Freeboard & Plimsoll Load Line marks',
      'Block Coefficient (Cb), Midship Coefficient (Cm)',
      'Prismatic Coefficient (Cp) & Waterplane Area Coefficient (Cwp)',
      'TPC = (A_WP × 1.025) / 100',
      'Lines plan: Waterlines, Buttocks, Stations & Diagonals'
    ],
    keyFormulas: [
      'C_B = ∇ / (L × B × T)',
      'C_M = A_M / (B × T)',
      'C_P = ∇ / (A_M × L) = C_B / C_M',
      'TPC = 1.025 × A_WP / 100'
    ],
    recommendedFor: 'First Year Marine Engineering & Naval Architecture Students, Deck Cadets'
  },
  {
    id: 'nit-srt-04104-p3',
    title: 'Classification Societies and Marine Surveys',
    subtitle: 'IACS classification societies, statutory surveys, survey types & surveyor duties',
    code: 'NIT SRT 04104 (P3)',
    category: 'safety',
    categoryLabel: 'Marine Regulations & Class',
    source: 'National Institute of Transport (NIT), Dar es Salaam',
    author: 'Maritime Transport Faculty',
    filename: 'Ship_Knowledge_and_Equipments_03_260224_165009_30d0f0bc.pdf',
    filePath: '/assets/aistudio/Ship_Knowledge_and_Equipments_03_260224_165009_30d0f0bc.pdf',
    fileSize: '535 KB',
    description: 'Detailed analysis of international classification societies (IACS members: DNV, Lloyd\'s Register, ABS, Bureau Veritas, ClassNK, RINA), distinction between statutory surveys under Flag State and classification surveys, initial, annual, intermediate, renewal, drydocking, and damage surveys.',
    keyTopics: [
      'Role of Classification Societies vs Flag State Administrations (TASAC)',
      'IACS members & unified safety requirements',
      'Survey cycle: Annual, Intermediate (2.5 yrs) & Special / Renewal (5 yrs)',
      'Bottom & Drydock inspection intervals (twice in 5 years)',
      'Damage surveys & Conditions of Class (Recommendations)',
      'Class notations for hull, machinery, and automation'
    ],
    recommendedFor: 'Marine Surveyors, Technical Superintendents, 2nd & Chief Engineers'
  },
  {
    id: 'nit-srt-04104-p4',
    title: 'Basic Fire Prevention and Fire Fighting',
    subtitle: 'Combustion principles, fire classes A-E, extinguishing systems & engine room safety',
    code: 'NIT SRT 04104 (P4)',
    category: 'safety',
    categoryLabel: 'Shipboard Safety & Firefighting',
    source: 'National Institute of Transport (NIT), Dar es Salaam',
    author: 'Maritime Safety Training Department',
    filename: 'Ship_Knowledge_and_Equipments_04_260224_164924_60beab40.pdf',
    filePath: '/assets/aistudio/Ship_Knowledge_and_Equipments_04_260224_164924_60beab40.pdf',
    fileSize: '1.8 MB',
    description: 'Essential SOLAS Chapter II-2 safety training text covering fire chemistry, fire triangle and tetrahedron, heat transfer mechanisms, fire classification (Classes A, B, C, D, E/Electrical), fixed extinguishing systems (CO2 total flooding, water mist, foam, dry chemical), quick-closing valves, and fire dampers.',
    keyTopics: [
      'Fire Triangle & Tetrahedron (Fuel, Oxygen, Heat, Chain Reaction)',
      'Classes of Fire: A (Solids), B (Flammable Liquids), C (Gases), D (Metals), E (Electrical)',
      'Engine Room fire hazards: Flammable oil leaks onto hot exhaust pipes',
      'Fixed CO2 Total Flooding System & pre-discharge alarm protocols',
      'Emergency fire pump independent operation (SOLAS requirement)',
      'Fire dampers, quick closing valves & remote stops'
    ],
    recommendedFor: 'All Seafarers, Engine Watchkeepers, Fire Fighting Officers'
  },
  {
    id: 'nit-srt-07104-p1',
    title: 'Ship Propulsion Systems & Propellers',
    subtitle: 'Screw propeller geometry, FPP vs CPP, blade cavitation & heavy running',
    code: 'NIT SRT 07104',
    category: 'propulsion',
    categoryLabel: 'Ship Propulsion',
    source: 'National Institute of Transport (NIT), Dar es Salaam',
    author: 'Department of Marine Engineering (Higher Diploma)',
    filename: 'SHIP_PROPULSION_1_251125_195156_80cd538b.pdf',
    filePath: '/assets/aistudio/SHIP_PROPULSION_1_251125_195156_80cd538b.pdf',
    fileSize: '1.2 MB',
    description: 'Higher Diploma engineering syllabus on marine screw propulsion: propeller geometry, pitch ratio, slip (apparent vs real), blade count trade-offs, fixed-pitch (FPP) vs controllable-pitch propellers (CPP), shafting alignment, stern tube seals, and heavy running causes.',
    keyTopics: [
      'Propeller blade terminology: Face, Back, Leading Edge, Trailing Edge, Boss',
      'Pitch, Pitch Angle & Pitch Ratio (P/D)',
      'Apparent Slip vs Real Slip and Wake Fraction (w)',
      'FPP vs CPP operational advantages and hydraulic pitch control',
      'Heavy running causes: Hull fouling, shallow water, heavy weather, towing',
      'Propeller cavitation types (tip vortex, sheet, bubble) & blade erosion'
    ],
    keyFormulas: [
      'Apparent Slip S_A = (P × N - V) / (P × N)',
      'Real Slip S_R = (P × N - V_A) / (P × N)',
      'Wake Fraction w = (V - V_A) / V'
    ],
    recommendedFor: 'Marine Engineers, Naval Architects, Propulsion Specialists'
  },
  {
    id: 'stability-exercises',
    title: 'Ship Stability Worked Exercises & Solutions',
    subtitle: '5 comprehensive practical exam problems with step-by-step numerical solutions',
    code: 'STABILITY-EXERCISES',
    category: 'stability',
    categoryLabel: 'Stability Numerical Problems',
    source: 'Marine Engineering Stability Exercise Sheets',
    author: 'Naval Architecture & Marine Engineering Exam Board',
    filename: 'STABILITY_EXERCISES_251226_211938_4e14a984.pdf',
    filePath: '/assets/aistudio/STABILITY_EXERCISES_251226_211938_4e14a984.pdf',
    fileSize: '350 KB',
    description: 'Five real-world worked exam exercises covering ship displacement, final transverse metacentric height (GM), cargo loading on deck, fuel oil internal transfer, weight shifting, and list angle calculation using hydrostatic particulars.',
    keyTopics: [
      'Exercise 1: Calculation of displacement and new KG after deck cargo addition',
      'Exercise 2: Effect of internal oil transfer between wing double bottom tanks',
      'Exercise 3: Transverse list angle calculation (tan θ = w × d / (W × GM))',
      'Exercise 4: Critical GM and drydocking upthrust evaluation',
      'Exercise 5: Free surface moment calculation and virtual loss of GM'
    ],
    keyFormulas: [
      'New KG = ∑(Weight × KG) / Total Displacement',
      'tan(θ) = (w × d) / (W × GM_solid)'
    ],
    recommendedFor: 'MEO Class 1, 2, 4 Examination Preparation, DMI & NIT Maritime Cadets'
  },
  {
    id: 'barrass-masters-6th',
    title: 'Ship Stability for Masters and Mates (6th Edition)',
    subtitle: 'Authoritative 549-page master textbook by Dr. C.B. Barrass & Capt. D.R. Derrett',
    code: 'BARRASS-6TH-ED',
    category: 'stability',
    categoryLabel: 'Ship Stability & Seamanship',
    source: 'Elsevier Butterworth-Heinemann (Consolidated 6th Edition)',
    author: 'Dr. C.B. Barrass, MSc, CEng, MRINA & Captain D.R. Derrett',
    filename: 'Ship_Stability_for_Masters_pdf_24763260.pdf',
    filePath: '/assets/aistudio/Ship_Stability_for_Masters_pdf_24763260.pdf',
    fileSize: '3.8 MB',
    description: 'The world-standard 56-chapter master textbook covering hydrostatic particulars, Simpson\'s rules, KM derivations, KN cross curves of stability, Attwood and wall-sided formulas, angle of loll and correction, trim calculations (MCTC, LCF, LCB), drydocking upthrust P and critical period GM loss, shallow water squat, ship interaction cases (Pacific Glory, Royston Grange), bilging & permeability, Murray\'s longitudinal bending moment method, and SQA/MCA examination questions.',
    keyTopics: [
      '56 Comprehensive chapters from basic principles to advanced damage stability',
      'Wall-sided formula: GZ = sin θ · [GM + ½ · BM · tan²(θ)] & Attwood\'s formula',
      'Trim and longitudinal stability: MCTC = (Δ · GM_L) / (100 · L_BP)',
      'Drydocking critical phase upthrust P = (MCTC · t) / l and virtual loss of GM',
      'Barrass ship squat formulas in open water and confined channels',
      'Bank suction, cushion & ship-to-ship interaction hydrodynamics',
      'Murray\'s longitudinal bending moment method (SWBM and WBM)'
    ],
    keyFormulas: [
      'GZ = sin(θ) · [GM + ½ · BM · tan²(θ)]',
      'MCTC = (Δ · GM_L) / (100 · L)',
      'Squat_max = (C_b · S^0.81 · V_k^2.08) / 20 [meters]',
      'P = (Trim in cm · MCTC) / a'
    ],
    recommendedFor: 'Master Mariners, Chief Mates, Naval Architects, MEO Class 1/2 Oral Candidates & Surveyors'
  },
  {
    id: 'simonsen-rans-cfd',
    title: 'Rudder, Propeller and Hull Interaction by RANS',
    subtitle: 'Advanced CFD dissertation on viscous Navier-Stokes, PMM captive tests & Esso Osaka maneuvers',
    code: 'CFD-RANS-DTU',
    category: 'maneuvering',
    categoryLabel: 'CFD & Hydrodynamic Maneuvering',
    source: 'Technical University of Denmark (DTU) / Danish Maritime Institute',
    author: 'Dr. Claus Daniel Simonsen (Dept of Naval Architecture & Offshore Engineering)',
    filename: 'Rudder_propeller_design_by_RANS_3886ae4f.PDF',
    filePath: '/assets/aistudio/Rudder_propeller_design_by_RANS_3886ae4f.PDF',
    fileSize: '15.7 MB',
    description: 'Seminal 237-page PhD research dissertation detailing viscous Reynolds-Averaged Navier-Stokes (RANS) numerical computation for rudder, propeller, and hull hydrodynamic interactions. Formulates Baldwin-Lomax and Chien low-Reynolds k-ε turbulence modeling, body force actuator disk propeller flow representation (Hough & Ordway), Planar Motion Mechanism (PMM) pure sway and yaw simulations, and full validation on the 278,000 DWT Esso Osaka tanker.',
    keyTopics: [
      'Viscous RANS Navier-Stokes flow equations & finite-volume discretization',
      'Baldwin-Lomax & low-Reynolds k-ε turbulence models in ship boundary layers',
      'Actuator disk propeller model (Hough & Ordway radial force distribution)',
      'PMM (Planar Motion Mechanism) pure yaw & pure sway hydrodynamic derivatives',
      'Esso Osaka tanker flow validation, drift angles & rudder wake shadow',
      '2D and 3D rudder lift, drag and pressure coefficient (Cp) distributions'
    ],
    keyFormulas: [
      '∂(ρ u_i)/∂t + ∂(ρ u_i u_j)/∂x_j = -∂p/∂x_i + ∂(τ_ij)/∂x_j + f_i',
      'Y = Y_v · v + Y_r · r + Y_δ · δ + Y_vvv · v³ + Y_rrr · r³',
      'N = N_v · v + N_r · r + N_δ · δ + N_vvr · v²·r'
    ],
    recommendedFor: 'Naval Architects, CFD Engineers, Ship Maneuvering Specialists & Hydrodynamicists'
  },
  {
    id: 'hydrodynamics-notes-6dof',
    title: 'Ship Hydrodynamics, 6-DOF Motions & Propulsion Notes',
    subtitle: 'Comprehensive 66-page lecture on ship resistance, propeller design, cavitation & sea trials',
    code: 'HYDRO-601-NOTES',
    category: 'naval-architecture',
    categoryLabel: 'Ship Hydrodynamics & Propulsion',
    source: 'Naval Architecture & Marine Engineering Hydrodynamics Department',
    author: 'Naval Architecture Faculty & Propulsion Research Unit',
    filename: 'HYDRODYNAMICS_NOTES_1_7c37eebc.pdf',
    filePath: '/assets/aistudio/HYDRODYNAMICS_NOTES_1_7c37eebc.pdf',
    fileSize: '6.2 MB',
    description: 'Comprehensive 66-page naval architecture course covering 6 Degrees of Freedom (surge, sway, heave, roll, pitch, yaw), physical components of ship resistance (ITTC 1957 line, wave-making, eddy, air, and added resistance in seaways), propeller blade geometry (BAR, pitch, slip, cavitation inception), sacrificial anodes (Zn, Al, Mg) & ICCP cathodic protection, and harbor, dock, sea, and speed trial measurement protocols.',
    keyTopics: [
      '6 Degrees of Freedom: Surge, Sway, Heave, Roll, Pitch and Yaw',
      'Ship resistance components: Frictional (ITTC 1957), Wave, Eddy & Air resistance',
      'Propeller blade geometry: Pitch ratio (P/D), Blade Area Ratio (BAR), Blade Element Theory',
      'Cavitation inception: Tip vortex, sheet & bubble cavitation blade erosion',
      'Cathodic Protection: SACP sacrificial zinc/aluminum anodes vs ICCP systems',
      'Official trial protocols: Harbor trials, dock trials, sea trials & measured mile speed trials'
    ],
    keyFormulas: [
      'C_F = 0.075 / (log10(Rn) - 2)²',
      'J = V_A / (n · D)',
      'K_T = T / (ρ · n² · D⁴),  K_Q = Q / (ρ · n² · D⁵)',
      'η_O = (J / 2π) · (K_T / K_Q)'
    ],
    recommendedFor: 'Marine Engineering Cadets, Naval Architecture Undergraduates & Ship Trial Teams'
  }
];

export const AcademicLibrarySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePdfModal, setActivePdfModal] = useState<CourseDocument | null>(null);

  const categories = [
    { id: 'all', label: 'All Documents (13 Courses)' },
    { id: 'naval-architecture', label: 'Naval Architecture' },
    { id: 'stability', label: 'Stability & Exercises' },
    { id: 'propulsion', label: 'Propulsion Systems' },
    { id: 'maneuvering', label: 'Ship Maneuvering' },
    { id: 'drydocking', label: 'Drydocking & Maintenance' },
    { id: 'safety', label: 'Safety, Class & Surveys' }
  ];

  const filteredDocs = ACADEMIC_DOCUMENTS.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="academic-library" className="space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* NIT Dar es Salaam Official Partnership & Courseware Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC107]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* NIT Crest Image from /assets/aistudio/IMG-20261104-WA0113_1__cc428c64.jpg */}
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:sm-24 rounded-2xl bg-white p-2 shadow-xl border-2 border-[#FFC107] flex items-center justify-center">
              <img
                src="/assets/aistudio/IMG-20261104-WA0113_1__cc428c64.jpg"
                alt="National Institute of Transport (NIT) Crest"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/30 text-[#FFC107] text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>National Institute of Transport (NIT) Courseware & Textbooks</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white editorial-font tracking-tight">
                Marine Engineering & Naval Architecture Digital Library
              </h1>
              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
                Direct access to official NIT Dar es Salaam lecture series, Dr. C.B. Barrass authoritative naval architecture textbooks, and practical stability worked exercises. Designed for seafarers, cadet engineers, and MEO Class 1, 2, and 4 candidates.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="p-3 bg-zinc-900/80 rounded-2xl border border-white/10 text-center">
              <span className="block text-2xl font-black text-[#FFC107]">13</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Official Modules</span>
            </div>
            <div className="p-3 bg-zinc-900/80 rounded-2xl border border-white/10 text-center">
              <span className="block text-2xl font-black text-emerald-400">100%</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Free PDF Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-900/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FFC107] text-black font-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus, formulas, code..."
            className="w-full bg-zinc-950 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="group relative flex flex-col justify-between bg-zinc-900/90 hover:bg-zinc-900 border border-white/10 hover:border-[#FFC107]/50 rounded-3xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-[#FFC107]/15 text-[#FFC107] border border-[#FFC107]/30 tracking-wider uppercase font-mono">
                  {doc.code}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  {doc.fileSize}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#FFC107] transition-colors leading-snug">
                  {doc.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 mt-1">
                  {doc.subtitle}
                </p>
              </div>

              {/* Source & Author */}
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <div className="text-[11px] text-zinc-300 font-medium">
                  <span className="text-zinc-500">Source:</span> {doc.source}
                </div>
                <div className="text-[11px] text-zinc-400">
                  <span className="text-zinc-500">Author:</span> {doc.author}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {doc.description}
              </p>

              {/* Key Topics List */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Core Topics Covered:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {doc.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                      <span className="text-[#FFC107] font-bold">•</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Formulas if available */}
              {doc.keyFormulas && doc.keyFormulas.length > 0 && (
                <div className="p-3 bg-zinc-950/80 rounded-xl border border-amber-400/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFC107] font-bold block">
                    Key Exam Formulas:
                  </span>
                  {doc.keyFormulas.map((f, idx) => (
                    <div key={idx} className="text-[11px] font-mono text-amber-200">
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions: View in Modal, Download PDF, Target audience */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <div className="text-[10px] text-zinc-400 font-medium">
                <span className="text-zinc-500 font-bold uppercase">Audience:</span> {doc.recommendedFor}
              </div>

              <div className="flex items-center gap-3">
                {/* Read / Preview Button */}
                <button
                  onClick={() => setActivePdfModal(doc)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Read Document</span>
                </button>

                {/* Direct Download Button */}
                <a
                  href={doc.filePath}
                  download={doc.filename}
                  className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10"
                  title="Download PDF to device"
                >
                  <Download className="w-4 h-4 text-[#FFC107]" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In-App PDF Reader Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-6xl h-[92vh] bg-zinc-950 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-zinc-900 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black font-black flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-base font-bold text-white truncate">
                    {activePdfModal.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">
                    {activePdfModal.code} • {activePdfModal.source}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activePdfModal.filePath}
                  download={activePdfModal.filename}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white flex items-center gap-1.5 border border-white/15"
                >
                  <Download className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span className="hidden sm:inline">Save</span>
                </a>

                <a
                  href={activePdfModal.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white flex items-center gap-1.5 border border-white/15"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>

                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Embedded View */}
            <div className="flex-1 bg-zinc-900 relative w-full h-full">
              <iframe
                src={`${activePdfModal.filePath}#toolbar=1&navpanes=1`}
                title={activePdfModal.title}
                className="w-full h-full border-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-zinc-900/90 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span>National Institute of Transport & Barrass Marine Engineering Repository</span>
              <span className="text-[#FFC107] font-bold font-mono">{activePdfModal.filename}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
