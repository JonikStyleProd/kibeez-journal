import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Sparkles, Layers } from 'lucide-react';
import { TACTICAL_FORMATIONS } from '../../data/tactics';
import { TacticalSimulationStep, TacticalLane } from '../../types';

export const HeroTacticalPitch3D: React.FC = () => {
  const [activeFormationIdx, setActiveFormationIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredPlayerRole, setHoveredPlayerRole] = useState<string | null>(null);
  
  // Parallax tilt state
  const [tilt, setTilt] = useState({ rx: 22, ry: -6, scale: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formation = TACTICAL_FORMATIONS[activeFormationIdx];
  const steps: TacticalSimulationStep[] = formation.simulationSteps || [];
  const currentStep = steps[currentStepIdx] || steps[0];
  const totalSteps = steps.length;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-1 to 1)
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      rx: 24 - normY * 10,
      ry: -6 + normX * 10,
      scale: 1.02
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 22, ry: -6, scale: 1 });
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Step advancement timer loop
  useEffect(() => {
    if (!isPlaying) {
      clearTimer();
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentStepIdx(prev => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);

    return () => clearTimer();
  }, [isPlaying, currentStepIdx, totalSteps]);

  // Handle Play / Pause / Replay toggle
  const handleTogglePlay = () => {
    if (currentStepIdx >= totalSteps - 1 && !isPlaying) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(prev => !prev);
  };

  const handleSelectFormation = (idx: number) => {
    clearTimer();
    setIsPlaying(false);
    setActiveFormationIdx(idx);
    setCurrentStepIdx(0);
  };

  const handleReset = () => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // Position map for dynamic SVG passing lines
  const playerPositionMap: Record<string, { x: number; y: number; name: string }> = {};
  currentStep.positions.forEach(p => {
    playerPositionMap[p.role] = { x: p.x, y: p.y, name: p.name };
  });

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 lg:p-6 shadow-2xl shadow-[var(--shadow-color)] backdrop-blur-xl">
      {/* Header Bar with tactical badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <Activity className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">Tactical 3D Simulator</span>
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-500 border border-blue-500/20">Phase {currentStep.stepNumber}/{totalSteps}</span>
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{formation.name}</h4>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            id="hero-simulate-tactics-btn"
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg transition-all active:scale-95 cursor-pointer ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30'
            }`}
            title="Simulate passing progression"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                <span>{currentStepIdx === totalSteps - 1 ? 'Replay' : 'Simulate Channels'}</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title="Reset structure"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Formations Switcher Tabs */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {TACTICAL_FORMATIONS.map((f, idx) => (
            <button
              key={f.system}
              onClick={() => handleSelectFormation(idx)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                activeFormationIdx === idx
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>{f.system}</span>
            </button>
          ))}
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1">
          {steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => {
                clearTimer();
                setIsPlaying(false);
                setCurrentStepIdx(idx);
              }}
              title={s.shortLabel}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentStepIdx === idx
                  ? 'w-5 bg-emerald-500'
                  : idx < currentStepIdx
                  ? 'w-1.5 bg-blue-500'
                  : 'w-1.5 bg-[var(--border-strong)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3D Pitch Arena */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mt-4 flex min-h-[320px] md:min-h-[360px] w-full items-center justify-center perspective-1000 select-none"
      >
        {/* Stadium floodlight ambient cone */}
        <div className="pointer-events-none absolute -top-10 h-64 w-full bg-gradient-to-b from-blue-500/10 via-emerald-500/5 to-transparent blur-2xl" />

        {/* 3D Rotated Grass Pitch Canvas */}
        <div
          className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl border-2 border-emerald-500/30 shadow-2xl transition-transform duration-200 ease-out preserve-3d"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(0deg) scale(${tilt.scale})`,
            background: 'radial-gradient(ellipse at center, #064e3b 0%, #022c22 70%, #011a14 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.15)'
          }}
        >
          {/* Grass Mowing Stripes */}
          <div className="absolute inset-0 grid grid-cols-6 opacity-20 pointer-events-none rounded-2xl overflow-hidden">
            <div className="bg-white/5 border-r border-white/5" />
            <div className="border-r border-white/5" />
            <div className="bg-white/5 border-r border-white/5" />
            <div className="border-r border-white/5" />
            <div className="bg-white/5 border-r border-white/5" />
            <div />
          </div>

          {/* Pitch Lines (FIFA Regulation Geometry Overlay) */}
          <div className="absolute inset-2.5 rounded border border-white/40 pointer-events-none">
            {/* Halfway Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />

            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full border border-white/40 flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-white/60" />
            </div>

            {/* Top Penalty Box */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 border-b border-l border-r border-white/40">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 border-b border-l border-r border-white/30" />
            </div>

            {/* Bottom Penalty Box */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 border-t border-l border-r border-white/40">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-5 border-t border-l border-r border-white/30" />
            </div>
          </div>

          {/* Tactical Passing Trajectories SVG */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
            <defs>
              <marker
                id="hero-arrow-primary"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker
                id="hero-arrow-through"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
              </marker>
            </defs>

            {currentStep.lanes.map((lane: TacticalLane, lIdx: number) => {
              const fromP = playerPositionMap[lane.fromRole];
              const toP = playerPositionMap[lane.toRole];
              if (!fromP || !toP) return null;

              const strokeColor = lane.type === 'through' ? '#34d399' : lane.type === 'switch' ? '#fbbf24' : '#38bdf8';
              const markerId = lane.type === 'through' ? 'url(#hero-arrow-through)' : 'url(#hero-arrow-primary)';

              return (
                <line
                  key={`${lane.fromRole}-${lane.toRole}-${lIdx}`}
                  x1={`${fromP.x}%`}
                  y1={`${fromP.y}%`}
                  x2={`${toP.x}%`}
                  y2={`${toP.y}%`}
                  stroke={strokeColor}
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  strokeOpacity="0.85"
                  markerEnd={markerId}
                />
              );
            })}
          </svg>

          {/* Player Nodes with Smooth Transition Animations */}
          {currentStep.positions.map((player) => {
            const isGK = player.role === 'GK';
            const isForward = ['CF', 'ST', 'RW', 'LW', 'RF', 'LF'].includes(player.role);
            const isActive = currentStep.activeRoles?.includes(player.role);
            const isHovered = hoveredPlayerRole === player.role;

            return (
              <div
                key={player.role}
                className="group absolute z-20 transition-all duration-700 ease-out cursor-pointer"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredPlayerRole(player.role)}
                onMouseLeave={() => setHoveredPlayerRole(null)}
              >
                <div className="relative flex flex-col items-center">
                  {/* Active Player Pulse Ring */}
                  {isActive && (
                    <div className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping" />
                  )}

                  {/* Player Token */}
                  <div
                    className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full text-[10px] font-black shadow-md transition-transform group-hover:scale-125 ${
                      isGK
                        ? 'bg-amber-400 text-slate-950 border-2 border-amber-200'
                        : isForward
                        ? 'bg-blue-500 text-white border-2 border-blue-200'
                        : 'bg-emerald-500 text-slate-950 border-2 border-emerald-200'
                    } ${isActive ? 'ring-2 ring-white scale-110' : isHovered ? 'ring-2 ring-white scale-120' : ''}`}
                  >
                    {player.role}
                  </div>

                  {/* Player Name Tooltip */}
                  <div className="absolute -bottom-5 whitespace-nowrap rounded bg-slate-950/90 px-1.5 py-0.5 text-[9px] font-medium text-slate-200 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 pointer-events-none border border-white/10 z-40">
                    {player.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Step Annotation */}
      <div className="mt-4 rounded-2xl bg-[var(--bg-elevated)] p-3.5 text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)]">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div>
            <span className="font-bold text-[var(--text-primary)]">{currentStep.phaseName}: </span>
            <span>{currentStep.annotation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
