import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type {
  AppState,
  FormData,
  Template,
  DifficultyLevel,
  Theme,
  BackgroundStyle,
  ExportFormat,
} from '@/types';
import { defaultFormData } from './defaults';
import { totalSteps } from './constants';

interface AppActions {
  // Form data actions
  setFormData: (data: Partial<FormData>) => void;
  updateFormDataField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;

  // Step navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setCurrentStep: (step: number) => void;

  // Completion
  setComplete: (complete: boolean) => void;

  // Theme actions
  setPrimaryColor: (color: string) => void;
  setTheme: (theme: Theme) => void;
  setBackgroundStyle: (style: BackgroundStyle) => void;

  // Difficulty
  setDifficulty: (level: DifficultyLevel) => void;

  // Template
  setTemplate: (template: Template | null) => void;
  applyTemplate: (template: Template) => void;

  // Features
  setAutosaveEnabled: (enabled: boolean) => void;
  setVoiceEnabled: (enabled: boolean) => void;

  // Preview
  setPreviewMode: (enabled: boolean) => void;
  setPreviewSection: (section: string | null) => void;

  // Modes
  setFocusMode: (enabled: boolean) => void;
  setZenMode: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;

  // Analytics
  setAnalyticsEnabled: (enabled: boolean) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;

  // Reset
  reset: () => void;
  resetToDefaults: () => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      formData: defaultFormData,
      formDataHistory: [defaultFormData],
      historyIndex: 0,
      currentStep: 0,
      totalSteps,
      isComplete: false,
      milestones: [],
      primaryColor: '#8B5CF6',
      theme: 'dark',
      backgroundStyle: 'gradient',
      difficulty: 'intermediate',
      template: null,
      autosaveEnabled: true,
      lastSavedAt: null,
      voiceEnabled: false,
      previewMode: false,
      previewSection: null,
      focusMode: false,
      zenMode: false,
      highContrast: false,
      analyticsEnabled: true,

      // Form data actions
      setFormData: (data) =>
        set((state) => {
          Object.assign(state.formData, data);
          state.lastSavedAt = new Date();
        }),

      updateFormDataField: (field, value) =>
        set((state) => {
          state.formData[field] = value;
          state.lastSavedAt = new Date();
        }),

      // Step navigation
      nextStep: () =>
        set((state) => {
          if (state.currentStep < state.totalSteps - 1) {
            state.currentStep += 1;
          }
        }),

      prevStep: () =>
        set((state) => {
          if (state.currentStep > 0) {
            state.currentStep -= 1;
          }
        }),

      goToStep: (step) =>
        set((state) => {
          if (step >= 0 && step < state.totalSteps) {
            state.currentStep = step;
          }
        }),

      setCurrentStep: (step) =>
        set((state) => {
          state.currentStep = step;
        }),

      // Completion
      setComplete: (complete) =>
        set((state) => {
          state.isComplete = complete;
        }),

      // Theme actions
      setPrimaryColor: (color) =>
        set((state) => {
          state.primaryColor = color;
        }),

      setTheme: (theme) =>
        set((state) => {
          state.theme = theme;
        }),

      setBackgroundStyle: (style) =>
        set((state) => {
          state.backgroundStyle = style;
        }),

      // Difficulty
      setDifficulty: (level) =>
        set((state) => {
          state.difficulty = level;
        }),

      // Template
      setTemplate: (template) =>
        set((state) => {
          state.template = template;
        }),

      applyTemplate: (template) =>
        set((state) => {
          state.template = template;
          state.formData = {
            ...defaultFormData,
            ...template.prefillData,
          };
          state.currentStep = 1; // Skip template selector
        }),

      // Features
      setAutosaveEnabled: (enabled) =>
        set((state) => {
          state.autosaveEnabled = enabled;
        }),

      setVoiceEnabled: (enabled) =>
        set((state) => {
          state.voiceEnabled = enabled;
        }),

      // Preview
      setPreviewMode: (enabled) =>
        set((state) => {
          state.previewMode = enabled;
        }),

      setPreviewSection: (section) =>
        set((state) => {
          state.previewSection = section;
        }),

      // Modes
      setFocusMode: (enabled) =>
        set((state) => {
          state.focusMode = enabled;
        }),

      setZenMode: (enabled) =>
        set((state) => {
          state.zenMode = enabled;
        }),

      setHighContrast: (enabled) =>
        set((state) => {
          state.highContrast = enabled;
        }),

      // Analytics
      setAnalyticsEnabled: (enabled) =>
        set((state) => {
          state.analyticsEnabled = enabled;
        }),

      // Undo/Redo
      saveToHistory: () =>
        set((state) => {
          // Remove any future history if we're not at the end
          const newHistory = state.formDataHistory.slice(0, state.historyIndex + 1);
          newHistory.push({ ...state.formData });
          
          // Limit history to 50 items
          if (newHistory.length > 50) {
            newHistory.shift();
          }
          
          state.formDataHistory = newHistory;
          state.historyIndex = newHistory.length - 1;
        }),

      undo: () =>
        set((state) => {
          if (state.historyIndex > 0) {
            state.historyIndex -= 1;
            state.formData = { ...state.formDataHistory[state.historyIndex] };
          }
        }),

      redo: () =>
        set((state) => {
          if (state.historyIndex < state.formDataHistory.length - 1) {
            state.historyIndex += 1;
            state.formData = { ...state.formDataHistory[state.historyIndex] };
          }
        }),

      // Reset
      reset: () =>
        set(() => ({
          formData: defaultFormData,
          formDataHistory: [defaultFormData],
          historyIndex: 0,
          currentStep: 0,
          isComplete: false,
          milestones: [],
          template: null,
          lastSavedAt: null,
        })),

      resetToDefaults: () =>
        set((state) => ({
          formData: defaultFormData,
          formDataHistory: [defaultFormData],
          historyIndex: 0,
          currentStep: 0,
          isComplete: false,
          milestones: [],
        })),
    })),
    {
      name: 'architect-prime-v3-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        primaryColor: state.primaryColor,
        theme: state.theme,
        backgroundStyle: state.backgroundStyle,
        difficulty: state.difficulty,
        autosaveEnabled: state.autosaveEnabled,
        voiceEnabled: state.voiceEnabled,
        analyticsEnabled: state.analyticsEnabled,
      }),
    }
  )
);
