import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Cpu, 
  Wrench, 
  Layers, 
  Sliders, 
  Terminal, 
  Play, 
  Phone, 
  Mail, 
  MapPin, 
  Activity, 
  CheckCircle,
  ChevronRight,
  Clipboard,
  Info,
  Zap,
  Box,
  Compass,
  ArrowRight,
  Maximize2,
  FileText,
  MousePointer,
  RotateCcw
} from 'lucide-react';

const USER_PROFILE = {
  name: "AHMED ALI MOHAMED KAMEL",
  tagline: "Mechanical Design | Tool & Die Design | Sheet Metal Design | Manufacturing Engineering | CAD/CAM",
  location: "Minya El-Qamh, Sharqia, Egypt",
  phone: "+20 115 864 7813",
  email: "mnzawy240@gmail.com",
  summary: "Production Technology student at Delta Technological University with practical, project-based experience in mechanical design, sheet metal design, tool and die design, manufacturing processes, and CAD/CAM applications. Proficient in designing sheet metal bending, piercing, and forming dies using SolidWorks, preparing manufacturing and assembly drawings, and performing die assembly. Skilled in Autodesk PowerMill for 3-axis CAM toolpath generation, with working knowledge of conventional and CNC machining, EDM technologies, engineering drawing, and quality control. Currently completing industrial training at ELARABY Group, continuously strengthening practical engineering capability through hands-on design and manufacturing projects.",
  
  coreCompetencies: [
    { category: "Design Specialization", items: ["Mechanical Design", "Tool & Die Design", "Sheet Metal Design", "Bending, Piercing & Forming Die Design"] },
    { category: "Technical Manufacturing", items: ["Manufacturing & Assembly Drawings", "Conventional & CNC Machining", "CNC Milling & CNC Lathe", "Manufacturing Processes"] },
    { category: "Precision & Quality", items: ["Wire Cut EDM", "EDM Drilling & Spark Erosion EDM", "Mechanical Measurements", "Quality Control", "Preventive Maintenance"] }
  ],
  
  softwareTools: [
    { name: "SolidWorks", detail: "Parts, Assemblies, Drawings, Sheet Metal Suite", level: 95 },
    { name: "Autodesk PowerMill", detail: "3-Axis CAM CNC Toolpath Programming", level: 90 },
    { name: "AutoCAD", detail: "2D Engineering Drafting & Blueprinting", level: 85 },
    { name: "Microsoft Suite", detail: "Technical Documentation (Word, Excel, PowerPoint)", level: 80 }
  ],

  education: [
    {
      institution: "Delta Technological University",
      degree: "Bachelor of Technology - Production Technology & Mold Technology",
      period: "Second Year (In Progress)",
      details: "In-depth study of high-level industrial production systems, mold architecture, tooling dynamics, and structural mechanics."
    },
    {
      institution: "Fresh International School for Applied Technology",
      degree: "Manufacturing & Maintenance of Sheet Metal Molds",
      period: "2022 - 2025",
      details: "Specialized vocational blueprinting, toolmaking setups, high-precision tolerance maintenance, and die installation cycles."
    }
  ],

  training: [
    {
      company: "ELARABY Group",
      role: "Industrial Engineering Trainee",
      period: "Active Placement",
      location: "Stamping & Molds Division",
      points: [
        "Analyzing real-world progressive and compound die setups on high-pressure mechanical presses.",
        "Inspecting punch and die block clearance wear patterns and planning preventive maintenance cycles.",
        "Reviewing high-volume manufacturing engineering workflows and tooling sheet design modifications."
      ]
    },
    {
      company: "Fresh International School for Applied Technology",
      role: "Hands-On Technical Training Labs",
      period: "2022 - 2025",
      location: "Comprehensive Engineering Workshops",
      points: [
        "Machining: Set up, calibrated, and operated Conventional Lathe, Conventional Milling, Shaper Machine, Surface Grinding, and Cylindrical Grinding alongside CNC Lathe and CNC Milling.",
        "EDM Technologies: Executed precision spark erosion profiles using Wire Cut EDM, EDM Drilling Machine, and Spark Erosion EDM.",
        "Mold Operations: Directed physical Die & Mold Assembly, installation, press testing, alignment, troubleshooting, and strict preventive maintenance protocols.",
        "Quality & Metrology: Accomplished complex physical parts inspections utilizing micrometers and vernier calipers based on engineered blueprints."
      ]
    }
  ],

  projects: [
    {
      id: "PROJ-01",
      title: "Drilling Machine Prototype",
      tagline: "Designed & Fabricated Complete Assembly",
      description: "Successfully designed and manufactured a fully functional drilling machine workshop prototype. Computed spindle loads, column bend deflection factors, and custom pulley ratios.",
      gcode: "G21 (Metric Units)\nG90 (Absolute Programming)\nM03 S1200 (Spindle Forward Start)\nG00 X45.0 Y45.0 Z5.0 (Rapid Slide)\nG01 Z-22.0 F95.0 (Plunge Feed Rate)\nG04 P1500 (Spindle Dwell at Depth)\nG00 Z5.0 (Rapid Feed Retract)\nM05 (Spindle Stop)\nM30 (Program End)",
      vertices: [
        [-20, -50, -20], [20, -50, -20], [20, -50, 20], [-20, -50, 20], // Base Plate bottom
        [-15, -40, -15], [15, -40, -15], [15, -40, 15], [-15, -40, 15], // Base plate top step
        [-6, -40, -6], [6, -40, -6], [6, 40, -6], [-6, 40, -6],       // Heavy structural column
        [-6, -40, 6], [6, -40, 6], [6, 40, 6], [-6, 40, 6],
        [-12, 25, 6], [12, 25, 6], [12, 40, 22], [-12, 40, 22],       // Spindle gear assembly
        [0, 25, 18], [0, -15, 18]                                     // Active Drill Spindle Shaft
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7], 
        [8,9], [9,10], [10,11], [11,8], [12,13], [13,14], [14,15], [15,12], [8,12], [9,13], [10,14], [11,15],
        [16,17], [17,18], [18,19], [19,16], [16,12], [17,13], 
        [20,21]
      ]
    },
    {
      id: "PROJ-02",
      title: "Mechanical Crusher",
      tagline: "SolidWorks Jaw Kinematics",
      description: "Designed a high-rigidity heavy industrial mechanical jaw crusher. Integrated dual massive kinetic flywheels, slider-crank mechanisms, and textured wear-resistant crushing jaw plates.",
      gcode: "G17 G21 G90 (Plane Setup)\nT03 M06 (Flywheel Tool Setup)\nM03 S850 F120\nG00 X-20.0 Y-20.0 Z3.0\nG01 Z-8.0 F100\nG41 D03 G01 X0 Y0\nG02 X150.0 Y150.0 R75.0 (Circular Profile Milling)\nG40 G00 Z30.0 M30",
      vertices: [
        [-30, -30, -20], [30, -30, -20], [30, 40, -20], [-30, 40, -20], // Outer framework
        [-30, -30, 20], [30, -30, 20], [30, 40, 20], [-30, 40, 20],
        [-15, 20, -5], [15, 20, -5], [12, -20, 0], [-12, -20, 0],       // Reciprocating Jaw Plate
        [-45, 25, 0], [-45, 25, -20], [-45, 25, 20],                     // Left heavy Flywheel
        [45, 25, 0], [45, 25, -20], [45, 25, 20]                        // Right heavy Flywheel
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7],
        [8,9], [9,10], [10,11], [11,8],
        [12,13], [12,14], [13,14],
        [15,16], [15,17], [16,17]
      ]
    },
    {
      id: "PROJ-03",
      title: "Mechanical Press & Sheet Metal Die",
      tagline: "Integrated Assembly & Stripper Design",
      description: "Designed a mechanical reciprocating press coupled directly with a functional sheet metal stamping die. Simulated force flow from crankshaft rotation down to linear stamping punch impact.",
      gcode: "G90 G54 G17 (Absolute Coordinates)\nM03 S1500 (Engage Spindle)\nG00 X80.0 Y80.0 Z10.0\nG01 Z-4.0 F125.0\nG02 I-40.0 J0.0 F300.0 (Boring Guide Pillars)\nG01 Z-8.0\nG02 I-40.0 J0.0 F280.0\nG00 Z30.0 M05",
      vertices: [
        [-25, -45, -25], [25, -45, -25], [25, -45, 25], [-25, -45, 25], // Bolster frame base
        [-20, 45, -20], [20, 45, -20], [20, 45, 20], [-20, 45, 20],     // Slide block guides
        [-5, 45, 0], [5, 45, 0], [0, 20, 0],                            // Crankshaft linkage pins
        [-12, 10, -12], [12, 10, -12], [12, 10, 12], [-12, 10, 12],     // Stamping Punch assembly
        [-10, -25, -10], [10, -25, -10], [10, -25, 10], [-10, -25, 10]   // Lower matrix/die opening
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4],
        [8,9], [9,10], [10,8],
        [11,12], [12,13], [13,14], [14,11],
        [15,16], [16,17], [17,18], [18,15],
        [0,4], [1,5], [2,6], [3,7]
      ]
    },
    {
      id: "PROJ-04",
      title: "Angle Vise & Lathe Chuck",
      tagline: "High Precision Workholding Fixtures",
      description: "Designed a high-force precision angle vise with fine rotational dial scales for compound angles alongside a classic self-centering 3-jaw lathe chuck utilizing scroll spiral geometry.",
      gcode: "G21 G90 (Setup metrics)\nG00 X10.0 Y15.0 Z5.0\nM03 S1000 F150\nG01 Z-5.0 F120\nG01 X150.0 Y15.0 F280 (Milling Slide Slot Channel)\nG00 Z5.0 Y25.0\nG01 Z-5.0 F120\nG01 X150.0 Y25.0 F280\nG00 Z40.0 M30",
      vertices: [
        [-30, -12, -30], [30, -12, -30], [30, -12, 30], [-30, -12, 30], // Lathe chuck rear body cylinder
        [-30, 12, -30], [30, 12, -30], [30, 12, 30], [-30, 12, 30],
        [-6, 12, 22], [6, 12, 22], [6, 28, 16], [-6, 28, 16],           // Stepped Jaw 1
        [-22, 12, -10], [-28, 22, -15], [-18, 22, -15],                 // Stepped Jaw 2
        [22, 12, -10], [28, 22, -15], [18, 22, -15]                     // Stepped Jaw 3
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7],
        [8,9], [9,10], [10,11], [11,8], [8,4], [9,5],
        [12,13], [12,14], [13,14],
        [15,16], [15,17], [16,17]
      ]
    },
    {
      id: "PROJ-05",
      title: "Roller Conveyor System",
      tagline: "Industrial Material Transport Assembly",
      description: "Designed a complete modular material handling roller conveyor line. Selected appropriate structural channels, load ratings, roller bearing configurations, and low-friction rolling axes.",
      gcode: "G21 G90 G94 (Milling cycle)\nT04 M06 (Drilling head setup)\nM03 S900\nG00 X40.0 Y35.0 Z4.0\nG83 Z-14.0 R2.5 Q5.0 F105 (Deep Peck Cycle for Shaft Bolts)\nX140.0\nX240.0\nX340.0\nG80 G00 Z35.0",
      vertices: [
        [-40, -18, -20], [40, -18, -20], [40, -18, 20], [-40, -18, 20], // Structural frame Left channel
        [-40, 18, -20], [40, 18, -20], [40, 18, 20], [-40, 18, 20],     // Structural frame Right channel
        [-30, -15, 0], [-30, 15, 0],                                    // Roller Drum Axle #1
        [0, -15, 0], [0, 15, 0],                                        // Roller Drum Axle #2
        [30, -15, 0], [30, 15, 0]                                       // Roller Drum Axle #3
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4],
        [8,9], [10,11], [12,13]
      ]
    },
    {
      id: "PROJ-06",
      title: "Drilling & Angle Fixture",
      tagline: "Welding Positioner Assembly",
      description: "Designed and manufactured an adjustable locating drilling/welding fixture. Integrated heavy toggle clamp alignments to securely anchor tubing parts for accurate repetitive production runs.",
      gcode: "G90 G21 (High-Tolerance metric)\nM03 S1800\nG00 X0.0 Y0.0 Z2.0\nG01 Z-10.0 F120.0 (Locating pin journal cutting)\nG02 I6.0 J0.0 F280.0\nG00 Z15.0 M30",
      vertices: [
        [-25, -25, -15], [25, -25, -15], [25, -25, 15], [-25, -25, 15], // Sturdy fixture plate base
        [-25, 0, -15], [25, 0, -15], [25, 0, 15], [-25, 0, 15],         // Vertical locator face block
        [0, 0, 0], [0, 32, 22], [-10, 22, 6], [10, 22, 6]               // Rigid mechanical holding arm
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7],
        [8,9], [9,10], [9,11], [10,11]
      ]
    },
    {
      id: "PROJ-07",
      title: "Shaper Saw Cutting Attachment",
      tagline: "Reciprocating Stroke Adapter Prototype",
      description: "Designed and manufactured a mechanical adapter that converts a standard shaping machine reciprocating horizontal slide into a rapid-acting vertical metal-cutting saw blade machine.",
      gcode: "G20 G90 (Inches selection)\nM03 S350\nG00 X1.5 Y0.0 Z0.1\nG01 Z-0.12 F1.5\nG01 Y4.0 F18.0 (Precision shaper feed simulation)\nG00 Z0.4\nG00 Y0.0\nG01 Z-0.24 F1.5\nG01 Y4.0 F18.0\nG00 Z1.5 M05",
      vertices: [
        [-35, -10, -10], [35, -10, -10], [35, 10, -10], [-35, 10, -10], // Slide slider base body
        [-35, -10, 10], [35, -10, 10], [35, 10, 10], [-35, 10, 10],
        [-30, -25, 0], [30, -25, 0],                                    // Toothed blade outline
        [-20, -20, 0], [-10, -20, 0], [0, -20, 0], [10, -20, 0], [20, -20, 0]
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7],
        [8,9], [8,10], [10,11], [11,12], [12,13], [13,14], [14,9]
      ]
    },
    {
      id: "PROJ-08",
      title: "SolidWorks Sheet Metal Dies",
      tagline: "Parametric Bending, Piercing & Forming Suite",
      description: "Engineered and modeled complex stamping tools inside SolidWorks. Designed and calculated exact punch clearance, blank strip layouts, springback coefficients, and total bending forces.",
      gcode: "G90 G21 (Blank Strip Program)\nM03 S1100\nG00 X0.0 Y0.0 Z12.0\nG00 X50.0 Y35.0\nG81 Z-8.0 R2.0 F140 (Piercing cycle phase)\nX100.0\nG80 G00 Z25.0 M30",
      vertices: [
        [-35, -25, -15], [35, -25, -15], [35, -25, 15], [-35, -25, 15], // Lower die plate cavity
        [-35, 25, -15], [35, 25, -15], [35, 25, 15], [-35, 25, 15],     // Upper punch shoe assembly
        [-15, -25, 0], [15, -25, 0], [15, 25, 0], [-15, 25, 0]          // Active bending forming insert
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0],
        [4,5], [5,6], [6,7], [7,4],
        [8,9], [9,10], [10,11], [11,8]
      ]
    },
    {
      id: "PROJ-09",
      title: "GD&T Detail Manufacturing Drawings",
      tagline: "ASME Y14.5 Compliant Mechanical Blueprinting",
      description: "Prepared an exhaustive professional portfolio of complete production detail/assembly drawings in SolidWorks, utilizing strict GD&T tolerances, fits and limits, and surface finish (Ra) annotations.",
      gcode: "%09115 (ASME_BLUEPRINT_VERIFY)\n(TOLERANCES: ISO 2768-M)\n(LIMITS: H7-g6)\n(DATUMS: A=BOLSTER, B=PILLARS)\nM30",
      vertices: [
        [-30, -30, 0], [30, -30, 0], [30, 30, 0], [-30, 30, 0], // Sheet frame boundaries
        [-15, -15, 0], [15, -15, 0], [15, 15, 0], [-15, 15, 0], // High tolerance datum features
        [-4, -4, -12], [4, -4, -12], [4, 4, 12], [-4, 4, 12]    // Axial concentricity check limits
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0],
        [4,5], [5,6], [6,7], [7,4],
        [8,9], [9,10], [10,11], [11,8]
      ]
    },
    {
      id: "PROJ-10",
      title: "Hands-On Practical Die Assembly",
      tagline: "Physical Fitting, Testing & Maintenance",
      description: "Conducted physical assembly, alignment testing, and trial runs of punch and die sets in active labs. Verified tolerances down to 0.02mm using micrometers and precision feeler gauges.",
      gcode: "(DIE ASSEMBLY TESTING)\n(MARPOSS DIAL INDICATOR CHECK)\nG00 X0.0 Y0.0 Z10.0\nG31 Z-15.0 F45.0 (Verify punch base heights)\n(TOLERANCE STATUS: WITHIN 0.012mm)\nM30",
      vertices: [
        [-30, -35, -20], [30, -35, -20], [30, -35, 20], [-30, -35, 20], // Bottom plate bed
        [-30, 35, -20], [30, 35, -20], [30, 35, 20], [-30, 35, 20],     // Top punch shoe frame
        [-25, -35, -15], [-25, 35, -15],                                // Left guide pillar shaft
        [25, -35, -15], [25, 35, -15]                                   // Right guide pillar shaft
      ],
      edges: [
        [0,1], [1,2], [2,3], [3,0],
        [4,5], [5,6], [6,7], [7,4],
        [8,9], [10,11]
      ]
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('simulators'); 
  const [activeSimTab, setActiveSimTab] = useState('stamping'); 
  const [selectedProject, setSelectedProject] = useState(USER_PROFILE.projects[0]);
  const [globalLogs, setGlobalLogs] = useState([
    "INITIALIZING SYSTEM CONSOLE...",
    "VERIFYING DATA FILE: Ahmed_Ali_Kamel_Resume (1)(1).pdf",
    "RESOURCES STATUS: ALL SYSTEMS ONLINE AND LOADED.",
    "INTERFACE MODE: ULTRA-HIGH READABILITY HIGH CONTRAST."
  ]);
  const [feedbackToast, setFeedbackToast] = useState("");

  const pushLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setGlobalLogs(prev => [...prev.slice(-4), `[${time}] ${msg}`]);
  };

  const triggerToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(""), 4000);
  };

  return (
    <div className="min-h-screen bg-[#030406] text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* CSS Overrides for Premium bold fonts and smooth UI tweaks */}
      <style>{`
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #030406;
        }
        .glow-cyan {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
        }
        .border-glow {
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);
        }
      `}</style>

      {/* Blueprint Grid Mesh Overlay (High Contrast & Legible) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:45px_45px]"></div>
      
      {/* Top Premium Navigation Header */}
      <header className="border-b-2 border-zinc-800 bg-[#07090d]/95 backdrop-blur-md sticky top-0 z-50 shadow-[0_5px_25px_rgba(0,0,0,0.85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col lg:flex-row justify-between items-center gap-5">
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-zinc-800 to-zinc-950 border-2 border-cyan-400/80 flex items-center justify-center font-mono font-black text-cyan-400 text-lg shadow-[inset_0_1px_4px_rgba(255,255,255,0.15),0_0_15px_rgba(6,182,212,0.3)] shrink-0">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">{USER_PROFILE.name}</h1>
                <span className="text-xs font-mono bg-cyan-950/80 text-cyan-400 px-2.5 py-1 border border-cyan-500/40 font-bold uppercase">CAD/CAM Expert</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider font-bold uppercase mt-0.5">// Mechanical Design & Tool & Die Specialist</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-2 bg-[#0d1017] p-1.5 border-2 border-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {[
              { id: 'simulators', label: 'MACHINING LAB', icon: Wrench },
              { id: 'blueprints', label: '10 CAD PROJECTS', icon: Box },
              { id: 'career', label: 'ACADEMICS & EXPERIENCE', icon: Layers },
              { id: 'contact', label: 'SECURE DISPATCH', icon: Terminal }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    pushLog(`ROUTE LOADED: ${tab.label.toUpperCase()}`);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-mono tracking-widest transition-all duration-200 uppercase font-black ${
                    activeTab === tab.id 
                      ? 'bg-zinc-800 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </header>

      {/* Real-time Telemetry Status Ribbon */}
      <div className="bg-[#010204] border-b-2 border-zinc-900 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs font-mono text-zinc-400 font-bold">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-cyan-400 glow-cyan">
              <span className="h-2 w-2 bg-cyan-400 animate-ping rounded-full"></span>
              SYS STATUS: OPERATIONAL
            </span>
            <span>|</span>
            <span>SOURCE: Ahmed_Ali_Kamel_Resume (1)(1).pdf</span>
            <span>|</span>
            <span className="text-zinc-300">METALS CATALOGUE: D2 TOOL STEEL, HIGH SPEED STEEL, MILD CARBON</span>
          </div>
          <div className="flex items-center gap-4">
            <span>FEEDBACK: ACTIVE CONVERSATIONAL</span>
            <span>TOLERANCE RANGE: ISO 2768-M</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">

        {/* Global Floating Custom Toast */}
        {feedbackToast && (
          <div className="fixed bottom-8 right-8 bg-[#090d16] border-2 border-cyan-400 text-cyan-400 font-mono text-sm p-4 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-3.5 z-[999] animate-bounce">
            <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
            <span className="font-bold">{feedbackToast}</span>
          </div>
        )}

        {}
        {activeTab === 'simulators' && (
          <div className="space-y-8">
            
            {/* Main Interactive Hero Card (Fully Revamped Typography) */}
            <div className="bg-gradient-to-r from-[#0a0d14] to-[#121620] border-2 border-zinc-800 p-8 flex flex-col lg:flex-row gap-8 justify-between items-start relative overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.8)]">
              <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-500/5 blur-[90px] pointer-events-none rounded-full"></div>
              
              <div className="space-y-4 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs font-black tracking-widest uppercase">
                  <Zap className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <span>CANDIDATE CAPABILITY SCOREBOARD</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  Design. Manufacture. Calibrate.<br/>
                  <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-zinc-300 bg-clip-text text-transparent">Tool & Die Design & Manufacturing Engineering</span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                  {USER_PROFILE.summary}
                </p>
              </div>

              {/* Instant Contact Panel */}
              <div className="bg-[#050609] border-2 border-zinc-800 p-5 w-full lg:w-80 space-y-4 font-mono text-xs text-zinc-300 shadow-inner">
                <span className="text-[10px] text-cyan-400 block uppercase border-b border-zinc-800 pb-2 font-black tracking-widest">// SECURE COMMS DIRECTORY</span>
                <div className="space-y-3">
                  <a href="tel:+201158647813" className="flex justify-between items-center hover:text-cyan-400 transition-colors group">
                    <span className="text-zinc-500 font-bold">VOICE CALL:</span>
                    <span className="font-bold underline">{USER_PROFILE.phone}</span>
                  </a>
                  <a href={`mailto:${USER_PROFILE.email}`} className="flex justify-between items-center hover:text-cyan-400 transition-colors group">
                    <span className="text-zinc-500 font-bold">EMAIL MAILBOX:</span>
                    <span className="font-bold underline">{USER_PROFILE.email}</span>
                  </a>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-bold">LOCATION:</span>
                    <span className="font-bold text-zinc-100">Sharqia, Egypt</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setActiveTab('contact');
                      pushLog("ROUTED TO CONTACT DESK.");
                    }}
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 font-bold border border-cyan-500/20 uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Instant Project Message</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Machining Workbench Hub */}
            <div className="bg-[#07090d] border-2 border-zinc-800 p-6 sm:p-8 shadow-[0_20px_45px_rgba(0,0,0,0.9)]">
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 border-b border-zinc-800 pb-6 mb-8">
                <div>
                  <h3 className="text-base sm:text-lg font-black uppercase text-white flex items-center gap-3 tracking-widest font-mono">
                    <Wrench className="h-5 w-5 text-cyan-400" />
                    Interactive Machining & Stamping Laboratory
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">Simulate manufacturing operations, press shear clearance equations, and feeds-speeds algorithms in real time.</p>
                </div>

                {/* Sub Tab selection */}
                <div className="flex flex-wrap gap-1.5 bg-[#030406] p-1 border-2 border-zinc-800 shadow-inner w-full lg:w-auto">
                  {[
                    { id: 'stamping', label: 'STAMPING PRESS SIM' },
                    { id: 'calculator', label: 'DIE SHEAR CLEARANCE' },
                    { id: 'cam', label: 'FEEDS & SPEEDS CAM' }
                  ].map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => {
                        setActiveSimTab(subTab.id);
                        pushLog(`WORKBENCH SWITCHED: ${subTab.label}`);
                      }}
                      className={`flex-grow lg:flex-grow-0 px-4 py-2.5 font-mono text-xs tracking-widest font-black transition-all ${
                        activeSimTab === subTab.id 
                          ? 'bg-zinc-800 text-cyan-400 border border-cyan-500/30' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Workbench Layout Render */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                
                {/* Visual Sandbox Console (Left Side) */}
                <div className="xl:col-span-8 bg-[#030406] border-2 border-zinc-800/80 p-6 flex flex-col justify-between min-h-[420px] relative shadow-inner">
                  {activeSimTab === 'stamping' && <StampingSimulationWidget pushLog={pushLog} />}
                  {activeSimTab === 'calculator' && <DieClearanceCalculatorWidget pushLog={pushLog} triggerToast={triggerToast} />}
                  {activeSimTab === 'cam' && <FeedsAndSpeedsWidget pushLog={pushLog} triggerToast={triggerToast} />}
                </div>

                {/* Real-time System Feed Console (Right Side) */}
                <div className="xl:col-span-4 bg-[#07090d] border-2 border-zinc-800 p-6 flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] space-y-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-500 border-b border-zinc-800 pb-3">
                      <span>STATION STATUS REPORT</span>
                      <span className="text-cyan-400 flex items-center gap-1.5 font-black animate-pulse">
                        <span className="h-2 w-2 bg-cyan-400 rounded-full"></span>
                        LIVE
                      </span>
                    </div>

                    {/* System Feed Code Lines */}
                    <div className="bg-black border border-zinc-850 p-4 h-56 overflow-y-auto font-mono text-xs text-zinc-300 space-y-2.5 shadow-inner">
                      {globalLogs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-cyan-500 select-none">&gt;&gt;</span>
                          <p className="leading-relaxed">{log}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quick Physical Constants Reference */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-black">// CONSTANTS & CONSTRAINTS</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-[#030406] p-3 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px] font-bold">Max Blanking Force</span>
                          <span className="font-black text-cyan-400">250 kN</span>
                        </div>
                        <div className="bg-[#030406] p-3 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px] font-bold">EDM Tolerances</span>
                          <span className="font-black text-cyan-400">±0.005 mm</span>
                        </div>
                        <div className="bg-[#030406] p-3 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px] font-bold">Standard ISO Fits</span>
                          <span className="font-black text-cyan-400">H7/g6 Standard</span>
                        </div>
                        <div className="bg-[#030406] p-3 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px] font-bold">Material Hardness</span>
                          <span className="font-black text-cyan-400">58-62 HRC (D2)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 text-xs font-mono text-zinc-500 leading-relaxed font-bold">
                    *Calculation models derived from classical machine design algorithms. Always check physical prototype clearances before executing final toolpath tooling cycles.
                  </div>
                </div>

              </div>

            </div>

            {/* Organized Core Competencies Grid */}
            <div className="bg-[#07090d] border-2 border-zinc-800 p-8 shadow-md">
              <h3 className="text-base sm:text-lg font-black uppercase text-white mb-6 flex items-center gap-3 tracking-widest font-mono">
                <Sliders className="h-5 w-5 text-cyan-400" />
                Comprehensive Technical Knowledge Matrices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {USER_PROFILE.coreCompetencies.map((group, index) => (
                  <div key={index} className="bg-[#030406] border-2 border-zinc-800 p-6 space-y-4 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                    <div className="absolute top-0 right-0 h-12 w-12 bg-cyan-500/5 blur-[25px] pointer-events-none rounded-full"></div>
                    <span className="text-[10px] font-mono text-cyan-400 border-b border-zinc-800 pb-2 block uppercase tracking-widest font-black">
                      [0{index+1}] {group.category}
                    </span>
                    <ul className="space-y-3 font-mono text-xs sm:text-sm text-zinc-300 font-bold">
                      {group.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <ChevronRight className="h-4 w-4 text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Capabilities Panel */}
            <div className="bg-[#07090d] border-2 border-zinc-800 p-8">
              <h3 className="text-base sm:text-lg font-black uppercase text-white mb-6 flex items-center gap-3 tracking-widest font-mono">
                <Cpu className="h-5 w-5 text-cyan-400" />
                Engineering Software & Drafting Platforms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {USER_PROFILE.softwareTools.map((tool, index) => (
                  <div key={index} className="bg-[#030406] border-2 border-zinc-800 p-5 flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300">
                    <div>
                      <span className="text-sm sm:text-base font-mono font-black text-white block uppercase">{tool.name}</span>
                      <span className="text-xs font-mono text-zinc-400 block mt-2 leading-relaxed">{tool.detail}</span>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-xs font-mono text-zinc-500 font-bold">
                        <span>CALIBRATED PROFICIENCY</span>
                        <span className="text-cyan-400">{tool.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 overflow-hidden">
                        <div className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ width: `${tool.level}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {}
        {activeTab === 'blueprints' && (
          <div className="space-y-8">
            <div className="bg-[#07090d] border-2 border-zinc-800 p-6 sm:p-8 shadow-[0_20px_45px_rgba(0,0,0,0.9)]">
              
              <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 border-b border-zinc-800 pb-6">
                <div>
                  <span className="font-mono text-xs text-cyan-400 block uppercase tracking-widest font-black">// CATALOGUE OF 10 AUTHENTIC MECHANICAL WORKS</span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-2 font-mono">CAD / CAM Mechanical Production Ledger</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">Select an active production file to display its physical descriptions, CAM toolpaths, and rotate the interactive 3D Wireframe projection.</p>
                </div>
                <div className="text-xs font-mono text-zinc-400 bg-[#030406] px-4 py-2 border-2 border-zinc-800 font-bold">
                  ORBIT / ROTATE MODEL: CLICK & DRAG SCREEN FREELY
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                
                {/* Project Directory Side Column */}
                <div className="xl:col-span-4 space-y-2 max-h-[620px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                  {USER_PROFILE.projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj);
                        pushLog(`FILE LOADED: ${proj.id} - ${proj.title}`);
                      }}
                      className={`w-full text-left p-4 border-2 transition-all flex justify-between items-center duration-200 ${
                        selectedProject.id === proj.id
                          ? 'bg-gradient-to-r from-zinc-900 to-zinc-800 border-cyan-400/80 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'bg-[#030406] border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`text-[10px] font-mono font-black px-2 py-0.5 border ${
                            selectedProject.id === proj.id ? 'bg-cyan-950 text-cyan-400 border-cyan-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                          }`}>{proj.id}</span>
                          <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider">{proj.title}</span>
                        </div>
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase font-black">{proj.tagline}</span>
                      </div>
                      <ChevronRight className={`h-5 w-5 shrink-0 transition-transform ${selectedProject.id === proj.id ? 'text-cyan-400 translate-x-1.5' : 'text-zinc-700'}`} />
                    </button>
                  ))}
                </div>

                {/* Spec Screen & 3D Interactive Viewer Block */}
                <div className="xl:col-span-8 bg-[#030406] border-2 border-zinc-800 p-6 sm:p-8 flex flex-col justify-between relative shadow-inner">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Left: Metadata Descriptions */}
                    <div className="space-y-6">
                      <div className="border-b border-zinc-850 pb-4">
                        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 border border-cyan-500/20 font-black uppercase">VALIDATED G-CODE</span>
                          <span className="text-xs font-mono text-zinc-500 uppercase font-bold">{selectedProject.tagline}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-tight font-mono">{selectedProject.title}</h4>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-xs text-zinc-500 uppercase block font-black">Engineering Concept Analysis</span>
                        <p className="text-sm text-zinc-300 font-medium leading-relaxed">{selectedProject.description}</p>
                      </div>

                      {/* Integrated Toolpath G-Code Generator Output */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-xs font-mono text-zinc-500 font-bold">
                          <span>FANUC G-CODE SEQUENCE_OUTPUT</span>
                          <span>3-AXIS MILL_LATHE</span>
                        </div>
                        <div className="bg-black border-2 border-zinc-900 p-4 h-36 font-mono text-xs sm:text-sm text-cyan-400 leading-relaxed overflow-y-auto whitespace-pre scrollbar-thin scrollbar-thumb-zinc-900">
                          {selectedProject.gcode}
                        </div>
                      </div>
                    </div>

                    {/* Right: Next-Gen 3D CAD/CAM Viewer with View Cube */}
                    <div className="space-y-4">
                      <div className="bg-black border-2 border-zinc-900 p-3 relative h-[320px] flex flex-col justify-between shadow-2xl">
                        <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-mono text-zinc-400 z-20 pointer-events-none font-bold">
                          <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
                          <span>3D CAD INTERACTIVE WIREFRAME RENDER</span>
                        </div>
                        
                        <CAD3DViewer project={selectedProject} />

                        <div className="text-xs font-mono text-zinc-500 flex justify-between px-2 pt-2 z-20 border-t border-zinc-900 pointer-events-none font-bold">
                          <span>PROJECTION: ISOMETRIC PERSPECTIVE</span>
                          <span>METRIC RATIO: 1:1 CNC</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="border-t border-zinc-850 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs">
                    <span className="text-zinc-500 font-bold">SOURCE BLUEPRINT: SolidWorks Model Native Database</span>
                    <button 
                      onClick={() => {
                        const textarea = document.createElement('textarea');
                        textarea.value = selectedProject.gcode;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        
                        pushLog(`COPIED G-CODE BLOCK FOR ${selectedProject.id}`);
                        triggerToast("CNC G-Code Block successfully copied.");
                      }}
                      className="w-full sm:w-auto px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 font-black border border-cyan-500/20 uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    >
                      <Clipboard className="h-4 w-4" />
                      <span>Copy NC Code Block</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {}
        {activeTab === 'career' && (
          <div className="space-y-8">
            <div className="bg-[#07090d] border-2 border-zinc-800 p-6 sm:p-8 shadow-md">
              
              <div className="mb-10">
                <span className="font-mono text-xs text-cyan-400 block uppercase tracking-widest font-black">// VERIFIED HISTORY PER THE ATTACHED RESUME</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-2 font-mono">Academic Background & Industrial Training Placements</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">Complete chronicled history of formal qualifications and actual industrial workshop operations.</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
                
                {/* Academic Qualifications Column */}
                <div className="space-y-8">
                  <h4 className="text-xs sm:text-sm font-mono text-cyan-400 font-black tracking-widest uppercase border-b-2 border-zinc-800 pb-3">
                    [1.0] FORMAL ENGINEERING QUALIFICATIONS
                  </h4>
                  <div className="space-y-6">
                    {USER_PROFILE.education.map((edu, idx) => (
                      <div key={idx} className="bg-[#030406] border-2 border-zinc-800 p-6 relative space-y-4 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start flex-wrap gap-3 border-b border-zinc-850 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">EDUCATIONAL INSTITUTION</span>
                            <span className="text-sm sm:text-base font-black text-white uppercase font-mono">{edu.institution}</span>
                          </div>
                          <span className="font-mono text-xs bg-zinc-800 px-3 py-1 text-cyan-400 border border-cyan-500/20 font-black whitespace-nowrap">{edu.period}</span>
                        </div>
                        <div className="space-y-3">
                          <span className="text-xs sm:text-sm font-mono text-zinc-300 block font-black uppercase">{edu.degree}</span>
                          <p className="text-sm text-zinc-400 font-medium leading-relaxed">{edu.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Placement Timeline Column */}
                <div className="space-y-8">
                  <h4 className="text-xs sm:text-sm font-mono text-cyan-400 font-black tracking-widest uppercase border-b-2 border-zinc-800 pb-3">
                    [2.0] COMPLIANT PRACTICAL PLACEMENTS
                  </h4>
                  <div className="space-y-6">
                    {USER_PROFILE.training.map((trn, idx) => (
                      <div key={idx} className="bg-[#030406] border-2 border-zinc-800 p-6 space-y-5 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start flex-wrap gap-3 border-b border-zinc-850 pb-4">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">MANUFACTURING PLANT / ACADEMY</span>
                            <span className="text-sm sm:text-base font-black text-white uppercase font-mono">{trn.company}</span>
                            <span className="block text-xs font-mono text-cyan-400 mt-1 uppercase font-black">// {trn.role}</span>
                          </div>
                          <div className="text-left xl:text-right font-mono text-xs">
                            <span className="text-white block font-black">{trn.period}</span>
                            <span className="text-zinc-500 uppercase font-bold">{trn.location}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block font-black">Applied Scope & Technical Responsibilities</span>
                          <ul className="space-y-2.5 pl-4 list-disc font-mono text-xs sm:text-sm text-zinc-300 font-bold leading-relaxed">
                            {trn.points.map((point, pIdx) => (
                              <li key={pIdx} className="hover:text-white transition-colors">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="bg-[#07090d] border-2 border-zinc-800 p-6 sm:p-8">
              
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
                
                {/* Dispatch Information Block */}
                <div className="xl:col-span-5 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs text-cyan-400 block uppercase tracking-widest font-black">// SECURE INDUSTRIAL COMMS RADAR</span>
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-2 font-mono">Initiate Project Dispatch</h3>
                      <p className="text-sm text-zinc-300 font-medium leading-relaxed mt-3">
                        Require specialized tooling designs, mechanical simulations, SolidWorks draft sheets, or PowerMill toolpath alignments? Package and transmit your requests straight to Ahmed's desk.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="bg-[#030406] border-2 border-zinc-850 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="text-zinc-500 font-bold">SECURE INBOX:</span>
                        <a href={`mailto:${USER_PROFILE.email}`} className="text-cyan-400 font-black hover:underline">{USER_PROFILE.email}</a>
                      </div>
                      <div className="bg-[#030406] border-2 border-zinc-850 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="text-zinc-500 font-bold">DIRECT HOTLINE:</span>
                        <a href="tel:+201158647813" className="text-white font-black hover:underline">{USER_PROFILE.phone}</a>
                      </div>
                      <div className="bg-[#030406] border-2 border-zinc-850 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="text-zinc-500 font-bold">WORKSTATION:</span>
                        <span className="text-zinc-300 uppercase font-black">Sharqia, Egypt</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-zinc-500 leading-relaxed border-t border-zinc-800 pt-5 font-bold">
                    *Sending a transmission generates structured headers matching standard ASME technical request parameters for rapid workspace review.
                  </div>
                </div>

                {/* Secure Input Terminal (Form) */}
                <div className="xl:col-span-7 bg-[#030406] border-2 border-zinc-800 p-6 sm:p-8 shadow-2xl">
                  <DispatcherContactForm pushLog={pushLog} email={USER_PROFILE.email} triggerToast={triggerToast} />
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Titanium Footer Panel */}
      <footer className="border-t-2 border-zinc-900 bg-[#010204] py-14 px-4 sm:px-6 mt-20 font-mono text-xs text-zinc-400 font-bold shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="block font-black text-white uppercase tracking-wider text-sm sm:text-base">{USER_PROFILE.name}</span>
            <span>Production Technology Student • Tool & Die Design & Manufacturing Specialist</span>
          </div>
          <div className="flex gap-4 flex-wrap justify-center text-[10px] sm:text-xs">
            <span>ASME Y14.5 COMPLIANT</span>
            <span>•</span>
            <span>SOLIDWORKS CERTIFICATION SETUP</span>
            <span>•</span>
            <span>POWERMILL CAM PRESETS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

function CAD3DViewer({ project }) {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.5, y: 0.6 }); // Initial isometric angles
  const toolpathPos = useRef(0); // Progress tracker for CNC laser tool

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight - 40;
    };
    resizeCanvas();

    const drawGridBg = () => {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 1;
      const spacing = 20;
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGridBg();

      // Mild passive rotation to maintain dynamic kinetic action
      if (!isDragging.current) {
        rotation.current.y += 0.0035;
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const focalLength = 320;

      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      // Projected Points calculations
      const projected = project.vertices.map(v => {
        const x = v[0];
        const y = v[1];
        const z = v[2];

        // Rotation X-Axis
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotation Y-Axis
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Scale & perspective drop
        const scale = focalLength / (focalLength + z2 + 90);
        const px = cx + x2 * scale * 2.8;
        const py = cy + y1 * scale * 2.8;

        return { x: px, y: py, z: z2 };
      });

      // Drawing Wireframe Edges with high visual contrast neon cyan
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.75)';
      ctx.lineWidth = 1.5;
      project.edges.forEach(edge => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Drawing node vertices as glowing points
      ctx.fillStyle = '#06b6d4';
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate active laser toolpath cycle matching PowerMill
      if (projected.length > 1) {
        toolpathPos.current = (toolpathPos.current + 0.004) % 1;
        const totalEdges = project.edges.length;
        const activeEdgeIndex = Math.floor(toolpathPos.current * totalEdges);
        const activeEdge = project.edges[activeEdgeIndex];
        
        if (activeEdge) {
          const p1 = projected[activeEdge[0]];
          const p2 = projected[activeEdge[1]];
          const edgeProgress = (toolpathPos.current * totalEdges) % 1;
          
          const toolX = p1.x + (p2.x - p1.x) * edgeProgress;
          const toolY = p1.y + (p2.y - p1.y) * edgeProgress;

          // Glowing tool ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(toolX, toolY, 6, 0, Math.PI * 2);
          ctx.stroke();

          // Spark Center core
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(toolX, toolY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag controllers to rotate CAD model
    const handleMouseDown = (e) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      rotation.current.y += deltaX * 0.008;
      rotation.current.x += deltaY * 0.008;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch support for portable mobile devices
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      rotation.current.y += deltaX * 0.012;
      rotation.current.x += deltaY * 0.012;

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [project]);

  // View Presets function triggers
  const applyViewPreset = (preset) => {
    if (preset === 'top') {
      rotation.current = { x: Math.PI / 2, y: 0 };
    } else if (preset === 'front') {
      rotation.current = { x: 0, y: 0 };
    } else if (preset === 'isometric') {
      rotation.current = { x: 0.5, y: 0.6 };
    } else if (preset === 'side') {
      rotation.current = { x: 0, y: Math.PI / 2 };
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      
      {/* View Cube Presets toolbar overlay */}
      <div className="absolute top-12 right-3 z-30 flex flex-col gap-1.5 bg-[#07090d]/90 border border-zinc-800 p-1.5 font-mono text-[9px] font-bold">
        <button onClick={() => applyViewPreset('isometric')} className="px-2 py-1 bg-zinc-800 text-cyan-400 hover:text-white transition-all uppercase">ISO</button>
        <button onClick={() => applyViewPreset('top')} className="px-2 py-1 bg-zinc-800 text-zinc-400 hover:text-white transition-all uppercase">TOP</button>
        <button onClick={() => applyViewPreset('front')} className="px-2 py-1 bg-zinc-800 text-zinc-400 hover:text-white transition-all uppercase">FRONT</button>
        <button onClick={() => applyViewPreset('side')} className="px-2 py-1 bg-zinc-800 text-zinc-400 hover:text-white transition-all uppercase">SIDE</button>
      </div>

      <canvas ref={canvasRef} className="w-full flex-grow cursor-grab active:cursor-grabbing block" />
    </div>
  );
}

function StampingSimulationWidget({ pushLog }) {
  const [stampProgress, setStampProgress] = useState(0); 
  const [stampedCount, setStampedCount] = useState(0);
  const [pressPressure, setPressPressure] = useState(0); 
  const [guideClearance, setGuideClearance] = useState(0.04); 
  const cycleTimerRef = useRef(null);

  const startStampSequence = () => {
    if (stampProgress !== 0) return;
    
    pushLog("CLUTCH ENGAGED: CRANKSHAFT ROTATING RAM SLIDE BASE DOWN.");
    setStampProgress(1);
    setPressPressure(35);

    cycleTimerRef.current = setTimeout(() => {
      setStampProgress(2);
      setPressPressure(165); 
      pushLog("STAMP IMPACT: BLANKING PENETRATION COMPLETE AT 165 kN.");
    }, 700);

    setTimeout(() => {
      setStampProgress(3);
      setPressPressure(20);
      pushLog("RETRACT CYCLE: STRIPPER PLATE SECURING SPRINGBACK FEED.");
    }, 1600);

    setTimeout(() => {
      setStampProgress(0);
      setPressPressure(0);
      setStampedCount(prev => prev + 1);
      pushLog(`CYCLE SECURED. METAL INDEX FEED ADVANCED TO POS_${(stampedCount + 1) * 20}mm.`);
    }, 2400);
  };

  useEffect(() => {
    return () => clearTimeout(cycleTimerRef.current);
  }, [stampedCount]);

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-4">
      
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono text-xs text-zinc-400 font-bold">
        <span>SIMULATOR: SHEET METAL BLANKING RAM</span>
        <span className="text-cyan-400">IMPACT METRICS: {pressPressure} kN</span>
      </div>

      <div className="flex-grow flex items-center justify-center bg-black p-4 border border-zinc-900 min-h-[240px] relative overflow-hidden shadow-inner">
        
        {/* Absolute telemetry readings */}
        <div className="absolute top-3 left-3 bg-[#07090d]/90 p-3 border border-zinc-800 font-mono text-xs space-y-1.5 text-zinc-300 font-bold z-20">
          <div>PIERCING MAT: Carbon Steel</div>
          <div>CYCLES IN SERVICE: {stampedCount} STROKES</div>
          <div className="flex items-center gap-2">
            <span>LOAD GAUGE:</span>
            <span className="inline-block h-2 w-16 bg-zinc-900 relative overflow-hidden">
              <span className="absolute top-0 left-0 h-full bg-cyan-400" style={{ width: `${(pressPressure/180)*100}%` }}></span>
            </span>
          </div>
        </div>

        {/* Dynamic Vector schematic of mechanical slide stamping */}
        <svg className="w-full max-w-[400px] h-48" viewBox="0 0 380 180">
          <g transform={`translate(0, ${stampProgress === 1 ? 25 : stampProgress === 2 ? 55 : stampProgress === 3 ? 15 : 0})`} className="transition-all duration-300 ease-in-out">
            {/* Slide Upper Shoe Ram */}
            <rect x="130" y="15" width="120" height="25" fill="#20242d" stroke="#06b6d4" strokeWidth="1.5" />
            <rect x="110" y="25" width="12" height="35" fill="#52525b" />
            <rect x="258" y="25" width="12" height="35" fill="#52525b" />
            <rect x="175" y="40" width="30" height="35" fill="#e4e4e7" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="190" y1="15" x2="190" y2="40" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          <g>
            {/* Sheet Metal Strip stock */}
            <rect x="30" y="92" width="320" height="6" fill="#71717a" rx="1" />
            {stampedCount > 0 && Array.from({ length: Math.min(stampedCount, 8) }).map((_, i) => (
              <circle key={i} cx={95 - (i * 20)} cy="95" r="5" fill="#000" />
            ))}
            {(stampProgress === 2 || stampProgress === 3) && (
              <circle cx="190" cy="95" r="5" fill="#000" />
            )}
          </g>

          <g>
            {/* Lower Die Matrix assembly bed */}
            <path d="M 30,98 L 175,98 L 175,145 L 30,145 Z" fill="#111317" stroke="#333" strokeWidth="1.5" />
            <path d="M 205,98 L 350,98 L 350,145 Z" fill="#111317" stroke="#333" strokeWidth="1.5" />
            <rect x="20" y="145" width="340" height="15" fill="#20242d" stroke="#111" strokeWidth="1.5" />
          </g>

          {/* Impact sparks flash overlay */}
          {stampProgress === 2 && (
            <g>
              <circle cx="190" cy="95" r="16" fill="rgba(6,182,212,0.35)" />
              <line x1="190" y1="95" x2="170" y2="80" stroke="#06b6d4" strokeWidth="2" />
              <line x1="190" y1="95" x2="210" y2="80" stroke="#06b6d4" strokeWidth="2" />
              <line x1="190" y1="95" x2="175" y2="110" stroke="#06b6d4" strokeWidth="2" />
              <line x1="190" y1="95" x2="205" y2="110" stroke="#06b6d4" strokeWidth="2" />
            </g>
          )}
        </svg>

      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-5 bg-[#07090d] p-4 border border-zinc-800">
        
        <div className="font-mono text-xs text-zinc-300 font-bold">
          <span>UPPER PUNCH GUIDE CLEARANCE COEF:</span>
          <div className="flex items-center gap-3 mt-1.5">
            <input 
              type="range" 
              min="0.01" 
              max="0.10" 
              step="0.01"
              value={guideClearance}
              onChange={(e) => {
                setGuideClearance(Number(e.target.value));
                pushLog(`ADJUSTED UPPER GUIDE CLEARANCE SETTING: ${e.target.value} mm`);
              }}
              className="accent-cyan-400 h-1.5 bg-zinc-900 cursor-ew-resize"
            />
            <span className="text-cyan-400 font-black">{guideClearance.toFixed(2)} mm</span>
          </div>
        </div>

        <div className="flex gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={() => {
              setStampedCount(0);
              pushLog("METAL STRIP INBOUND RESET.");
            }}
            className="flex-grow md:flex-grow-0 px-4 py-2.5 font-mono text-xs tracking-widest text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-900 transition-colors font-black uppercase"
          >
            RESET STOCK
          </button>
          
          <button
            onClick={startStampSequence}
            disabled={stampProgress !== 0}
            className={`flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-2.5 font-mono text-xs tracking-widest font-black uppercase transition-all ${
              stampProgress === 0 
                ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.35)]' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Play className="h-4 w-4 fill-current" />
            STAMP CYCLES
          </button>
        </div>

      </div>

    </div>
  );
}

function DieClearanceCalculatorWidget({ pushLog, triggerToast }) {
  const [thickness, setThickness] = useState(1.5); 
  const [perimeter, setPerimeter] = useState(120); 
  const [materialShear, setMaterialShear] = useState(340); 

  const materials = [
    { name: "Mild Steel (St37)", shear: 340, clearancePercent: 0.06 },
    { name: "Stainless Steel (304)", shear: 420, clearancePercent: 0.08 },
    { name: "D2 Tool Steel (Softened)", shear: 520, clearancePercent: 0.10 },
    { name: "Aluminum (1050)", shear: 120, clearancePercent: 0.05 }
  ];

  const calculatedForceKn = useMemo(() => {
    return (perimeter * thickness * materialShear) / 1000;
  }, [thickness, perimeter, materialShear]);

  const calculatedForceTons = useMemo(() => {
    return calculatedForceKn / 9.80665;
  }, [calculatedForceKn]);

  const recommendedClearance = useMemo(() => {
    const selectedMat = materials.find(m => m.shear === materialShear) || materials[0];
    return thickness * selectedMat.clearancePercent;
  }, [thickness, materialShear]);

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-6">
      
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono text-xs text-zinc-400 font-bold">
        <span>SHEET STAMP FORCE CLEARANCE EQUATION SOLVER</span>
        <span className="text-white">STATUS: CORE ONLINE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        
        <div className="space-y-6 font-mono text-xs sm:text-sm text-zinc-300 font-bold">
          
          <div className="space-y-2">
            <label className="block text-zinc-500">SELECT SHEET STOCK METAL SPECS:</label>
            <select
              onChange={(e) => {
                const val = Number(e.target.value);
                setMaterialShear(val);
                const mat = materials.find(m => m.shear === val);
                pushLog(`SELECTED WORKPIECE MATERIAL: ${mat?.name}`);
              }}
              className="w-full bg-[#0d1017] border-2 border-zinc-800 p-3 text-white outline-none"
            >
              {materials.map((m, i) => (
                <option key={i} value={m.shear}>{m.name} [Shear Strength: {m.shear} N/mm²]</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500">SHEET THICKNESS (t):</label>
              <span className="text-cyan-400 font-black">{thickness.toFixed(2)} mm</span>
            </div>
            <input 
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-zinc-900 h-1.5 cursor-ew-resize"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500">TOTAL CUT PROFILE PERIMETER (L):</label>
              <span className="text-cyan-400 font-black">{perimeter} mm</span>
            </div>
            <input 
              type="range"
              min="20"
              max="400"
              step="10"
              value={perimeter}
              onChange={(e) => setPerimeter(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-zinc-900 h-1.5 cursor-ew-resize"
            />
          </div>

        </div>

        <div className="bg-[#07090d] border-2 border-zinc-800 p-5 flex flex-col justify-between font-mono text-xs sm:text-sm text-zinc-300 font-bold space-y-6 shadow-inner">
          
          <div className="space-y-4">
            <span className="text-[10px] text-zinc-500 block uppercase border-b border-zinc-800 pb-2 font-black tracking-widest">OUTPUT RESULTS</span>
            
            <div className="flex justify-between items-center py-1">
              <span className="text-zinc-400">ESTIMATED COEF FORCE:</span>
              <span className="text-white font-black">{calculatedForceKn.toFixed(1)} kN</span>
            </div>

            <div className="flex justify-between items-center py-2.5 bg-[#030406] px-3 border-l-4 border-cyan-400">
              <span className="text-zinc-200">PRESS TONNAGE REQUIRED:</span>
              <span className="text-cyan-400 font-black text-base">{calculatedForceTons.toFixed(2)} TONS</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-zinc-400">SHEAR DIE CLEARANCE (Per Side):</span>
              <span className="text-white font-black">{recommendedClearance.toFixed(3)} mm</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#030406] p-3 border border-zinc-850 text-xs text-zinc-400 leading-relaxed font-bold">
            <Info className="h-5 w-5 text-cyan-400 shrink-0" />
            <p>Calculated clearance limits burr growth and prevents punching stresses from binding structural pillars together.</p>
          </div>

        </div>

      </div>

      <div className="border-t border-zinc-850 pt-4 flex justify-between items-center flex-wrap gap-2">
        <span className="text-xs font-mono text-zinc-500 font-bold">FORMULA: F = L * t * Shear / 1000</span>
        <button
          onClick={() => {
            pushLog(`LOGGED CALCULATIONS: ${calculatedForceTons.toFixed(1)} TONS COEF AT ${recommendedClearance.toFixed(3)}mm CLEARANCE.`);
            triggerToast("Clearance solutions written to telemetry.");
          }}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 font-mono text-xs uppercase border border-cyan-500/20 transition-all font-black"
        >
          LOG SOLVED CALC
        </button>
      </div>

    </div>
  );
}

function FeedsAndSpeedsWidget({ pushLog, triggerToast }) {
  const [cutterDiameter, setCutterDiameter] = useState(12); 
  const [cuttingSpeed, setCuttingSpeed] = useState(130); 
  const [flutes, setFlutes] = useState(4); 
  const [feedPerTooth, setFeedPerTooth] = useState(0.06); 

  const spindleRpm = useMemo(() => {
    return Math.round((cuttingSpeed * 1000) / (Math.PI * cutterDiameter));
  }, [cutterDiameter, cuttingSpeed]);

  const feedRate = useMemo(() => {
    return Math.round(spindleRpm * flutes * feedPerTooth);
  }, [spindleRpm, flutes, feedPerTooth]);

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-6">
      
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono text-xs text-zinc-400 font-bold">
        <span>CNC FEEDRATE & MILL SPEED MATH SOLVER</span>
        <span className="text-white">STATUS: MILL ENGINE ONLINE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        
        <div className="space-y-6 font-mono text-xs sm:text-sm text-zinc-300 font-bold">
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500">MILL CUTTER DIAMETER (Ø):</label>
              <span className="text-cyan-400 font-black">{cutterDiameter} mm</span>
            </div>
            <input 
              type="range"
              min="2"
              max="50"
              value={cutterDiameter}
              onChange={(e) => setCutterDiameter(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-zinc-900 h-1.5 cursor-ew-resize"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500">CUTTING VELOCITY SPEED (Vc):</label>
              <span className="text-cyan-400 font-black">{cuttingSpeed} m/min</span>
            </div>
            <input 
              type="range"
              min="10"
              max="250"
              value={cuttingSpeed}
              onChange={(e) => setCuttingSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-zinc-900 h-1.5 cursor-ew-resize"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-zinc-500 text-xs font-black uppercase">FLUTES QUANTITY (Z):</label>
              <input 
                type="number"
                value={flutes}
                onChange={(e) => setFlutes(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#0d1017] border-2 border-zinc-800 p-2 text-white text-center text-sm outline-none font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-zinc-500 text-xs font-black uppercase">FEED PER TOOTH (Fz):</label>
              <input 
                type="number"
                step="0.01"
                value={feedPerTooth}
                onChange={(e) => setFeedPerTooth(Math.max(0.001, Number(e.target.value)))}
                className="w-full bg-[#0d1017] border-2 border-zinc-800 p-2 text-white text-center text-sm outline-none font-bold"
              />
            </div>
          </div>

        </div>

        <div className="bg-[#07090d] border-2 border-zinc-800 p-5 flex flex-col justify-between font-mono text-xs sm:text-sm text-zinc-300 font-bold space-y-6 shadow-inner">
          
          <div className="space-y-4">
            <span className="text-[10px] text-zinc-500 block uppercase border-b border-zinc-800 pb-2 font-black tracking-widest">CNC SOLVER RATES</span>

            <div className="flex justify-between items-center py-2.5 bg-[#030406] px-3 border-l-4 border-cyan-400">
              <span className="text-zinc-200">CALCULATED SPINDLE SPEED:</span>
              <span className="text-cyan-400 font-black text-base">{spindleRpm} RPM</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-zinc-400">CALCULATED FEED RATE (Vf):</span>
              <span className="text-white font-black">{feedRate} mm/min</span>
            </div>

            <div className="flex justify-between items-center py-1 text-xs">
              <span className="text-zinc-500">CHIP LOAD RATIO RATINGS:</span>
              <span className="text-zinc-400 font-black">{(flutes * feedPerTooth).toFixed(2)} mm/revolution</span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed font-bold">
            *Generated solutions align with standard high-performance toolpaths coded for 3-axis mills in Autodesk PowerMill.
          </p>

        </div>

      </div>

      <div className="border-t border-zinc-850 pt-4 flex justify-between items-center flex-wrap gap-2">
        <span className="text-xs font-mono text-zinc-500 font-bold">FORMULA: RPM = (Vc * 1000) / (π * D)</span>
        <button
          onClick={() => {
            pushLog(`SAVED MILL PARAMS: ${spindleRpm} RPM AT FEED OF ${feedRate} mm/min.`);
            triggerToast("CAM mill variables exported to terminal.");
          }}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 font-mono text-xs uppercase border border-cyan-500/20 transition-all font-black"
        >
          EXPORT CODE VALUES
        </button>
      </div>

    </div>
  );
}

function DispatcherContactForm({ pushLog, email, triggerToast }) {
  const [formData, setFormData] = useState({
    clientName: "",
    org: "",
    message: "",
    toleranceTarget: "medium"
  });

  const sendDispatch = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.message) {
      pushLog("DISPATCH OVERRUN ERROR: MISSING PARAMS IN INBOUND FIELD");
      return;
    }

    pushLog(`TRANSMITTING COMMUNICATIONS PROTOCOL DIRECTLY TO MAIL: ${email}`);

    const subject = encodeURIComponent(`CAD/CAM Manufacturing Request - Class ${formData.toleranceTarget.toUpperCase()}`);
    const emailBody = encodeURIComponent(
      `Hello Ahmed Kamel,\n\n` +
      `We reviewed your high-precision engineering portfolio archive.\n\n` +
      `Sender Name: ${formData.clientName}\n` +
      `Facility/Company: ${formData.org || "N/A"}\n` +
      `Required Tolerancing Class: ${formData.toleranceTarget.toUpperCase()}\n\n` +
      `Detailed Project Specifications & Requirements:\n` +
      `${formData.message}\n\n` +
      `Sincerely,\n` +
      `${formData.clientName}`
    );

    // Automated trigger mailto link opening
    window.location.href = `mailto:${email}?subject=${subject}&body=${emailBody}`;
    triggerToast("Email transmission template loaded directly!");
  };

  return (
    <form onSubmit={sendDispatch} className="space-y-6 font-mono text-xs sm:text-sm text-zinc-300 font-bold">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-zinc-400 uppercase font-black">1.0 CLIENT NAME / IDENTITY</label>
          <input 
            type="text" 
            placeholder="e.g. Lead Project Planner"
            value={formData.clientName}
            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            className="w-full bg-[#0d1017] border-2 border-zinc-800 p-3 text-white focus:border-cyan-500/50 outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-zinc-400 uppercase font-black">2.0 FACILITY / COMPANY</label>
          <input 
            type="text" 
            placeholder="e.g. ELARABY Molds Assembly Division"
            value={formData.org}
            onChange={(e) => setFormData({...formData, org: e.target.value})}
            className="w-full bg-[#0d1017] border-2 border-zinc-800 p-3 text-white focus:border-cyan-500/50 outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-zinc-400 uppercase font-black">3.0 TARGET BLUEPRINT ISO TOLERANCE CLASS</label>
        <select
          value={formData.toleranceTarget}
          onChange={(e) => setFormData({...formData, toleranceTarget: e.target.value})}
          className="w-full bg-[#0d1017] border-2 border-zinc-800 p-3 text-white focus:border-cyan-500/50 outline-none"
        >
          <option value="fine">Fine Structural limits (ISO 2768-f) [±0.05 mm limits]</option>
          <option value="medium">Standard industrial limits (ISO 2768-m) [±0.10 mm limits]</option>
          <option value="coarse">Coarse stamping limits (ISO 2768-c) [±0.20 mm limits]</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-zinc-400 uppercase font-black">4.0 TECHNICAL SCOPE & DRAWING REQUIREMENTS</label>
        <textarea 
          rows={4}
          placeholder="Describe structural layout, sheet metals thickness constraints (e.g. 1.8mm Carbon Steel stock), and requested processes (EDM drilling, conventional lathe work, milling, die alignment)..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full bg-[#0d1017] border-2 border-zinc-800 p-3 text-white focus:border-cyan-500/50 outline-none font-sans font-medium"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs sm:text-sm"
      >
        DISPATCH OUTBOUND SIGNAL TO MAIL SYSTEM
      </button>

    </form>
  );
}