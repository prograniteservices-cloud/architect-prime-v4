import type { ExportFormat, FormData } from '@/types';

export function formatPrompt(prompt: string, format: ExportFormat, formData: FormData): string {
  switch (format) {
    case 'markdown':
      return formatMarkdown(prompt, formData);
    case 'json':
      return formatJson(prompt, formData);
    case 'plaintext':
      return formatPlaintext(prompt, formData);
    case 'html':
      return formatHtml(prompt, formData);
    default:
      return prompt;
  }
}

function formatMarkdown(prompt: string, formData: FormData): string {
  return prompt;
}

function formatJson(prompt: string, formData: FormData): string {
  const jsonOutput = {
    metadata: {
      appName: formData.appName,
      tagline: formData.tagline,
      createdAt: new Date().toISOString(),
      version: '3.0',
      difficulty: formData.difficulty,
    },
    formData: formData,
    prompt: prompt,
  };

  return JSON.stringify(jsonOutput, null, 2);
}

function formatPlaintext(prompt: string, formData: FormData): string {
  // Remove markdown formatting
  let plaintext = prompt
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/^- /gm, '• ')
    .replace(/##\s+/g, '\n')
    .replace(/#([A-Z])\s+/g, '\n\n$1: ');

  return plaintext.trim();
}

function formatHtml(prompt: string, formData: FormData): string {
  // Convert markdown to HTML
  let html = prompt
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Code
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Bullet points
    .replace(/^- (.*)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br>');

  // Wrap in HTML document
  const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.appName} - Architect Prime V3 Prompt</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #0a0a0f;
      color: #f0f0f0;
    }
    h1, h2, h3 {
      color: ${formData.primaryColor};
      margin-top: 2em;
      margin-bottom: 1em;
    }
    h1 {
      border-bottom: 2px solid ${formData.primaryColor};
      padding-bottom: 0.5em;
    }
    strong {
      color: ${formData.primaryColor};
    }
    code {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    li {
      margin: 0.5em 0;
      margin-left: 1.5em;
    }
    p {
      margin: 1em 0;
    }
    hr {
      border: none;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      margin: 2em 0;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

  return htmlDocument;
}

export function downloadPrompt(content: string, format: ExportFormat, filename: string): void {
  const mimeType = getMimeType(format);
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.${format === 'plaintext' ? 'txt' : format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getMimeType(format: ExportFormat): string {
  switch (format) {
    case 'markdown':
      return 'text/markdown';
    case 'json':
      return 'application/json';
    case 'plaintext':
      return 'text/plain';
    case 'html':
      return 'text/html';
    default:
      return 'text/plain';
  }
}

export async function saveToDesktop(prompt: string, formData: FormData): Promise<void> {
  const projectName = formData.appName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const timestamp = new Date().toISOString().split('T')[0];
  
  const files = {
    'prompt.md': formatPrompt(prompt, 'markdown', formData),
    'prompt.json': formatPrompt(prompt, 'json', formData),
    'prompt.txt': formatPrompt(prompt, 'plaintext', formData),
    'prompt.html': formatPrompt(prompt, 'html', formData),
  };

  // Check if File System Access API is supported
  if ('showDirectoryPicker' in window) {
    try {
      const dirHandle = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
        startIn: 'desktop',
      });

      const projectDirName = `${projectName}-${timestamp}`;
      const projectDir = await dirHandle.getDirectoryHandle(projectDirName, { create: true });

      for (const [filename, content] of Object.entries(files)) {
        const fileHandle = await projectDir.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
      }

      console.log('Project saved successfully to:', projectDirName);
    } catch (error) {
      console.error('Error saving to desktop:', error);
      // Fallback: download files individually
      Object.entries(files).forEach(([filename, content]) => {
        const format = filename.split('.')[1] as ExportFormat;
        downloadPrompt(content, format, `${projectName}-${timestamp}-${filename}`);
      });
    }
  } else {
    // Fallback: download files individually
    Object.entries(files).forEach(([filename, content]) => {
      const format = filename.split('.')[1] as ExportFormat;
      downloadPrompt(content, format, `${projectName}-${timestamp}-${filename}`);
    });
  }
}

export function encodeToUrl(formData: FormData): string {
  const jsonString = JSON.stringify(formData);
  const base64 = btoa(jsonString);
  return base64;
}

export function decodeFromUrl(encoded: string): FormData | null {
  try {
    const jsonString = atob(encoded);
    return JSON.parse(jsonString) as FormData;
  } catch (error) {
    console.error('Error decoding URL state:', error);
    return null;
  }
}

export function generateShareableUrl(formData: FormData, baseUrl: string): string {
  const encoded = encodeToUrl(formData);
  return `${baseUrl}?data=${encodeURIComponent(encoded)}`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch((error) => {
      console.error('Error copying to clipboard:', error);
      return false;
    });
}

export function emailPrompt(prompt: string, formData: FormData): void {
  const subject = encodeURIComponent(`Prompt for ${formData.appName} - Architect Prime V3`);
  const body = encodeURIComponent(prompt);
  
  const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
}
