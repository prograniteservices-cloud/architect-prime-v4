import type { KeyboardShortcut, Command } from '@/types';

export const keyboardShortcuts: KeyboardShortcut[] = [
  // Navigation
  { keys: 'ArrowLeft', description: 'Previous section', category: 'navigation' },
  { keys: 'ArrowRight', description: 'Next section', category: 'navigation' },
  { keys: 'ArrowUp', description: 'Previous field', category: 'navigation' },
  { keys: 'ArrowDown', description: 'Next field', category: 'navigation' },
  { keys: 'Tab', description: 'Next field', category: 'navigation' },
  { keys: 'Shift + Tab', description: 'Previous field', category: 'navigation' },
  { keys: 'Escape', description: 'Close modal/dialog/preview', category: 'navigation' },

  // Actions
  { keys: '⌘ / Ctrl + S', description: 'Save progress', category: 'actions' },
  { keys: '⌘ / Ctrl + K', description: 'Open command palette', category: 'actions' },
  { keys: '⌘ / Ctrl + /', description: 'Show keyboard shortcuts', category: 'actions' },
  { keys: '⌘ / Ctrl + P', description: 'Toggle preview', category: 'actions' },
  { keys: '⌘ / Ctrl + Z', description: 'Undo', category: 'actions' },
  { keys: '⌘ / Ctrl + Shift + Z', description: 'Redo', category: 'actions' },
  { keys: '⌘ / Ctrl + Shift + S', description: 'Export menu', category: 'actions' },
  { keys: '⌘ / Ctrl + C', description: 'Copy to clipboard (output)', category: 'actions' },
  { keys: '⌘ / Ctrl + D', description: 'Toggle dark/light theme', category: 'actions' },
  { keys: '⌘ / Ctrl + F', description: 'Toggle focus mode', category: 'actions' },
  { keys: '⌘ / Ctrl + Shift + F', description: 'Toggle zen mode', category: 'actions' },
];

export function isCommandKey(event: KeyboardEvent): boolean {
  return event.metaKey || event.ctrlKey;
}

export function getShortcutLabel(keys: string): string {
  return keys
    .replace('⌘', 'Cmd')
    .replace('Ctrl', 'Ctrl')
    .replace('Shift', 'Shift')
    .replace('Alt', 'Alt');
}

export function handleKeyboardShortcuts(
  event: KeyboardEvent,
  actions: {
    nextStep: () => void;
    prevStep: () => void;
    saveProgress: () => void;
    openCommandPalette: () => void;
    togglePreview: () => void;
    toggleTheme: () => void;
    undo: () => void;
    redo: () => void;
    openShortcuts: () => void;
    toggleFocusMode: () => void;
    toggleZenMode: () => void;
    exportPrompt: () => void;
  }
): boolean {
  // Check if user is typing in an input/textarea
  const target = event.target as HTMLElement;
  const isTyping = 
    target.tagName === 'INPUT' || 
    target.tagName === 'TEXTAREA' || 
    target.isContentEditable;

  const isCommandKey = isCommandKey(event);

  // Escape key
  if (event.key === 'Escape') {
    if (!isTyping) {
      return true;
    }
  }

  // Command palette
  if (isCommandKey && event.key === 'k') {
    event.preventDefault();
    actions.openCommandPalette();
    return true;
  }

  // Save
  if (isCommandKey && event.key === 's') {
    event.preventDefault();
    actions.saveProgress();
    return true;
  }

  // Undo
  if (isCommandKey && event.key === 'z' && !event.shiftKey) {
    event.preventDefault();
    actions.undo();
    return true;
  }

  // Redo
  if (isCommandKey && event.key === 'z' && event.shiftKey) {
    event.preventDefault();
    actions.redo();
    return true;
  }

  // Preview
  if (isCommandKey && event.key === 'p') {
    event.preventDefault();
    actions.togglePreview();
    return true;
  }

  // Theme
  if (isCommandKey && event.key === 'd') {
    event.preventDefault();
    actions.toggleTheme();
    return true;
  }

  // Focus mode
  if (isCommandKey && event.key === 'f') {
    event.preventDefault();
    actions.toggleFocusMode();
    return true;
  }

  // Zen mode
  if (isCommandKey && event.key === 'f' && event.shiftKey) {
    event.preventDefault();
    actions.toggleZenMode();
    return true;
  }

  // Export
  if (isCommandKey && event.key === 's' && event.shiftKey) {
    event.preventDefault();
    actions.exportPrompt();
    return true;
  }

  // Shortcuts
  if (isCommandKey && event.key === '/') {
    event.preventDefault();
    actions.openShortcuts();
    return true;
  }

  // Navigation (only when not typing)
  if (!isTyping) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      actions.nextStep();
      return true;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      actions.prevStep();
      return true;
    }
  }

  return false;
}

export function useKeyboardShortcuts(actions: {
  nextStep: () => void;
  prevStep: () => void;
  saveProgress: () => void;
  openCommandPalette: () => void;
  togglePreview: () => void;
  toggleTheme: () => void;
  undo: () => void;
  redo: () => void;
  openShortcuts: () => void;
  toggleFocusMode: () => void;
  toggleZenMode: () => void;
  exportPrompt: () => void;
}) {
  if (typeof window === 'undefined') return;

  const handler = (event: KeyboardEvent) => {
    handleKeyboardShortcuts(event, actions);
  };

  window.addEventListener('keydown', handler);

  return () => {
    window.removeEventListener('keydown', handler);
  };
}

// Command palette actions
export function generateCommands(
  actions: {
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    saveProgress: () => void;
    exportPrompt: () => void;
    togglePreview: () => void;
    copyPrompt: () => void;
    toggleTheme: () => void;
    toggleFocusMode: () => void;
    toggleZenMode: () => void;
    restart: () => void;
    openShortcuts: () => void;
    openDocs: () => void;
  }
): Command[] {
  const commands: Command[] = [
    // Navigation
    {
      id: 'goto-1',
      label: 'Go to: Project Vision',
      shortcut: 'G 1',
      action: () => actions.goToStep(0),
      category: 'navigation',
    },
    {
      id: 'goto-2',
      label: 'Go to: Branding',
      shortcut: 'G 2',
      action: () => actions.goToStep(1),
      category: 'navigation',
    },
    {
      id: 'goto-3',
      label: 'Go to: Product Type',
      shortcut: 'G 3',
      action: () => actions.goToStep(2),
      category: 'navigation',
    },
    {
      id: 'goto-4',
      label: 'Go to: Features',
      shortcut: 'G 4',
      action: () => actions.goToStep(3),
      category: 'navigation',
    },
    {
      id: 'goto-5',
      label: 'Go to: Backend',
      shortcut: 'G 5',
      action: () => actions.goToStep(4),
      category: 'navigation',
    },
    {
      id: 'goto-6',
      label: 'Go to: Pages',
      shortcut: 'G 6',
      action: () => actions.goToStep(5),
      category: 'navigation',
    },
    {
      id: 'goto-7',
      label: 'Go to: Design',
      shortcut: 'G 7',
      action: () => actions.goToStep(6),
      category: 'navigation',
    },
    {
      id: 'goto-8',
      label: 'Go to: Tech Stack',
      shortcut: 'G 8',
      action: () => actions.goToStep(7),
      category: 'navigation',
    },
    {
      id: 'goto-9',
      label: 'Go to: Additional',
      shortcut: 'G 9',
      action: () => actions.goToStep(8),
      category: 'navigation',
    },
    {
      id: 'goto-10',
      label: 'Go to: Output',
      shortcut: 'G 0',
      action: () => actions.goToStep(9),
      category: 'navigation',
    },

    // Actions
    {
      id: 'next',
      label: 'Next Section',
      shortcut: 'ArrowRight',
      action: () => actions.nextStep(),
      category: 'actions',
    },
    {
      id: 'prev',
      label: 'Previous Section',
      shortcut: 'ArrowLeft',
      action: () => actions.prevStep(),
      category: 'actions',
    },
    {
      id: 'save',
      label: 'Save Progress',
      shortcut: '⌘ S',
      action: () => actions.saveProgress(),
      category: 'actions',
    },
    {
      id: 'export',
      label: 'Export Prompt',
      shortcut: '⌘ ⇧ S',
      action: () => actions.exportPrompt(),
      category: 'actions',
    },
    {
      id: 'preview',
      label: 'Toggle Preview',
      shortcut: '⌘ P',
      action: () => actions.togglePreview(),
      category: 'actions',
    },
    {
      id: 'copy',
      label: 'Copy to Clipboard',
      shortcut: '⌘ C',
      action: () => actions.copyPrompt(),
      category: 'actions',
    },
    {
      id: 'theme',
      label: 'Toggle Theme',
      shortcut: '⌘ D',
      action: () => actions.toggleTheme(),
      category: 'actions',
    },
    {
      id: 'focus',
      label: 'Toggle Focus Mode',
      shortcut: '⌘ F',
      action: () => actions.toggleFocusMode(),
      category: 'actions',
    },
    {
      id: 'zen',
      label: 'Toggle Zen Mode',
      shortcut: '⌘ ⇧ F',
      action: () => actions.toggleZenMode(),
      category: 'actions',
    },
    {
      id: 'restart',
      label: 'Restart Questionnaire',
      shortcut: '',
      action: () => actions.restart(),
      category: 'actions',
    },

    // Help
    {
      id: 'shortcuts',
      label: 'Keyboard Shortcuts',
      shortcut: '⌘ /',
      action: () => actions.openShortcuts(),
      category: 'help',
    },
    {
      id: 'docs',
      label: 'Documentation',
      shortcut: '',
      action: () => actions.openDocs(),
      category: 'help',
    },
  ];

  return commands;
}
