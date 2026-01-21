"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { ProgressBar, ProgressIndicator } from "@/components/progress/progress-bar";
import { StepDots } from "@/components/progress/step-dots";
import { QuestionCard } from "@/components/questionnaire/question-card";
import { TemplateSelector } from "@/components/questionnaire/template-selector";
import { Section1Vision } from "@/components/questionnaire/sections/section-1-vision";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { generatePrompt } from "@/lib/prompt-generator";
import { downloadPrompt, saveToDesktop, copyToClipboard } from "@/lib/export-helpers";
import { Download, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    currentStep,
    nextStep,
    prevStep,
    formData,
    primaryColor,
    isComplete,
    setComplete,
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Set primary color on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [primaryColor]);

  const sections = [
    {
      step: 0,
      title: "Get Started",
      description: "Choose a template or start from scratch",
      component: <TemplateSelector />,
    },
    {
      step: 1,
      title: "Project Vision & Identity",
      description: "Define your app's purpose, audience, and unique value proposition",
      component: <Section1Vision />,
    },
  ];

  const handleGenerate = async () => {
    setComplete(true);
    setDownloading(false);
  };

  const handleCopy = async () => {
    const prompt = generatePrompt(formData);
    const success = await copyToClipboard(prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async (format: "markdown" | "json" | "plaintext" | "html") => {
    const prompt = generatePrompt(formData);
    setDownloading(true);
    downloadPrompt(prompt, format, formData.appName.replace(/\s+/g, "-").toLowerCase() || "prompt");
    setTimeout(() => setDownloading(false), 1000);
  };

  const handleSaveToDesktop = async () => {
    const prompt = generatePrompt(formData);
    await saveToDesktop(prompt, formData);
  };

  const renderSection = () => {
    const currentSection = sections.find((s) => s.step === currentStep);
    if (!currentSection) return null;

    return (
      <QuestionCard
        title={currentSection.title}
        description={currentSection.description}
        stepNumber={currentSection.step}
        totalSteps={sections.length}
        onNext={currentStep < sections.length - 1 ? nextStep : handleGenerate}
        onBack={currentStep > 0 ? prevStep : undefined}
        canGoNext={currentStep < sections.length - 1}
        canGoBack={currentStep > 0}
        isValid={formData.appName.length > 0}
      >
        {currentSection.component}
      </QuestionCard>
    );
  };

  const renderOutput = () => {
    const prompt = generatePrompt(formData);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[900px] mx-auto space-y-6"
      >
        <div className="glass rounded-2xl border border-[var(--primary-color)]/20 p-6">
          <h2 className="mb-4 text-2xl font-bold text-[var(--primary-color)]">
            🎉 Your Prompt is Ready!
          </h2>
          
          <div className="mb-6 space-y-2">
            <p className="text-white/70">
              Your detailed prompt has been generated based on all your specifications.
              You can copy, download, or save it to your desktop.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCopy}
              className="flex-1"
            >
              <Copy className="mr-2 h-5 w-5" />
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSaveToDesktop}
              className="flex-1"
              disabled={downloading}
            >
              <Download className="mr-2 h-5 w-5" />
              {downloading ? "Saving..." : "Save to Desktop"}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleDownload("markdown")}
              className="flex-1"
              disabled={downloading}
            >
              <Download className="mr-2 h-5 w-5" />
              Download .md
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleDownload("json")}
              className="flex-1"
              disabled={downloading}
            >
              <Download className="mr-2 h-5 w-5" />
              Download .json
            </Button>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6">
          <pre className="overflow-x-auto rounded-xl bg-black/50 p-4 text-sm text-white/90">
            <code>{prompt}</code>
          </pre>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <ProgressBar />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Architect Prime <span style={{ color: primaryColor }}>V3</span>
            </h1>
            {!isComplete && <ProgressIndicator />}
          </div>

          <ThemeToggle />
        </div>
      </header>

      <main className="min-h-[calc(100vh-73px)] px-4 py-12">
        <div className="mb-6 flex justify-center">
          <StepDots />
        </div>

        <div className="mx-auto">
          {isComplete ? renderOutput() : renderSection()}
        </div>
      </main>
    </div>
  );
}
