import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Square, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  Clock
} from 'lucide-react';
import { Article } from '../../types';
import { useApp } from '../../context/AppContext';

interface AudioReaderPlayerProps {
  article: Article;
  className?: string;
}

export const AudioReaderPlayer: React.FC<AudioReaderPlayerProps> = ({ article, className = '' }) => {
  const { 
    saveAudioProgress, 
    clearAudioProgress, 
    getAudioRecord, 
    isArticleListened,
    showToast 
  } = useApp();

  // Retrieve saved listening record for this article
  const savedRecord = getAudioRecord(article.id);
  const isListened = isArticleListened(article.id);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  
  // Progress and rate state
  const [speed, setSpeed] = useState<0.8 | 1 | 1.2 | 1.5>(() => {
    return (savedRecord?.speed as any) || 1;
  });
  const [progressPercent, setProgressPercent] = useState<number>(() => {
    return savedRecord?.progress || 0;
  });
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(() => {
    return savedRecord?.charIndex || 0;
  });

  // Track start offset when resuming
  const startOffsetRef = useRef<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Build full spoken text from article components
  const fullArticleText = useMemo(() => {
    const parts: string[] = [];
    parts.push(`${article.title}.`);
    parts.push(`Dispatch written by ${article.authorName}, categorized under ${article.categoryName}.`);
    if (article.excerpt) {
      parts.push(article.excerpt);
    }
    article.body.forEach(block => {
      if (block.content) {
        parts.push(block.content);
      }
      if (block.tacticalPoints && block.tacticalPoints.length > 0) {
        parts.push(`Tactical observations: ${block.tacticalPoints.join('. ')}.`);
      }
    });
    return parts.join(' \n\n ');
  }, [article]);

  const totalChars = fullArticleText.length;

  // Clear fallback estimation interval
  const clearFallbackInterval = () => {
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  // Check speech synthesis support on mount
  useEffect(() => {
    isMountedRef.current = true;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
                         voices.find(v => v.lang.startsWith('en')) ||
                         voices[0];
        if (engVoice) {
          setSelectedVoiceName(engVoice.name);
        }
      }
    };

    checkVoices();
    window.speechSynthesis.onvoiceschanged = checkVoices;

    // Cleanup: cancel speech when leaving page/unmounting
    return () => {
      isMountedRef.current = false;
      clearFallbackInterval();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update progress persistence
  const persistProgress = (newPercent: number, charIdx: number) => {
    setProgressPercent(newPercent);
    setCurrentCharIndex(charIdx);
    saveAudioProgress({
      articleId: article.id,
      articleSlug: article.slug,
      articleTitle: article.title,
      progress: newPercent,
      charIndex: charIdx,
      lastListenedAt: Date.now(),
      completed: newPercent >= 90,
      speed,
      durationMinutes: article.readTimeMinutes
    });
  };

  // Start speaking from a character offset
  const speakTextFromOffset = (offset: number) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any previous speech
    window.speechSynthesis.cancel();
    clearFallbackInterval();

    const clampedOffset = Math.min(Math.max(0, offset), totalChars - 10);
    startOffsetRef.current = clampedOffset;
    const textChunk = fullArticleText.slice(clampedOffset);

    if (!textChunk.trim()) {
      persistProgress(100, totalChars);
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textChunk);
    utteranceRef.current = utterance;
    utterance.rate = speed;
    utterance.pitch = 1.0;

    // Select voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const chosenVoice = voices.find(v => v.name === selectedVoiceName) || 
                          voices.find(v => v.lang.startsWith('en')) || 
                          voices[0];
      if (chosenVoice) utterance.voice = chosenVoice;
    }

    // Speech events
    utterance.onstart = () => {
      if (!isMountedRef.current) return;
      setIsPlaying(true);
      setIsPaused(false);

      // Start fallback progress ticker in case onboundary doesn't fire
      let lastEstimatedChar = clampedOffset;
      const charsPerSecond = 14 * speed;

      fallbackTimerRef.current = setInterval(() => {
        if (!isMountedRef.current || !window.speechSynthesis.speaking || window.speechSynthesis.paused) {
          return;
        }
        lastEstimatedChar = Math.min(totalChars, lastEstimatedChar + Math.round(charsPerSecond * 0.5));
        const estPercent = Math.min(100, Math.round((lastEstimatedChar / totalChars) * 100));
        persistProgress(estPercent, lastEstimatedChar);
      }, 500);
    };

    utterance.onpause = () => {
      if (!isMountedRef.current) return;
      setIsPlaying(false);
      setIsPaused(true);
      clearFallbackInterval();
    };

    utterance.onresume = () => {
      if (!isMountedRef.current) return;
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onboundary = (e: SpeechSynthesisEvent) => {
      if (!isMountedRef.current) return;
      if (e.charIndex !== undefined) {
        const globalChar = clampedOffset + e.charIndex;
        const currentPercent = Math.min(100, Math.round((globalChar / totalChars) * 100));
        persistProgress(currentPercent, globalChar);
      }
    };

    utterance.onend = () => {
      if (!isMountedRef.current) return;
      clearFallbackInterval();
      setIsPlaying(false);
      setIsPaused(false);
      persistProgress(100, totalChars);
      showToast('Audio narration finished', 'success');
    };

    utterance.onerror = (e) => {
      if (!isMountedRef.current) return;
      clearFallbackInterval();
      // Ignore 'canceled' error caused by user stopping
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e.error);
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    // Speak
    window.speechSynthesis.speak(utterance);
  };

  // Play / Pause / Resume
  const handlePlayClick = () => {
    if (!isSupported) return;

    if (isPaused) {
      // Resume native speech
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (isPlaying) {
      // Pause native speech
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // Starting new playback
    const startPos = progressPercent >= 95 ? 0 : currentCharIndex;
    speakTextFromOffset(startPos);
  };

  const handleResumeFromSaved = () => {
    if (savedRecord) {
      speakTextFromOffset(savedRecord.charIndex);
    }
  };

  const handleRestart = () => {
    window.speechSynthesis.cancel();
    clearFallbackInterval();
    setIsPlaying(false);
    setIsPaused(false);
    persistProgress(0, 0);
    speakTextFromOffset(0);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    clearFallbackInterval();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleSpeedChange = (newSpeed: 0.8 | 1 | 1.2 | 1.5) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      // Restart cleanly from current position with new speed
      window.speechSynthesis.cancel();
      clearFallbackInterval();
      setTimeout(() => {
        speakTextFromOffset(currentCharIndex);
      }, 50);
    } else if (savedRecord) {
      saveAudioProgress({
        ...savedRecord,
        speed: newSpeed
      });
    }
  };

  const handleClearProgress = () => {
    handleStop();
    clearAudioProgress(article.id);
    setProgressPercent(0);
    setCurrentCharIndex(0);
  };

  // Estimated remaining seconds calculation
  const remainingChars = Math.max(0, totalChars - currentCharIndex);
  const estRemainingSeconds = Math.max(0, Math.ceil(remainingChars / (14 * speed)));
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  // Fallback if browser does not support Web Speech API
  if (!isSupported) {
    return (
      <div className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-md ${className}`}>
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Audio Narration Unavailable</span>
            <p className="text-[11px] text-[var(--text-muted)]">
              Your browser environment does not provide Web Speech API synthesis. Please read the text version.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id={`audio-player-${article.id}`}
      className={`rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-xl shadow-[var(--shadow-color)] transition-all ${className}`}
    >
      {/* Continue from previous progress banner */}
      {savedRecord && savedRecord.progress > 5 && savedRecord.progress < 90 && !isPlaying && !isPaused && (
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Clock className="h-4 w-4 shrink-0" />
            <span>
              Previously listened to <strong>{savedRecord.progress}%</strong> of this story
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResumeFromSaved}
              className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Continue from {savedRecord.progress}%
            </button>
            <button
              onClick={handleClearProgress}
              className="text-[var(--text-muted)] hover:text-rose-500 p-1 transition-colors cursor-pointer"
              title="Clear saved listening progress"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Player Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Play / Pause button & Story info */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={handlePlayClick}
            id={`audio-play-btn-${article.id}`}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 shadow-amber-600/30 hover:bg-amber-500'
                : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-500'
            }`}
            title={isPlaying ? 'Pause speech narration' : 'Listen to full article narration'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
                Audible Text-to-Speech
              </span>
              {isListened && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" /> Listened
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-md bg-[var(--bg-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)] border border-[var(--border-subtle)]">
                <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                Web Speech Engine
              </span>
            </div>
            <p className="mt-0.5 text-xs sm:text-sm font-bold text-[var(--text-primary)] line-clamp-1 max-w-sm">
              {article.title}
            </p>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="hidden md:flex items-center gap-1 h-7 px-3.5 py-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
          {[35, 75, 95, 55, 100, 45, 80, 60, 90, 30, 85, 65, 90, 40, 70, 95, 50, 85].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-blue-500 animate-pulse'
                  : isPaused
                  ? 'bg-amber-400 opacity-60'
                  : 'bg-[var(--text-muted)] opacity-30'
              }`}
              style={{
                height: isPlaying ? `${Math.max(25, Math.floor(h * 0.75))}%` : '30%',
                animationDelay: `${(i % 5) * 120}ms`
              }}
            />
          ))}
        </div>

        {/* Real Controls: Speed, Restart, Stop, Remaining Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Speed Presets */}
          <div className="flex items-center rounded-xl bg-[var(--bg-subtle)] p-1 border border-[var(--border-subtle)]">
            {([0.8, 1, 1.2, 1.5] as const).map(rate => (
              <button
                key={rate}
                onClick={() => handleSpeedChange(rate)}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                  speed === rate
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title={`Set playback speed to ${rate}x`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title="Restart from beginning"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Stop / Clear */}
          {(isPlaying || isPaused || progressPercent > 0) && (
            <button
              onClick={handleStop}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle-hover)] hover:text-rose-500 transition-colors cursor-pointer"
              title="Stop narration"
            >
              <Square className="h-3 w-3 fill-current" />
            </button>
          )}

          {/* Time & Progress indicator */}
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-[var(--text-primary)]">
              {progressPercent}%
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {formatTime(estRemainingSeconds)} left (est.)
            </div>
          </div>
        </div>
      </div>

      {/* Scrubber Progress Bar */}
      <div className="mt-3.5 relative w-full">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] relative">
          <div
            className={`h-full transition-all duration-300 ${
              progressPercent >= 90
                ? 'bg-gradient-to-r from-blue-600 to-emerald-500'
                : 'bg-gradient-to-r from-blue-600 to-blue-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
