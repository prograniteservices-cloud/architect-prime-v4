"use client";

import { useAppStore } from "@/lib/store";

export function ProgressBar() {
  const { currentStep, totalSteps, primaryColor } = useAppStore();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: primaryColor,
        }}
      />
    </div>
  );
}

export function ProgressIndicator() {
  const { currentStep, totalSteps } = useAppStore();

  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      <span className="font-semibold text-[var(--primary-color)]">
        {currentStep + 1}
      </span>
      <span>/</span>
      <span>{totalSteps}</span>
      <span className="ml-2">
        ({Math.round(((currentStep + 1) / totalSteps) * 100)}%)
      </span>
    </div>
  );
}
