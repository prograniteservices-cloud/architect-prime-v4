"use client";

import { useAppStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Section1Vision() {
  const { formData, updateFormDataField } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="appName">
          App/Product Name <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Input
          id="appName"
          placeholder="e.g., TaskFlow Pro"
          value={formData.appName}
          onChange={(e) => updateFormDataField("appName", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">
          Tagline/One-liner <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Input
          id="tagline"
          placeholder="e.g., The smartest way to manage your tasks"
          value={formData.tagline}
          onChange={(e) => updateFormDataField("tagline", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="elevatorPitch">
          Elevator Pitch (3-5 sentences) <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Textarea
          id="elevatorPitch"
          placeholder="Describe what your app does in a compelling way..."
          value={formData.elevatorPitch}
          onChange={(e) => updateFormDataField("elevatorPitch", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="problemSolved">
          Problem Solved <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Textarea
          id="problemSolved"
          placeholder="What problem does your app solve for your users?"
          value={formData.problemSolved}
          onChange={(e) => updateFormDataField("problemSolved", e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitiveAdvantage">
          Competitive Advantage <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Textarea
          id="competitiveAdvantage"
          placeholder="What makes your app unique? Why should users choose you?"
          value={formData.competitiveAdvantage}
          onChange={(e) => updateFormDataField("competitiveAdvantage", e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">
          Target Audience <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Textarea
          id="targetAudience"
          placeholder="Describe your target users: demographics, roles, pain points..."
          value={formData.targetAudience}
          onChange={(e) => updateFormDataField("targetAudience", e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitors">
          Competitors <span className="text-white/40">(Optional)</span>
        </Label>
        <Textarea
          id="competitors"
          placeholder="Who are your main competitors? What are they doing well/poorly?"
          value={formData.competitors}
          onChange={(e) => updateFormDataField("competitors", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty">
          Difficulty Level <span className="text-[var(--primary-color)]">*</span>
        </Label>
        <Select
          value={formData.difficulty}
          onValueChange={(value) => updateFormDataField("difficulty", value as "beginner" | "advanced" | "expert")}
        >
          <SelectTrigger id="difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner - Clear, basic instructions</SelectItem>
            <SelectItem value="advanced">Advanced - Detailed with best practices</SelectItem>
            <SelectItem value="expert">Expert - Comprehensive with edge cases</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
