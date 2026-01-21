import { useAppStore } from './store';
import type { FormData } from '@/types';

const AUTOSAVE_KEY = 'architect-prime-v3-autosave';
const AUTOSAVE_DEBOUNCE = 1000; // 1 second

let autosaveTimeout: NodeJS.Timeout | null = null;

export function setupAutosave() {
  if (typeof window === 'undefined') return;

  // Load autosaved data on mount
  loadAutosavedData();

  // Set up interval for periodic autosave
  setInterval(autosave, 30000); // Every 30 seconds
}

export function loadAutosavedData(): void {
  try {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      const store = useAppStore.getState();

      // Only restore if it's recent (within 7 days)
      const savedAt = new Date(data.savedAt);
      const now = new Date();
      const daysDiff = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60 * 24);

      if (daysDiff < 7 && confirm('Found autosaved data from ' + savedAt.toLocaleDateString() + '. Would you like to restore it?')) {
        store.setFormData(data.formData);
        store.setCurrentStep(data.currentStep);
        store.setPrimaryColor(data.primaryColor);
        store.setTheme(data.theme);
      }
    }
  } catch (error) {
    console.error('Error loading autosaved data:', error);
  }
}

export function scheduleAutosave(): void {
  if (autosaveTimeout) {
    clearTimeout(autosaveTimeout);
  }

  autosaveTimeout = setTimeout(autosave, AUTOSAVE_DEBOUNCE);
}

export function autosave(): void {
  try {
    const store = useAppStore.getState();
    
    if (!store.autosaveEnabled) return;

    const data = {
      formData: store.formData,
      currentStep: store.currentStep,
      primaryColor: store.primaryColor,
      theme: store.theme,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
    console.log('Autosaved at', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Error autosaving:', error);
  }
}

export function clearAutosavedData(): void {
  try {
    localStorage.removeItem(AUTOSAVE_KEY);
  } catch (error) {
    console.error('Error clearing autosaved data:', error);
  }
}

export function getAutosavedData(): { formData: FormData; currentStep: number; savedAt: string } | null {
  try {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      
      // Only return if it's recent (within 7 days)
      const savedAt = new Date(data.savedAt);
      const now = new Date();
      const daysDiff = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60 * 24);

      if (daysDiff < 7) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error getting autosaved data:', error);
  }
  
  return null;
}

// IndexedDB for offline support
const DB_NAME = 'ArchitectPrimeV3';
const DB_VERSION = 1;
const STORE_NAME = 'autosaves';

export async function initIndexedDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error opening IndexedDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('savedAt', 'savedAt', { unique: false });
      }
    };
  });
}

export async function saveToIndexedDB(data: {
  formData: FormData;
  currentStep: number;
  primaryColor: string;
  theme: string;
  savedAt: string;
}): Promise<void> {
  const db = await initIndexedDB();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id: 'current', ...data });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function loadFromIndexedDB(): Promise<{
  formData: FormData;
  currentStep: number;
  primaryColor: string;
  theme: string;
  savedAt: string;
} | null> {
  const db = await initIndexedDB();
  if (!db) return null;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('current');

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function clearIndexedDB(): Promise<void> {
  const db = await initIndexedDB();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete('current');

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Save history for undo/redo
const HISTORY_KEY = 'architect-prime-v3-history';
const MAX_HISTORY = 50;

export async function saveToHistory(formData: FormData): Promise<void> {
  try {
    const existing = localStorage.getItem(HISTORY_KEY);
    let history: { formData: FormData; savedAt: string }[] = existing 
      ? JSON.parse(existing) 
      : [];

    history.push({
      formData,
      savedAt: new Date().toISOString(),
    });

    // Limit history size
    if (history.length > MAX_HISTORY) {
      history = history.slice(-MAX_HISTORY);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

export async function getHistory(): Promise<{ formData: FormData; savedAt: string }[]> {
  try {
    const existing = localStorage.getItem(HISTORY_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

export async function clearHistory(): Promise<void> {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}
