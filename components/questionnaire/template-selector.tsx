"use client";

import { useAppStore } from "@/lib/store";
import { templates } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, ShoppingCart, Layout, BarChart, Image as ImageIcon } from "lucide-react";

const templateIcons = {
  "saas-mvp": Rocket,
  "ecommerce": ShoppingCart,
  "landing-page": Layout,
  "dashboard": BarChart,
  "portfolio": ImageIcon,
};

export function TemplateSelector() {
  const { applyTemplate, goToStep, primaryColor } = useAppStore();

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      applyTemplate(template);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-white">
          Architect Prime <span style={{ color: primaryColor }}>V3</span>
        </h1>
        <p className="text-lg text-white/70">
          Choose a template to get started fast, or build from scratch
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map(template => {
          const Icon = templateIcons[template.id as keyof typeof templateIcons] || Layout;
          
          return (
            <Card
              key={template.id}
              className="cursor-pointer transition-all hover:scale-[1.02] hover:border-[var(--primary-color)] hover:shadow-lg hover:shadow-[var(--primary-color)]/10"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: primaryColor }} />
                  </div>
                  <Badge variant="secondary">
                    {template.category.replace(/-/g, ' ').toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">{template.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => goToStep(1)}
          className="w-full md:w-auto"
        >
          Start from Scratch
        </Button>
      </div>
    </div>
  );
}
