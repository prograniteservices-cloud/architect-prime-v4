"use client";

import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StepDots() {
  const { currentStep, totalSteps, goToStep } = useAppStore();

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToStep(index)}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-all duration-300",
            currentStep === index
              ? "bg-[var(--primary-color)] scale-125"
              : "bg-white/20 hover:bg-white/40"
          )}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  );
}
