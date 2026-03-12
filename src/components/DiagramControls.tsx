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
    <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-border">
      <button
        onClick={onPrev}
        className="text-gray-500 hover:text-white transition-colors text-sm px-1"
        aria-label="Previous step"
      >
        ◀
      </button>
      <span className="text-xs text-gray-500 tabular-nums min-w-[3ch] text-center">
        {step + 1}/{totalSteps}
      </span>
      <button
        onClick={onNext}
        className="text-gray-500 hover:text-white transition-colors text-sm px-1"
        aria-label="Next step"
      >
        ▶
      </button>
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="text-gray-500 hover:text-white transition-colors text-sm px-1"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  );
}
