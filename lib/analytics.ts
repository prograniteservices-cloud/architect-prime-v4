let posthog: any = null;
let isInitialized = false;

export function initAnalytics(apiKey: string): void {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;

  try {
    import('posthog-js').then(({ default: PostHog }) => {
      posthog = PostHog.init(apiKey, {
        api_host: 'https://app.posthog.com',
        capture_pageview: false,
        capture_pageleave: true,
        loaded: (ph) => {
          posthog = ph;
          isInitialized = true;
        },
      });
    });
  } catch (error) {
    console.error('Error initializing PostHog:', error);
  }
}

export function captureEvent(eventName: string, properties?: Record<string, any>): void {
  if (!posthog || !isInitialized) return;

  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    console.error('Error capturing event:', error);
  }
}

export function identifyUser(userId: string, properties?: Record<string, any>): void {
  if (!posthog || !isInitialized) return;

  try {
    posthog.identify(userId, properties);
  } catch (error) {
    console.error('Error identifying user:', error);
  }
}

export function capturePageView(): void {
  if (!posthog || !isInitialized) return;

  try {
    posthog.capture('$pageview');
  } catch (error) {
    console.error('Error capturing page view:', error);
  }
}

export function resetUser(): void {
  if (!posthog || !isInitialized) return;

  try {
    posthog.reset();
  } catch (error) {
    console.error('Error resetting user:', error);
  }
}

// Specific event types for Architect Prime
export const AnalyticsEvents = {
  // Questionnaire events
  QUESTIONNAIRE_STARTED: 'questionnaire_started',
  QUESTIONNAIRE_COMPLETED: 'questionnaire_completed',
  STEP_NAVIGATED: 'step_navigated',
  SECTION_COMPLETED: 'section_completed',

  // Template events
  TEMPLATE_SELECTED: 'template_selected',
  TEMPLATE_APPLIED: 'template_applied',

  // Form events
  FIELD_CHANGED: 'field_changed',
  FORM_VALIDATED: 'form_validated',
  FORM_ERROR: 'form_error',

  // Export events
  PROMPT_GENERATED: 'prompt_generated',
  PROMPT_COPIED: 'prompt_copied',
  PROMPT_DOWNLOADED: 'prompt_downloaded',
  EXPORT_FORMAT_SELECTED: 'export_format_selected',

  // Feature events
  PREVIEW_TOGGLED: 'preview_toggled',
  THEME_TOGGLED: 'theme_toggled',
  VOICE_INPUT_TOGGLED: 'voice_input_toggled',
  COMMAND_PALETTE_OPENED: 'command_palette_opened',
  KEYBOARD_SHORTCUT_USED: 'keyboard_shortcut_used',

  // Mode events
  FOCUS_MODE_TOGGLED: 'focus_mode_toggled',
  ZEN_MODE_TOGGLED: 'zen_mode_toggled',
  HIGH_CONTRAST_TOGGLED: 'high_contrast_toggled',

  // Save events
  AUTOSAVE_TRIGGERED: 'autosave_triggered',
  MANUAL_SAVE: 'manual_save',
  DESKTOP_SAVE: 'desktop_save',

  // Undo/Redo events
  UNDO_PERFORMED: 'undo_performed',
  REDO_PERFORMED: 'redo_performed',

  // Suggestion events
  SUGGESTION_ACCEPTED: 'suggestion_accepted',
  SUGGESTION_DISMISSED: 'suggestion_dismissed',

  // Difficulty events
  DIFFICULTY_CHANGED: 'difficulty_changed',
} as const;

// Convenience functions for common events
export function trackQuestionnaireStarted(template?: string): void {
  captureEvent(AnalyticsEvents.QUESTIONNAIRE_STARTED, { template });
}

export function trackQuestionnaireCompleted(duration: number, sections: number): void {
  captureEvent(AnalyticsEvents.QUESTIONNAIRE_COMPLETED, { duration, sections });
}

export function trackStepNavigated(from: number, to: number): void {
  captureEvent(AnalyticsEvents.STEP_NAVIGATED, { from, to });
}

export function trackSectionCompleted(section: number, sectionName: string): void {
  captureEvent(AnalyticsEvents.SECTION_COMPLETED, { section, sectionName });
}

export function trackTemplateSelected(templateId: string, templateName: string): void {
  captureEvent(AnalyticsEvents.TEMPLATE_SELECTED, { templateId, templateName });
}

export function trackPromptGenerated(length: number, difficulty: string): void {
  captureEvent(AnalyticsEvents.PROMPT_GENERATED, { length, difficulty });
}

export function trackPromptCopied(): void {
  captureEvent(AnalyticsEvents.PROMPT_COPIED);
}

export function trackPromptDownloaded(format: string): void {
  captureEvent(AnalyticsEvents.PROMPT_DOWNLOADED, { format });
}

export function trackExportFormatSelected(format: string): void {
  captureEvent(AnalyticsEvents.EXPORT_FORMAT_SELECTED, { format });
}

export function trackThemeToggled(theme: string): void {
  captureEvent(AnalyticsEvents.THEME_TOGGLED, { theme });
}

export function trackDifficultyChanged(difficulty: string): void {
  captureEvent(AnalyticsEvents.DIFFICULTY_CHANGED, { difficulty });
}

export function trackKeyboardShortcutUsed(shortcut: string): void {
  captureEvent(AnalyticsEvents.KEYBOARD_SHORTCUT_USED, { shortcut });
}

export function trackCommandPaletteOpened(): void {
  captureEvent(AnalyticsEvents.COMMAND_PALETTE_OPENED);
}

export function trackPreviewToggled(enabled: boolean): void {
  captureEvent(AnalyticsEvents.PREVIEW_TOGGLED, { enabled });
}

export function trackFocusModeToggled(enabled: boolean): void {
  captureEvent(AnalyticsEvents.FOCUS_MODE_TOGGLED, { enabled });
}

export function trackZenModeToggled(enabled: boolean): void {
  captureEvent(AnalyticsEvents.ZEN_MODE_TOGGLED, { enabled });
}

export function trackVoiceInputToggled(enabled: boolean): void {
  captureEvent(AnalyticsEvents.VOICE_INPUT_TOGGLED, { enabled });
}

export function trackSuggestionAccepted(field: string, suggestion: string): void {
  captureEvent(AnalyticsEvents.SUGGESTION_ACCEPTED, { field, suggestion });
}

export function trackUndoPerformed(): void {
  captureEvent(AnalyticsEvents.UNDO_PERFORMED);
}

export function trackRedoPerformed(): void {
  captureEvent(AnalyticsEvents.REDO_PERFORMED);
}

export function trackManualSave(): void {
  captureEvent(AnalyticsEvents.MANUAL_SAVE);
}

export function trackDesktopSave(): void {
  captureEvent(AnalyticsEvents.DESKTOP_SAVE);
}
