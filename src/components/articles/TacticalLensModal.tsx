import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Activity, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { TACTICAL_FORMATIONS } from '../../data/tactics';
import { TacticalSimulationStep, TacticalLane } from '../../types';

interface TacticalLensModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
}

export const TacticalLensModal: React.FC<TacticalLensModalProps> = ({ isOpen, onClose, articleTitle }) => {
  const [selectedFormationIdx, setSelectedFormationIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState<1 | 1.5>(1);
  const [hoveredPlayerRole, setHoveredPlayerRole] = useState<string | null>(null);
  
  // Ref for timer
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formation = TACTICAL_FORMATIONS[selectedFormationIdx];
  const steps: TacticalSimulationStep[] = formation.simulationSteps || [];
  const currentStep = steps[currentStepIdx] || steps[0];
  const totalSteps = steps.length;

  // Clear timers on any unmount or change
  const clearSimTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Reset simulation when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      clearSimTimer();
      setIsPlaying(false);
      setCurrentStepIdx(0);
    }
    return () => clearSimTimer();
  }, [isOpen]);

  // Reset step and timer when formation changes
  const handleSelectFormation = (idx: number) => {
    clearSimTimer();
    setIsPlaying(false);
    setSelectedFormationIdx(idx);
    setCurrentStepIdx(0);
  };

  // Step advancement in playing loop
  useEffect(() => {
    if (!isPlaying) {
      clearSimTimer();
      return;
    }

    const intervalDuration = (2200 / simSpeed);
    timerRef.current = setTimeout(() => {
      setCurrentStepIdx(prev => {
        if (prev >= totalSteps - 1) {
          // Finished sequence - pause at end or loop
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalDuration);

    return () => clearSimTimer();
  }, [isPlaying, currentStepIdx, simSpeed, totalSteps]);

  // Controls
  const handleTogglePlay = () => {
    if (currentStepIdx >= totalSteps - 1 && !isPlaying) {
      // If at the end and pressing play, restart from beginning
      setCurrentStepIdx(0);
    }
    setIsPlaying(prev => !prev);
  };

  const handleNextStep = () => {
    clearSimTimer();
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.min(totalSteps - 1, prev + 1));
  };

  const handlePrevStep = () => {
    clearSimTimer();
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    clearSimTimer();
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  if (!isOpen) return null;

  // Compute player position map for fast lane coordinate resolution
  const playerPositionMap: Record<string, { x: number; y: number; name: string }> = {};
  currentStep.positions.forEach(p => {
    playerPositionMap[p.role] = { x: p.x, y: p.y, name: p.name };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 md:p-6 backdrop-blur-md animate-fade-in">
      <div 
        id="tactical-lens-modal"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-7 shadow-2xl shadow-[var(--shadow-color)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <Activity className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Contextual Tactical Lens
                </span>
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-500 border border-blue-500/20">
                  Dynamic Spatial Engine
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[var(--text-primary)]">
                {formation.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            id="tactical-lens-close-btn"
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-2 text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title="Close Tactical Lens"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formation Switcher & Simulation Status */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {TACTICAL_FORMATIONS.map((f, idx) => (
              <button
                key={f.system}
                onClick={() => handleSelectFormation(idx)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedFormationIdx === idx
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{f.system}</span>
              </button>
            ))}
          </div>

          {/* Step Timeline Indicator */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-elevated)] p-1.5 rounded-xl border border-[var(--border-subtle)]">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] px-2">
              Step {currentStep.stepNumber} of {totalSteps}
            </span>
            <div className="flex items-center gap-1">
              {steps.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => {
                    clearSimTimer();
                    setIsPlaying(false);
                    setCurrentStepIdx(idx);
                  }}
                  title={s.shortLabel}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentStepIdx === idx
                      ? 'w-6 bg-emerald-500'
                      : idx < currentStepIdx
                      ? 'w-2 bg-blue-500/80'
                      : 'w-2 bg-[var(--border-strong)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Pitch Canvas Box */}
        <div className="mt-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 sm:p-6 shadow-inner">
          <div className="relative mx-auto aspect-[16/10] max-w-2xl overflow-hidden rounded-2xl border border-emerald-600/40 bg-gradient-to-b from-[#064e3b] via-[#043e30] to-[#022c22] p-4 shadow-2xl">
            {/* Pitch Grass Texture & Lines */}
            <div className="absolute inset-2 sm:inset-3 rounded-lg border border-white/40 pointer-events-none">
              {/* Halfway line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-white/40 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
              </div>
              {/* Penalty Boxes */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-12 sm:h-16 border-b border-l border-r border-white/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-12 sm:h-16 border-t border-l border-r border-white/40" />
              {/* 6-Yard Boxes */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-7 border-b border-l border-r border-white/30" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-7 border-t border-l border-r border-white/30" />
            </div>

            {/* Tactical Channel Overlay Zones */}
            {currentStep.highlightZone === 'central-box' && (
              <div className="absolute top-[28%] left-[28%] w-[44%] h-[40%] bg-blue-400/10 border border-blue-400/30 rounded-2xl animate-pulse pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-blue-300 uppercase opacity-75">Central Overload Zone</span>
              </div>
            )}
            {currentStep.highlightZone === 'half-space-right' && (
              <div className="absolute top-[15%] left-[58%] w-[26%] h-[45%] bg-amber-400/15 border border-amber-400/30 rounded-xl animate-pulse pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-amber-300 uppercase opacity-75">Right Half-Space</span>
              </div>
            )}
            {currentStep.highlightZone === 'half-space-left' && (
              <div className="absolute top-[15%] left-[16%] w-[26%] h-[45%] bg-amber-400/15 border border-amber-400/30 rounded-xl animate-pulse pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-amber-300 uppercase opacity-75">Left Half-Space</span>
              </div>
            )}
            {currentStep.highlightZone === 'wide-right' && (
              <div className="absolute top-[10%] right-[3%] w-[22%] h-[60%] bg-emerald-400/15 border border-emerald-400/30 rounded-xl animate-pulse pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-emerald-300 uppercase opacity-75">Wide Flank</span>
              </div>
            )}
            {currentStep.highlightZone === 'wide-left' && (
              <div className="absolute top-[10%] left-[3%] w-[22%] h-[60%] bg-emerald-400/15 border border-emerald-400/30 rounded-xl animate-pulse pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-emerald-300 uppercase opacity-75">Wide Flank</span>
              </div>
            )}
            {currentStep.highlightZone === 'penalty-box' && (
              <div className="absolute top-[5%] left-[24%] w-[52%] h-[28%] bg-rose-400/15 border border-rose-400/40 rounded-xl animate-pulse pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-rose-300 uppercase opacity-80">Cutback Channel & Box Crash</span>
              </div>
            )}

            {/* Dynamic Animated Passing Lanes */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
              <defs>
                <marker
                  id="arrow-primary"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker
                  id="arrow-through"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
                </marker>
                <marker
                  id="arrow-switch"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24" />
                </marker>
              </defs>

              {currentStep.lanes.map((lane: TacticalLane, lIdx: number) => {
                const fromP = playerPositionMap[lane.fromRole];
                const toP = playerPositionMap[lane.toRole];
                if (!fromP || !toP) return null;

                const strokeColor =
                  lane.type === 'through'
                    ? '#34d399'
                    : lane.type === 'switch'
                    ? '#fbbf24'
                    : '#38bdf8';

                const markerId =
                  lane.type === 'through'
                    ? 'url(#arrow-through)'
                    : lane.type === 'switch'
                    ? 'url(#arrow-switch)'
                    : 'url(#arrow-primary)';

                return (
                  <g key={`${lane.fromRole}-${lane.toRole}-${lIdx}`}>
                    <line
                      x1={`${fromP.x}%`}
                      y1={`${fromP.y}%`}
                      x2={`${toP.x}%`}
                      y2={`${toP.y}%`}
                      stroke={strokeColor}
                      strokeWidth={lane.animated ? '2.5' : '1.5'}
                      strokeDasharray={lane.type === 'through' ? '6 3' : lane.type === 'switch' ? '4 4' : '3 3'}
                      strokeOpacity="0.85"
                      markerEnd={markerId}
                      className={lane.animated ? 'transition-all duration-700' : ''}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Players with CSS Coordinate Animation */}
            {currentStep.positions.map((player) => {
              const isGK = player.role === 'GK';
              const isForward = ['CF', 'ST', 'RW', 'LW', 'RF', 'LF'].includes(player.role);
              const isActiveInStep = currentStep.activeRoles?.includes(player.role);
              const isHovered = hoveredPlayerRole === player.role;

              return (
                <div
                  key={player.role}
                  onMouseEnter={() => setHoveredPlayerRole(player.role)}
                  onMouseLeave={() => setHoveredPlayerRole(null)}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 ease-out"
                  style={{ left: `${player.x}%`, top: `${player.y}%` }}
                >
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[10px] sm:text-xs font-black shadow-lg transition-transform duration-300 ${
                      isGK
                        ? 'bg-amber-400 text-slate-950 border-2 border-amber-200'
                        : isForward
                        ? 'bg-blue-500 text-white border-2 border-blue-200'
                        : 'bg-emerald-500 text-slate-950 border-2 border-emerald-200'
                    } ${
                      isActiveInStep
                        ? 'ring-4 ring-emerald-300/80 scale-115 animate-bounce-subtle'
                        : isHovered
                        ? 'ring-2 ring-white scale-120'
                        : ''
                    }`}
                  >
                    {player.role}
                  </div>

                  {/* Player Hover Tooltip */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950/90 px-2 py-0.5 text-[9px] font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                    {player.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Simulation Controls Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3.5">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                id="tactical-sim-play-pause-btn"
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
                title={isPlaying ? 'Pause tactical simulation' : 'Play tactical progression'}
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause' : currentStepIdx === totalSteps - 1 ? 'Replay' : 'Simulate Channels'}</span>
              </button>

              <button
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Previous step"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIdx === totalSteps - 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Next step"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleReset}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                title="Reset to base structure"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Simulation Speed & Step Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimSpeed(prev => (prev === 1 ? 1.5 : 1))}
                className="flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2.5 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Toggle simulation speed"
              >
                <Zap className="h-3 w-3 text-amber-500" />
                <span>{simSpeed}x Speed</span>
              </button>

              {/* Jump to specific step */}
              <div className="hidden sm:flex items-center gap-1">
                {steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => {
                      clearSimTimer();
                      setIsPlaying(false);
                      setCurrentStepIdx(idx);
                    }}
                    className={`rounded-lg px-2 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                      currentStepIdx === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {s.shortLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Step Annotation Breakdown */}
        <div className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 mt-0.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  {currentStep.phaseName}
                </span>
                {currentStep.activeRoles && (
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active Rotations: {currentStep.activeRoles.join(', ')}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {currentStep.annotation}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>
            Context for: <strong className="italic text-[var(--text-primary)]">"{articleTitle}"</strong>
          </span>
          <span className="text-[11px] font-mono">Passing lane physics v2.4</span>
        </div>
      </div>
    </div>
  );
};
