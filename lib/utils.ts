import LZString from 'lz-string';
import { SiteContent, defaultContent } from '@/data/siteContent';

/**
 * Encode site content into a URL-safe compressed string
 */
export function encodeContent(content: SiteContent): string {
  const json = JSON.stringify(content);
  return LZString.compressToEncodedURIComponent(json);
}

/**
 * Decode content from URL-safe compressed string
 */
export function decodeContent(encoded: string): SiteContent | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as SiteContent;
  } catch {
    return null;
  }
}

/**
 * Generate a shareable URL from content
 */
export function generateShareableUrl(content: SiteContent): string {
  const encoded = encodeContent(content);
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/?data=${encoded}`;
}

/**
 * Read content from URL params (client-side only)
 */
export function readContentFromUrl(): SiteContent | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const data = params.get('data');
  if (!data) return null;
  return decodeContent(data);
}

/**
 * Get WhatsApp share URL
 */
export function getWhatsAppUrl(shareUrl: string, motherName: string): string {
  const message = `🌸 Happy Mother's Day, ${motherName}! I made something special just for you 💕\n\n${shareUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/**
 * Compress image to base64 with max dimensions
 */
export async function compressImage(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Get balloon color gradient
 */
export function getBalloonGradient(color: string): string {
  const gradients: Record<string, string> = {
    rose: 'linear-gradient(135deg, #e8a0a0 0%, #c96b6b 100%)',
    peach: 'linear-gradient(135deg, #ffd4b3 0%, #f5a077 100%)',
    lavender: 'linear-gradient(135deg, #c9a8e0 0%, #9b72c8 100%)',
    sky: 'linear-gradient(135deg, #a8d8f0 0%, #5bacd4 100%)',
    mint: 'linear-gradient(135deg, #a8e6cf 0%, #56b487 100%)',
    gold: 'linear-gradient(135deg, #f5d592 0%, #d4a853 100%)',
    coral: 'linear-gradient(135deg, #ff9a8b 0%, #e05d4b 100%)',
  };
  return gradients[color] || gradients.rose;
}

export function getBalloonHighlight(color: string): string {
  const highlights: Record<string, string> = {
    rose: 'rgba(255, 200, 200, 0.6)',
    peach: 'rgba(255, 220, 180, 0.6)',
    lavender: 'rgba(220, 195, 240, 0.6)',
    sky: 'rgba(180, 225, 250, 0.6)',
    mint: 'rgba(180, 230, 210, 0.6)',
    gold: 'rgba(250, 230, 160, 0.6)',
    coral: 'rgba(255, 180, 165, 0.6)',
  };
  return highlights[color] || highlights.rose;
}

/**
 * Get content to display — from URL or defaults
 */
export function getDisplayContent(): SiteContent {
  const urlContent = readContentFromUrl();
  return urlContent || defaultContent;
}
