import { TacticFormation } from '../types';

export const TACTICAL_FORMATIONS: TacticFormation[] = [
  {
    name: '3-2-4-1 Box Midfield',
    system: '3-2-4-1',
    philosophy: 'Positional Supremacy & Central Overload',
    keyFeature: 'Inverted full-back steps into double-pivot, establishing a central 4-man box to suffocate transitions and dictate tempo.',
    positions: [
      { role: 'GK', name: 'Sweeper Keeper', x: 50, y: 88 },
      { role: 'RCB', name: 'Wide Stopper', x: 78, y: 72 },
      { role: 'CB', name: 'Central Anchor', x: 50, y: 74 },
      { role: 'LCB', name: 'Ball-Playing CB', x: 22, y: 72 },
      { role: 'RDM', name: 'Deep Playmaker', x: 62, y: 56 },
      { role: 'LDM', name: 'Inverted Invert', x: 38, y: 56 },
      { role: 'RW', name: 'Touchline Winger', x: 88, y: 34 },
      { role: 'RAM', name: 'Half-Space #10', x: 64, y: 32 },
      { role: 'LAM', name: 'Free Eight #8', x: 36, y: 32 },
      { role: 'LW', name: 'Touchline Winger', x: 12, y: 34 },
      { role: 'CF', name: 'Complete Striker', x: 50, y: 16 }
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        shortLabel: 'Base Shape',
        phaseName: 'Phase 1: Deep Build-Up & 3-2 Rest Structure',
        annotation: 'The back three spreads wide while the goalkeeper steps up to form a numerical +1 build-up superiority against a two-man opposition press.',
        highlightZone: 'central-box',
        activeRoles: ['CB', 'LCB', 'RCB', 'LDM', 'RDM'],
        lanes: [
          { fromRole: 'GK', toRole: 'CB', type: 'primary' },
          { fromRole: 'CB', toRole: 'LCB', type: 'primary' },
          { fromRole: 'CB', toRole: 'RCB', type: 'primary' },
          { fromRole: 'LCB', toRole: 'LDM', type: 'primary' }
        ],
        positions: [
          { role: 'GK', name: 'Sweeper Keeper', x: 50, y: 88 },
          { role: 'RCB', name: 'Wide Stopper', x: 80, y: 74 },
          { role: 'CB', name: 'Central Anchor', x: 50, y: 76 },
          { role: 'LCB', name: 'Ball-Playing CB', x: 20, y: 74 },
          { role: 'RDM', name: 'Deep Playmaker', x: 60, y: 58 },
          { role: 'LDM', name: 'Inverted Invert', x: 40, y: 58 },
          { role: 'RW', name: 'Touchline Winger', x: 88, y: 36 },
          { role: 'RAM', name: 'Half-Space #10', x: 64, y: 34 },
          { role: 'LAM', name: 'Free Eight #8', x: 36, y: 34 },
          { role: 'LW', name: 'Touchline Winger', x: 12, y: 36 },
          { role: 'CF', name: 'Complete Striker', x: 50, y: 18 }
        ]
      },
      {
        stepNumber: 2,
        shortLabel: 'Invert & Shift',
        phaseName: 'Phase 2: Inverted Pivot Step & Staggered Lines',
        annotation: 'The left inverted fullback (LDM) steps diagonally forward into the second line, attracting the opposition right-winger and opening vertical lanes.',
        highlightZone: 'central-box',
        activeRoles: ['LDM', 'LCB', 'LAM'],
        lanes: [
          { fromRole: 'LCB', toRole: 'LDM', type: 'primary', animated: true },
          { fromRole: 'LDM', toRole: 'RDM', type: 'secondary' },
          { fromRole: 'LDM', toRole: 'LAM', type: 'through', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Sweeper Keeper', x: 50, y: 86 },
          { role: 'RCB', name: 'Wide Stopper', x: 78, y: 70 },
          { role: 'CB', name: 'Central Anchor', x: 50, y: 72 },
          { role: 'LCB', name: 'Ball-Playing CB', x: 24, y: 68 },
          { role: 'RDM', name: 'Deep Playmaker', x: 62, y: 54 },
          { role: 'LDM', name: 'Inverted Invert', x: 38, y: 50 },
          { role: 'RW', name: 'Touchline Winger', x: 90, y: 32 },
          { role: 'RAM', name: 'Half-Space #10', x: 66, y: 30 },
          { role: 'LAM', name: 'Free Eight #8', x: 34, y: 28 },
          { role: 'LW', name: 'Touchline Winger', x: 10, y: 32 },
          { role: 'CF', name: 'Complete Striker', x: 50, y: 16 }
        ]
      },
      {
        stepNumber: 3,
        shortLabel: 'Box Overload',
        phaseName: 'Phase 3: Central Box Overload in Zone 14',
        annotation: 'The 4-man central polygon (LDM, RDM, LAM, RAM) creates a 4v2 superiority in the midfield block, forcing opposition central defenders to step out of line.',
        highlightZone: 'central-box',
        activeRoles: ['LDM', 'RDM', 'LAM', 'RAM'],
        lanes: [
          { fromRole: 'LDM', toRole: 'LAM', type: 'through', animated: true },
          { fromRole: 'LAM', toRole: 'RAM', type: 'secondary' },
          { fromRole: 'RDM', toRole: 'RAM', type: 'primary' },
          { fromRole: 'RAM', toRole: 'RW', type: 'switch', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Sweeper Keeper', x: 50, y: 84 },
          { role: 'RCB', name: 'Wide Stopper', x: 76, y: 66 },
          { role: 'CB', name: 'Central Anchor', x: 50, y: 68 },
          { role: 'LCB', name: 'Ball-Playing CB', x: 26, y: 64 },
          { role: 'RDM', name: 'Deep Playmaker', x: 58, y: 50 },
          { role: 'LDM', name: 'Inverted Invert', x: 42, y: 46 },
          { role: 'RW', name: 'Touchline Winger', x: 92, y: 28 },
          { role: 'RAM', name: 'Half-Space #10', x: 65, y: 26 },
          { role: 'LAM', name: 'Free Eight #8', x: 35, y: 24 },
          { role: 'LW', name: 'Touchline Winger', x: 8, y: 30 },
          { role: 'CF', name: 'Complete Striker', x: 50, y: 14 }
        ]
      },
      {
        stepNumber: 4,
        shortLabel: 'Channel Isolation',
        phaseName: 'Phase 4: Half-Space Underlap & Wide 1v1 Isolation',
        annotation: 'Rapid horizontal circulation to RAM draws the left-back inside. RW stays chalk-on-boots to isolate the defender in a 1v1 corridor with space behind.',
        highlightZone: 'half-space-right',
        activeRoles: ['RAM', 'RW', 'CF'],
        lanes: [
          { fromRole: 'RAM', toRole: 'RW', type: 'primary', animated: true },
          { fromRole: 'RAM', toRole: 'CF', type: 'through' },
          { fromRole: 'RW', toRole: 'RAM', type: 'secondary', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Sweeper Keeper', x: 50, y: 82 },
          { role: 'RCB', name: 'Wide Stopper', x: 74, y: 62 },
          { role: 'CB', name: 'Central Anchor', x: 50, y: 64 },
          { role: 'LCB', name: 'Ball-Playing CB', x: 28, y: 62 },
          { role: 'RDM', name: 'Deep Playmaker', x: 62, y: 46 },
          { role: 'LDM', name: 'Inverted Invert', x: 40, y: 44 },
          { role: 'RW', name: 'Touchline Winger', x: 88, y: 20 },
          { role: 'RAM', name: 'Half-Space #10', x: 70, y: 18 },
          { role: 'LAM', name: 'Free Eight #8', x: 38, y: 22 },
          { role: 'LW', name: 'Touchline Winger', x: 12, y: 26 },
          { role: 'CF', name: 'Complete Striker', x: 48, y: 12 }
        ]
      },
      {
        stepNumber: 5,
        shortLabel: 'Penetration & Finish',
        phaseName: 'Phase 5: Cutback Corridor & Multi-Wave Box Arrival',
        annotation: 'RW slips the underlapping RAM into the penalty channel for a low cutback. CF attacks near post while opposite winger (LW) crashes far post.',
        highlightZone: 'penalty-box',
        activeRoles: ['RAM', 'CF', 'LW', 'LAM'],
        lanes: [
          { fromRole: 'RW', toRole: 'RAM', type: 'through', animated: true },
          { fromRole: 'RAM', toRole: 'CF', type: 'primary', animated: true },
          { fromRole: 'RAM', toRole: 'LAM', type: 'secondary' },
          { fromRole: 'RAM', toRole: 'LW', type: 'switch', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Sweeper Keeper', x: 50, y: 78 },
          { role: 'RCB', name: 'Wide Stopper', x: 72, y: 56 },
          { role: 'CB', name: 'Central Anchor', x: 50, y: 58 },
          { role: 'LCB', name: 'Ball-Playing CB', x: 30, y: 56 },
          { role: 'RDM', name: 'Deep Playmaker', x: 60, y: 40 },
          { role: 'LDM', name: 'Inverted Invert', x: 40, y: 38 },
          { role: 'RW', name: 'Touchline Winger', x: 84, y: 16 },
          { role: 'RAM', name: 'Half-Space #10', x: 72, y: 10 },
          { role: 'LAM', name: 'Free Eight #8', x: 42, y: 18 },
          { role: 'LW', name: 'Touchline Winger', x: 24, y: 12 },
          { role: 'CF', name: 'Complete Striker', x: 50, y: 8 }
        ]
      }
    ]
  },
  {
    name: '4-3-3 Asymmetrical High Press',
    system: '4-3-3',
    philosophy: 'Dynamic Width & Immediate Gegenpressing',
    keyFeature: 'Aggressive full-back overlaps combined with inverted wingers cutting into shooting lanes while the #6 screens passing corridors.',
    positions: [
      { role: 'GK', name: 'Goalkeeper', x: 50, y: 88 },
      { role: 'RB', name: 'Attacking Fullback', x: 84, y: 68 },
      { role: 'RCB', name: 'Covering CB', x: 64, y: 72 },
      { role: 'LCB', name: 'Aggressive CB', x: 36, y: 72 },
      { role: 'LB', name: 'Inverted Fullback', x: 16, y: 64 },
      { role: 'DM', name: 'Regista #6', x: 50, y: 54 },
      { role: 'RCM', name: 'Box-to-Box #8', x: 68, y: 42 },
      { role: 'LCM', name: 'Mezzala #8', x: 32, y: 40 },
      { role: 'RW', name: 'Inside Forward', x: 80, y: 24 },
      { role: 'ST', name: 'Target Forward', x: 50, y: 16 },
      { role: 'LW', name: 'Inside Forward', x: 20, y: 24 }
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        shortLabel: 'Starting 4-3-3',
        phaseName: 'Phase 1: Structured Base & Central Axis',
        annotation: 'Deep 4-3-3 holding shape with Regista #6 anchoring the center circle and full-backs providing conservative wide support.',
        highlightZone: 'central-box',
        activeRoles: ['DM', 'RCB', 'LCB'],
        lanes: [
          { fromRole: 'GK', toRole: 'RCB', type: 'primary' },
          { fromRole: 'RCB', toRole: 'DM', type: 'primary' },
          { fromRole: 'DM', toRole: 'LCB', type: 'secondary' }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 88 },
          { role: 'RB', name: 'Attacking Fullback', x: 84, y: 68 },
          { role: 'RCB', name: 'Covering CB', x: 64, y: 72 },
          { role: 'LCB', name: 'Aggressive CB', x: 36, y: 72 },
          { role: 'LB', name: 'Inverted Fullback', x: 16, y: 66 },
          { role: 'DM', name: 'Regista #6', x: 50, y: 56 },
          { role: 'RCM', name: 'Box-to-Box #8', x: 68, y: 44 },
          { role: 'LCM', name: 'Mezzala #8', x: 32, y: 42 },
          { role: 'RW', name: 'Inside Forward', x: 80, y: 26 },
          { role: 'ST', name: 'Target Forward', x: 50, y: 18 },
          { role: 'LW', name: 'Inside Forward', x: 20, y: 26 }
        ]
      },
      {
        stepNumber: 2,
        shortLabel: 'Asymmetric Push',
        phaseName: 'Phase 2: RB Overlap & Left-Sided Rest Defense',
        annotation: 'RB surges forward into the right flank while LB tucks inside to form a temporary back-three with CBs, preventing counter-attacks.',
        highlightZone: 'wide-right',
        activeRoles: ['RB', 'RW', 'RCM'],
        lanes: [
          { fromRole: 'DM', toRole: 'RCM', type: 'primary', animated: true },
          { fromRole: 'RCM', toRole: 'RB', type: 'through', animated: true },
          { fromRole: 'RCB', toRole: 'DM', type: 'secondary' }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 86 },
          { role: 'RB', name: 'Attacking Fullback', x: 88, y: 48 },
          { role: 'RCB', name: 'Covering CB', x: 62, y: 68 },
          { role: 'LCB', name: 'Aggressive CB', x: 38, y: 68 },
          { role: 'LB', name: 'Inverted Fullback', x: 20, y: 62 },
          { role: 'DM', name: 'Regista #6', x: 48, y: 52 },
          { role: 'RCM', name: 'Box-to-Box #8', x: 70, y: 38 },
          { role: 'LCM', name: 'Mezzala #8', x: 34, y: 36 },
          { role: 'RW', name: 'Inside Forward', x: 74, y: 22 },
          { role: 'ST', name: 'Target Forward', x: 50, y: 16 },
          { role: 'LW', name: 'Inside Forward', x: 18, y: 24 }
        ]
      },
      {
        stepNumber: 3,
        shortLabel: 'Press-Bait & Tilt',
        phaseName: 'Phase 3: Right-Flank Overload & Opposition Gravitation',
        annotation: 'By crowding the right flank (RB, RCM, RW, ST), the opposition block shifts heavily right, exposing massive switch space on the opposite side.',
        highlightZone: 'wide-right',
        activeRoles: ['RW', 'RCM', 'RB', 'ST'],
        lanes: [
          { fromRole: 'RCM', toRole: 'RW', type: 'primary', animated: true },
          { fromRole: 'RW', toRole: 'ST', type: 'secondary' },
          { fromRole: 'RW', toRole: 'DM', type: 'primary', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 84 },
          { role: 'RB', name: 'Attacking Fullback', x: 92, y: 34 },
          { role: 'RCB', name: 'Covering CB', x: 60, y: 64 },
          { role: 'LCB', name: 'Aggressive CB', x: 38, y: 64 },
          { role: 'LB', name: 'Inverted Fullback', x: 22, y: 58 },
          { role: 'DM', name: 'Regista #6', x: 46, y: 46 },
          { role: 'RCM', name: 'Box-to-Box #8', x: 72, y: 30 },
          { role: 'LCM', name: 'Mezzala #8', x: 36, y: 30 },
          { role: 'RW', name: 'Inside Forward', x: 76, y: 18 },
          { role: 'ST', name: 'Target Forward', x: 54, y: 14 },
          { role: 'LW', name: 'Inside Forward', x: 14, y: 20 }
        ]
      },
      {
        stepNumber: 4,
        shortLabel: 'Diagonal Switch',
        phaseName: 'Phase 4: Rapid Diagonal Switch to Isolated LW',
        annotation: 'DM hits a cross-field diagonal pass to isolated LW who has pinned the isolated opponent right-back in wide open acres.',
        highlightZone: 'wide-left',
        activeRoles: ['DM', 'LW', 'LCM'],
        lanes: [
          { fromRole: 'DM', toRole: 'LW', type: 'switch', animated: true },
          { fromRole: 'LCM', toRole: 'LW', type: 'secondary' },
          { fromRole: 'LW', toRole: 'LCM', type: 'through', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 82 },
          { role: 'RB', name: 'Attacking Fullback', x: 88, y: 28 },
          { role: 'RCB', name: 'Covering CB', x: 58, y: 60 },
          { role: 'LCB', name: 'Aggressive CB', x: 36, y: 60 },
          { role: 'LB', name: 'Inverted Fullback', x: 24, y: 52 },
          { role: 'DM', name: 'Regista #6', x: 44, y: 42 },
          { role: 'RCM', name: 'Box-to-Box #8', x: 68, y: 26 },
          { role: 'LCM', name: 'Mezzala #8', x: 30, y: 24 },
          { role: 'RW', name: 'Inside Forward', x: 78, y: 14 },
          { role: 'ST', name: 'Target Forward', x: 50, y: 12 },
          { role: 'LW', name: 'Inside Forward', x: 12, y: 16 }
        ]
      },
      {
        stepNumber: 5,
        shortLabel: 'Cut Inside & Strike',
        phaseName: 'Phase 5: Inward Dribble & Second-Wave Box Attack',
        annotation: 'LW drives inside on strong foot. ST makes a front-post decoy run, clearing Zone 14 for the arriving LCM (Mezzala) to strike.',
        highlightZone: 'penalty-box',
        activeRoles: ['LW', 'ST', 'LCM', 'RW'],
        lanes: [
          { fromRole: 'LW', toRole: 'LCM', type: 'through', animated: true },
          { fromRole: 'LW', toRole: 'ST', type: 'primary' },
          { fromRole: 'LCM', toRole: 'ST', type: 'secondary', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 78 },
          { role: 'RB', name: 'Attacking Fullback', x: 84, y: 24 },
          { role: 'RCB', name: 'Covering CB', x: 56, y: 54 },
          { role: 'LCB', name: 'Aggressive CB', x: 34, y: 54 },
          { role: 'LB', name: 'Inverted Fullback', x: 26, y: 46 },
          { role: 'DM', name: 'Regista #6', x: 42, y: 38 },
          { role: 'RCM', name: 'Box-to-Box #8', x: 64, y: 20 },
          { role: 'LCM', name: 'Mezzala #8', x: 40, y: 16 },
          { role: 'RW', name: 'Inside Forward', x: 74, y: 10 },
          { role: 'ST', name: 'Target Forward', x: 52, y: 8 },
          { role: 'LW', name: 'Inside Forward', x: 26, y: 14 }
        ]
      }
    ]
  },
  {
    name: '3-4-2-1 Fluid Wingback Overload',
    system: '3-4-2-1',
    philosophy: 'Counter-Pressing & Third-Man Runs',
    keyFeature: 'Dual number 10s operating between lines, drawing center-backs while energetic wing-backs crash the penalty box.',
    positions: [
      { role: 'GK', name: 'Goalkeeper', x: 50, y: 88 },
      { role: 'RCB', name: 'Right Centre Back', x: 74, y: 72 },
      { role: 'CB', name: 'Libero Sweeper', x: 50, y: 76 },
      { role: 'LCB', name: 'Left Centre Back', x: 26, y: 72 },
      { role: 'RWB', name: 'High Wingback', x: 90, y: 44 },
      { role: 'RCM', name: 'Holding Midfielder', x: 62, y: 52 },
      { role: 'LCM', name: 'Progressive Carrier', x: 38, y: 52 },
      { role: 'LWB', name: 'High Wingback', x: 10, y: 44 },
      { role: 'RF', name: 'Dual Playmaker', x: 65, y: 28 },
      { role: 'LF', name: 'Dual Playmaker', x: 35, y: 28 },
      { role: 'ST', name: 'Mobile #9', x: 50, y: 14 }
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        shortLabel: 'Initial Shape',
        phaseName: 'Phase 1: Compact 3-4-2-1 Midfield Screen',
        annotation: 'Symmetric back-three supported by double pivots (LCM, RCM) controlling the first phase of progressive ball circulation.',
        highlightZone: 'central-box',
        activeRoles: ['CB', 'LCM', 'RCM'],
        lanes: [
          { fromRole: 'GK', toRole: 'CB', type: 'primary' },
          { fromRole: 'CB', toRole: 'LCM', type: 'primary' },
          { fromRole: 'CB', toRole: 'RCM', type: 'primary' }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 88 },
          { role: 'RCB', name: 'Right Centre Back', x: 76, y: 72 },
          { role: 'CB', name: 'Libero Sweeper', x: 50, y: 76 },
          { role: 'LCB', name: 'Left Centre Back', x: 24, y: 72 },
          { role: 'RWB', name: 'High Wingback', x: 90, y: 48 },
          { role: 'RCM', name: 'Holding Midfielder', x: 62, y: 54 },
          { role: 'LCM', name: 'Progressive Carrier', x: 38, y: 54 },
          { role: 'LWB', name: 'High Wingback', x: 10, y: 48 },
          { role: 'RF', name: 'Dual Playmaker', x: 65, y: 30 },
          { role: 'LF', name: 'Dual Playmaker', x: 35, y: 30 },
          { role: 'ST', name: 'Mobile #9', x: 50, y: 16 }
        ]
      },
      {
        stepNumber: 2,
        shortLabel: 'Dual 10 Infiltration',
        phaseName: 'Phase 2: Half-Space Pocket Infiltration',
        annotation: 'Inside forwards (LF, RF) drop between lines into the half-spaces, causing indecision in the opposition back-four.',
        highlightZone: 'half-space-left',
        activeRoles: ['LF', 'LCM', 'LWB'],
        lanes: [
          { fromRole: 'LCM', toRole: 'LF', type: 'through', animated: true },
          { fromRole: 'LF', toRole: 'LWB', type: 'secondary' },
          { fromRole: 'LCM', toRole: 'RCM', type: 'primary' }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 86 },
          { role: 'RCB', name: 'Right Centre Back', x: 74, y: 68 },
          { role: 'CB', name: 'Libero Sweeper', x: 50, y: 72 },
          { role: 'LCB', name: 'Left Centre Back', x: 26, y: 68 },
          { role: 'RWB', name: 'High Wingback', x: 92, y: 40 },
          { role: 'RCM', name: 'Holding Midfielder', x: 60, y: 48 },
          { role: 'LCM', name: 'Progressive Carrier', x: 38, y: 48 },
          { role: 'LWB', name: 'High Wingback', x: 8, y: 38 },
          { role: 'RF', name: 'Dual Playmaker', x: 68, y: 26 },
          { role: 'LF', name: 'Dual Playmaker', x: 32, y: 24 },
          { role: 'ST', name: 'Mobile #9', x: 50, y: 14 }
        ]
      },
      {
        stepNumber: 3,
        shortLabel: 'Third-Man Release',
        phaseName: 'Phase 3: Third-Man Combination & Vertical Surge',
        annotation: 'LF plays a quick 1-2 with dropping ST, freeing LCM to surge forward unmarked through the central funnel.',
        highlightZone: 'central-box',
        activeRoles: ['LF', 'ST', 'LCM'],
        lanes: [
          { fromRole: 'LF', toRole: 'ST', type: 'primary', animated: true },
          { fromRole: 'ST', toRole: 'LCM', type: 'through', animated: true },
          { fromRole: 'LCM', toRole: 'RWB', type: 'switch', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 84 },
          { role: 'RCB', name: 'Right Centre Back', x: 72, y: 64 },
          { role: 'CB', name: 'Libero Sweeper', x: 50, y: 68 },
          { role: 'LCB', name: 'Left Centre Back', x: 28, y: 64 },
          { role: 'RWB', name: 'High Wingback', x: 92, y: 30 },
          { role: 'RCM', name: 'Holding Midfielder', x: 62, y: 42 },
          { role: 'LCM', name: 'Progressive Carrier', x: 42, y: 34 },
          { role: 'LWB', name: 'High Wingback', x: 8, y: 28 },
          { role: 'RF', name: 'Dual Playmaker', x: 70, y: 20 },
          { role: 'LF', name: 'Dual Playmaker', x: 30, y: 20 },
          { role: 'ST', name: 'Mobile #9', x: 46, y: 16 }
        ]
      },
      {
        stepNumber: 4,
        shortLabel: 'Wingback Overload',
        phaseName: 'Phase 4: High Wingback Sprint & Flank Isolation',
        annotation: 'RWB reaches the byline at full pace after RF drags the opposing center-back inside, opening an undefended right flank.',
        highlightZone: 'wide-right',
        activeRoles: ['RWB', 'RF', 'LCM'],
        lanes: [
          { fromRole: 'LCM', toRole: 'RWB', type: 'through', animated: true },
          { fromRole: 'RWB', toRole: 'RF', type: 'secondary' },
          { fromRole: 'RWB', toRole: 'ST', type: 'primary', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 82 },
          { role: 'RCB', name: 'Right Centre Back', x: 70, y: 58 },
          { role: 'CB', name: 'Libero Sweeper', x: 50, y: 62 },
          { role: 'LCB', name: 'Left Centre Back', x: 30, y: 58 },
          { role: 'RWB', name: 'High Wingback', x: 88, y: 16 },
          { role: 'RCM', name: 'Holding Midfielder', x: 60, y: 36 },
          { role: 'LCM', name: 'Progressive Carrier', x: 46, y: 26 },
          { role: 'LWB', name: 'High Wingback', x: 12, y: 20 },
          { role: 'RF', name: 'Dual Playmaker', x: 66, y: 14 },
          { role: 'LF', name: 'Dual Playmaker', x: 34, y: 16 },
          { role: 'ST', name: 'Mobile #9', x: 50, y: 10 }
        ]
      },
      {
        stepNumber: 5,
        shortLabel: 'Box Crash & Finish',
        phaseName: 'Phase 5: Low Byline Driven Cross & Double-Wingback Overload',
        annotation: 'RWB delivers low into the 6-yard box. Both #10s attack the penalty spot while opposite wingback LWB crashes the back post.',
        highlightZone: 'penalty-box',
        activeRoles: ['RWB', 'ST', 'RF', 'LWB'],
        lanes: [
          { fromRole: 'RWB', toRole: 'ST', type: 'through', animated: true },
          { fromRole: 'RWB', toRole: 'RF', type: 'secondary' },
          { fromRole: 'RWB', toRole: 'LWB', type: 'switch', animated: true }
        ],
        positions: [
          { role: 'GK', name: 'Goalkeeper', x: 50, y: 78 },
          { role: 'RCB', name: 'Right Centre Back', x: 68, y: 52 },
          { role: 'CB', name: 'Libero Sweeper', x: 50, y: 56 },
          { role: 'LCB', name: 'Left Centre Back', x: 32, y: 52 },
          { role: 'RWB', name: 'High Wingback', x: 82, y: 12 },
          { role: 'RCM', name: 'Holding Midfielder', x: 58, y: 30 },
          { role: 'LCM', name: 'Progressive Carrier', x: 48, y: 22 },
          { role: 'LWB', name: 'High Wingback', x: 22, y: 10 },
          { role: 'RF', name: 'Dual Playmaker', x: 62, y: 10 },
          { role: 'LF', name: 'Dual Playmaker', x: 38, y: 12 },
          { role: 'ST', name: 'Mobile #9', x: 50, y: 6 }
        ]
      }
    ]
  }
];
