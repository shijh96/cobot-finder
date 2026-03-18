-- ============================================================
-- Seed data: 10 collaborative robots
-- Sources:
--   Universal Robots: https://www.universal-robots.com
--   Fanuc CRX series: https://www.fanucamerica.com/products/robots/collaborative-robots
-- Prices are approximate US market list prices (2024).
-- ============================================================

INSERT INTO cobots (
  brand, model, slug, brand_slug,
  payload_kg, reach_mm, repeatability_mm, max_speed_deg_s,
  dof, weight_kg,
  price_min, price_max, price_currency,
  applications, programming_methods,
  ip_rating, certifications,
  description, pros, cons,
  official_url, meta_title, meta_description
) VALUES

-- ============================================================
-- Universal Robots UR3e
-- ============================================================
(
  'Universal Robots', 'UR3e',
  'universal-robots-ur3e', 'universal-robots',
  3.0, 500, 0.03, NULL,
  6, 11.2,
  25000, 30000, 'USD',
  ARRAY['assembly','pick_and_place','lab_automation','screwdriving'],
  ARRAY['hand_guiding','urscript','visual_programming'],
  'IP54',
  ARRAY['CE','UL','RCM','KC'],
  'The UR3e is Universal Robots'' lightest and most compact cobot, purpose-built for light assembly, screwdriving, and lab automation tasks where bench-top footprint matters. Its 360-degree infinite rotation on all wrist joints makes it uniquely suited for repetitive tightening and dispensing applications. At 11.2 kg, it can be relocated by a single technician without tools.',
  ARRAY[
    'Smallest footprint in the UR e-Series lineup — fits on any workbench',
    'True 360-degree wrist rotation eliminates cable wrap issues in screwdriving',
    'Fastest deployment in class: average 1–2 days from unboxing to production',
    'Polyscope graphical interface requires no prior programming experience'
  ],
  ARRAY[
    '3 kg payload limits use to very light workpieces only',
    '500 mm reach is insufficient for tasks spanning more than arm''s length'
  ],
  'https://www.universal-robots.com/products/ur3-robot/',
  'UR3e Collaborative Robot | 3kg Payload, 500mm Reach | Universal Robots',
  'The UR3e is a lightweight 3kg collaborative robot with 500mm reach, ideal for bench-top assembly, lab automation, and screwdriving. Compare specs, pricing, and distributors.'
),

-- ============================================================
-- Universal Robots UR5e
-- ============================================================
(
  'Universal Robots', 'UR5e',
  'universal-robots-ur5e', 'universal-robots',
  5.0, 850, 0.03, NULL,
  6, 20.6,
  28000, 35000, 'USD',
  ARRAY['assembly','machine_tending','pick_and_place','packaging','quality_inspection'],
  ARRAY['hand_guiding','urscript','visual_programming'],
  'IP54',
  ARRAY['CE','UL','RCM','KC','ANSI/RIA'],
  'The UR5e is the most popular cobot in the world, striking a balance between payload capacity and footprint that suits the majority of light manufacturing tasks. With an 850 mm reach and 5 kg payload, it handles everything from machine tending to packaging lines. Force/torque sensing is built into every joint, enabling sensitive assembly tasks without external sensors.',
  ARRAY[
    'Industry''s broadest ecosystem: 300+ certified UR+ plug-and-play accessories',
    'Built-in force/torque sensing in all six joints — no additional sensor hardware',
    'IP54 rated for light dust and splash in typical shop floor environments',
    'Polyscope 5 offers drag-to-teach waypoints with sub-minute task setup'
  ],
  ARRAY[
    '5 kg payload excludes heavier grippers and heavy-duty end-of-arm tooling',
    'TCP speed capped at 1 m/s — not ideal for high-throughput pick-and-place'
  ],
  'https://www.universal-robots.com/products/ur5-robot/',
  'UR5e Collaborative Robot | 5kg Payload, 850mm Reach | Universal Robots',
  'The UR5e is the world''s best-selling cobot with 5kg payload and 850mm reach. Perfect for assembly, machine tending, and packaging. Compare pricing, specs, and local distributors.'
),

-- ============================================================
-- Universal Robots UR10e
-- ============================================================
(
  'Universal Robots', 'UR10e',
  'universal-robots-ur10e', 'universal-robots',
  12.5, 1300, 0.05, NULL,
  6, 33.5,
  35000, 45000, 'USD',
  ARRAY['welding','palletizing','assembly','machine_tending','material_handling'],
  ARRAY['hand_guiding','urscript','visual_programming'],
  'IP54',
  ARRAY['CE','UL','RCM','KC','ANSI/RIA'],
  'The UR10e extends Universal Robots'' e-Series to heavier payloads and longer reach, making it the go-to choice for end-of-line palletizing, welding, and large-part assembly. Its 1,300 mm reach covers a work envelope comparable to a human arm, while the 12.5 kg payload accommodates most welding torches, heavy grippers, and camera systems simultaneously. It retains the same Polyscope interface as the smaller UR models.',
  ARRAY[
    '1,300 mm reach covers pallet-sized work areas without repositioning',
    '12.5 kg payload comfortably handles welding torches plus wire feeder',
    'Same Polyscope software as UR3e/UR5e — operators transfer skills across models',
    'MiR and other AMR integration certified for fully autonomous material transport'
  ],
  ARRAY[
    'Heavier arm (33.5 kg) requires two people or a lifting aid to reposition',
    'Repeatability degrades to ±0.05 mm — may not suit ultra-precision assembly'
  ],
  'https://www.universal-robots.com/products/ur10-robot/',
  'UR10e Collaborative Robot | 12.5kg Payload, 1300mm Reach | Universal Robots',
  'The UR10e offers 12.5kg payload and 1300mm reach for welding, palletizing, and large-part assembly. Compare pricing, specs, and find certified distributors near you.'
),

-- ============================================================
-- Universal Robots UR16e
-- ============================================================
(
  'Universal Robots', 'UR16e',
  'universal-robots-ur16e', 'universal-robots',
  16.0, 900, 0.05, NULL,
  6, 33.1,
  38000, 48000, 'USD',
  ARRAY['palletizing','machine_tending','heavy_assembly','material_handling'],
  ARRAY['hand_guiding','urscript','visual_programming'],
  'IP54',
  ARRAY['CE','UL','RCM','KC'],
  'The UR16e was engineered specifically for heavy machine tending and palletizing where a short, stiff arm needs to handle heavier CNC parts and injection-molded components. Its 16 kg payload in a compact 900 mm reach makes it the highest payload-to-reach ratio in the UR lineup, ideal for loading and unloading heavy fixtures within a confined cell. At 33.1 kg, it shares its body weight class with the UR10e for easy cell comparisons.',
  ARRAY[
    'Highest payload-to-reach ratio in the UR e-Series — maximizes force at short distances',
    'Ideal for heavy CNC machine tending without exceeding a compact cell footprint',
    'Same 33 kg arm weight as UR10e simplifies table and fixture reuse',
    'Certified for direct human collaboration without safety fencing'
  ],
  ARRAY[
    '900 mm reach is limiting for tasks that span wider work areas',
    'Higher base price than UR10e for a shorter reach'
  ],
  'https://www.universal-robots.com/products/ur16-robot/',
  'UR16e Collaborative Robot | 16kg Payload, 900mm Reach | Universal Robots',
  'The UR16e delivers 16kg payload in a compact 900mm reach — ideal for heavy machine tending and palletizing. Find specs, pricing, and local distributors.'
),

-- ============================================================
-- Universal Robots UR20
-- ============================================================
(
  'Universal Robots', 'UR20',
  'universal-robots-ur20', 'universal-robots',
  20.0, 1750, 0.05, NULL,
  6, 64.0,
  45000, 55000, 'USD',
  ARRAY['palletizing','welding','machine_tending','material_handling'],
  ARRAY['hand_guiding','urscript','visual_programming'],
  'IP54',
  ARRAY['CE','UL'],
  'The UR20 is Universal Robots'' answer to heavy palletizing and long-reach welding, offering the longest reach in the e-Series at 1,750 mm with a 20 kg payload. It was designed from the ground up for floor-level pallet building — reaching down to floor-height pallets without a riser while maintaining the safety and ease-of-use that define the UR product line. Its high-speed joints deliver up to 50% faster cycle times compared to the UR10e on comparable palletizing tasks.',
  ARRAY[
    '1,750 mm reach is the longest in the UR lineup — covers full EUR/US pallet without a riser',
    'Up to 50% faster cycle time versus UR10e on palletizing benchmarks',
    '20 kg payload handles heavy boxes and two-up gripper configurations simultaneously',
    'PolyScope X interface provides offline simulation and automatic collision detection'
  ],
  ARRAY[
    '64 kg arm weight requires a forklift or overhead crane for repositioning',
    'Larger footprint requires more floor space around the cell'
  ],
  'https://www.universal-robots.com/products/ur20-robot/',
  'UR20 Collaborative Robot | 20kg Payload, 1750mm Reach | Universal Robots',
  'The UR20 delivers 20kg payload and 1750mm reach for high-speed palletizing and long-reach welding. Compare specs, pricing, and request quotes from local distributors.'
),

-- ============================================================
-- Universal Robots UR30
-- ============================================================
(
  'Universal Robots', 'UR30',
  'universal-robots-ur30', 'universal-robots',
  30.0, 1300, 0.05, NULL,
  6, 63.5,
  52000, 62000, 'USD',
  ARRAY['palletizing','heavy_assembly','machine_tending','material_handling'],
  ARRAY['hand_guiding','urscript','visual_programming'],
  'IP54',
  ARRAY['CE','UL'],
  'The UR30 is Universal Robots'' highest-payload cobot, carrying up to 30 kg at a 1,300 mm reach — a specification that competes directly with traditional industrial robots on palletizing and heavy sub-assembly tasks, while retaining cobot safety certification. It is designed for applications that previously required dedicated safety fencing, such as handling automotive stampings, heavy castings, or multiple products simultaneously with a multi-pick gripper.',
  ARRAY[
    'Highest payload in the UR lineup at 30 kg — handles automotive and heavy manufacturing loads',
    'Cobot-certified despite 30 kg payload: no hard fencing required after risk assessment',
    'Same PolyScope X interface as UR20 — single training investment across both platforms',
    'Multi-pick gripper configurations significantly improve palletizing throughput'
  ],
  ARRAY[
    'Premium pricing reflects the heavy-payload capability',
    '63.5 kg robot weight means repositioning requires mechanical assistance'
  ],
  'https://www.universal-robots.com/products/ur30-robot/',
  'UR30 Collaborative Robot | 30kg Payload, 1300mm Reach | Universal Robots',
  'The UR30 is Universal Robots'' most powerful cobot with 30kg payload and 1300mm reach. Built for heavy palletizing and assembly without safety fencing. Get specs and quotes.'
),

-- ============================================================
-- Fanuc CRX-5iA
-- ============================================================
(
  'Fanuc', 'CRX-5iA',
  'fanuc-crx-5ia', 'fanuc',
  5.0, 994, 0.04, NULL,
  6, 40.0,
  25000, 35000, 'USD',
  ARRAY['assembly','pick_and_place','quality_inspection','screwdriving'],
  ARRAY['hand_guiding','tablet_visual','fanuc_teach_pendant'],
  'IP67',
  ARRAY['CE','UL','RCM'],
  'The Fanuc CRX-5iA is the entry point to Fanuc''s CRX collaborative robot series, combining an industry-leading IP67 dust and water ingress rating with a 5 kg payload and 994 mm reach. It is the first Fanuc cobot designed explicitly for easy hand-guidance teaching using a tablet interface, making it accessible to operators without robot programming experience. The green glowing skin provides intuitive visual safety feedback during collaborative operation.',
  ARRAY[
    'IP67 rated — fully protected against dust and temporary water immersion, suitable for wash-down areas',
    'Tablet-based drag-to-teach interface requires zero programming knowledge',
    'Powered by Fanuc CNC control — integrates natively with Fanuc machine tools',
    'Distinctive green skin with integrated force feedback provides visible safety state'
  ],
  ARRAY[
    '40 kg arm weight is heavy for a 5 kg payload class — repositioning is cumbersome',
    'Tablet interface is intuitive but limits advanced script-level customization'
  ],
  'https://www.fanucamerica.com/products/robots/collaborative-robots/crx-5ia',
  'Fanuc CRX-5iA Collaborative Robot | 5kg Payload, 994mm Reach | IP67',
  'The Fanuc CRX-5iA offers 5kg payload, 994mm reach, and IP67 protection — ideal for assembly and inspection in demanding environments. Compare specs, pricing, and find distributors.'
),

-- ============================================================
-- Fanuc CRX-10iA
-- ============================================================
(
  'Fanuc', 'CRX-10iA',
  'fanuc-crx-10ia', 'fanuc',
  10.0, 1249, 0.04, NULL,
  6, 40.0,
  30000, 40000, 'USD',
  ARRAY['machine_tending','assembly','packaging','quality_inspection'],
  ARRAY['hand_guiding','tablet_visual','fanuc_teach_pendant'],
  'IP67',
  ARRAY['CE','UL','RCM'],
  'The Fanuc CRX-10iA doubles the payload of the entry-level CRX-5iA while maintaining the same compact 40 kg arm weight, making it unusually versatile for machine tending and assembly tasks that involve heavier workpieces or end-of-arm tooling. Its 1,249 mm reach suits most standard CNC machine-tending cells. Like all CRX models, it shares the Fanuc R-30iB Mini Plus controller used across Fanuc''s industrial robot lineup, simplifying facility-wide maintenance.',
  ARRAY[
    '10 kg payload at only 40 kg arm weight — best payload-to-arm-weight ratio in the CRX line',
    'IP67 protection enables deployment in coolant-spray and light wash-down environments',
    'Shares R-30iB Mini Plus controller with industrial Fanuc robots — unified maintenance fleet',
    'Hand-guiding teaching with collision detection stops movement before damage occurs'
  ],
  ARRAY[
    'Tablet UI learning curve steeper for users coming from PLC/ladder-logic backgrounds',
    'Pricing is higher than UR5e for comparable payload without equivalent ecosystem size'
  ],
  'https://www.fanucamerica.com/products/robots/collaborative-robots/crx-10ia',
  'Fanuc CRX-10iA Collaborative Robot | 10kg Payload, 1249mm Reach | IP67',
  'The Fanuc CRX-10iA provides 10kg payload and 1249mm reach with IP67 protection for machine tending and packaging. Get detailed specs, pricing, and compare with competitors.'
),

-- ============================================================
-- Fanuc CRX-10iA/L
-- ============================================================
(
  'Fanuc', 'CRX-10iA/L',
  'fanuc-crx-10ia-l', 'fanuc',
  10.0, 1418, 0.05, NULL,
  6, 46.0,
  32000, 42000, 'USD',
  ARRAY['machine_tending','palletizing','welding','material_handling'],
  ARRAY['hand_guiding','tablet_visual','fanuc_teach_pendant'],
  'IP67',
  ARRAY['CE','UL','RCM'],
  'The Fanuc CRX-10iA/L is the long-reach variant of the CRX-10iA, extending the arm to 1,418 mm to cover broader work envelopes in palletizing and welding cells. The additional 169 mm of reach compared to its sibling comes at a modest 6 kg weight penalty. Its IP67 rating makes it one of the few cobots certified for arc welding environments where weld spatter and coolant exposure are routine.',
  ARRAY[
    '1,418 mm reach — longest in the CRX 10 kg class, covers standard pallet heights from floor mount',
    'IP67 rating provides genuine protection in arc welding and coolant-heavy environments',
    'Certified for Fanuc ARC Mate arc welding integration via native controller support',
    'Longer reach reduces need for repositioning during large-part inspection paths'
  ],
  ARRAY[
    '±0.05 mm repeatability is slightly lower than the standard CRX-10iA at ±0.04 mm',
    '46 kg arm weight requires two operators to safely reposition without a hoist'
  ],
  'https://www.fanucamerica.com/products/robots/collaborative-robots/crx-10ia-l',
  'Fanuc CRX-10iA/L Collaborative Robot | 10kg Payload, 1418mm Long Reach',
  'The Fanuc CRX-10iA/L extends reach to 1418mm with 10kg payload and IP67 protection — ideal for welding, palletizing, and large-envelope machine tending. Get specs and pricing.'
),

-- ============================================================
-- Fanuc CRX-25iA
-- ============================================================
(
  'Fanuc', 'CRX-25iA',
  'fanuc-crx-25ia', 'fanuc',
  25.0, 1889, 0.04, NULL,
  6, 67.0,
  45000, 55000, 'USD',
  ARRAY['palletizing','heavy_assembly','machine_tending','material_handling'],
  ARRAY['hand_guiding','tablet_visual','fanuc_teach_pendant'],
  'IP67',
  ARRAY['CE','UL'],
  'The Fanuc CRX-25iA is the flagship of the CRX collaborative series, combining a 25 kg payload with a 1,889 mm reach that spans a work envelope approaching traditional industrial robots. It was designed for high-mix heavy palletizing applications where a single cobot must cover full pallet height without a riser. The IP67 rating and Fanuc''s decades of industrial robot durability make it suitable for demanding foundry, automotive stamping, and logistics environments.',
  ARRAY[
    'Longest reach in the CRX series at 1,889 mm — covers full EUR/US pallet stacking height',
    '25 kg payload handles multi-product grippers and heavy casting extraction simultaneously',
    'IP67 rated for foundry, automotive, and wash-down environments',
    'Direct compatibility with Fanuc R-J3iC/R-30iB industrial robot programs — easy migration'
  ],
  ARRAY[
    '67 kg arm weight requires overhead crane or forklift to reposition — limits flexibility',
    'Premium price point competes with entry-level industrial robots on cost-per-cycle'
  ],
  'https://www.fanucamerica.com/products/robots/collaborative-robots/crx-25ia',
  'Fanuc CRX-25iA Collaborative Robot | 25kg Payload, 1889mm Reach | IP67',
  'The Fanuc CRX-25iA delivers 25kg payload and 1889mm reach with IP67 protection for heavy palletizing and assembly. Compare specs, request pricing, and find local distributors.'
);
