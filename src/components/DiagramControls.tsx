"use client";

interface DiagramControlsProps {
  step: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3L5 7L9 11" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3L9 7L5 11" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2.5 1.5L10 6L2.5 10.5V1.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <rect x="2" y="1.5" width="3" height="9" rx="0.5" />
      <rect x="7" y="1.5" width="3" height="9" rx="0.5" />
    </svg>
  );
}

export function DiagramControls({
  step,
  totalSteps,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
}: DiagramControlsProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-border pb-3">
      {/* Prev */}
      <button
        onClick={onPrev}
        className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Previous step"
      >
        <ChevronLeft />
      </button>

      {/* Play / Pause */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isPlaying
            ? "bg-accent-yellow/20 text-accent-yellow hover:bg-accent-yellow/30"
            : "bg-accent-green/15 text-accent-green hover:bg-accent-green/25"
        }`}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Next step"
      >
        <ChevronRight />
      </button>

      {/* Step counter */}
      <span className="text-[11px] text-gray-500 tabular-nums ml-2 min-w-[3ch] text-center">
        {step + 1}/{totalSteps}
      </span>
    </div>
  );
}
