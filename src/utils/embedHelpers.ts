export function normalizeEmbedUrl(rawUrl: string): string {
  const url = rawUrl.trim();
  if (!url) return '';

  try {
    const parsed = new URL(url);

    // YouTube watch / short links -> embed URL
    if (
      parsed.hostname.includes('youtube.com') &&
      parsed.pathname === '/watch' &&
      parsed.searchParams.get('v')
    ) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`;
    }
    if (parsed.hostname === 'youtu.be' && parsed.pathname.length > 1) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    // Google Drive file link -> preview URL
    if (
      parsed.hostname.includes('drive.google.com') &&
      parsed.pathname.includes('/file/d/')
    ) {
      const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      if (match?.[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    // Google Forms viewform -> embedded=true
    if (
      parsed.hostname.includes('docs.google.com') &&
      parsed.pathname.includes('/forms/') &&
      !parsed.searchParams.has('embedded')
    ) {
      parsed.searchParams.set('embedded', 'true');
      return parsed.toString();
    }

    // Canva design view -> embed param
    if (
      parsed.hostname.includes('canva.com') &&
      parsed.pathname.includes('/design/') &&
      !parsed.searchParams.has('embed')
    ) {
      parsed.searchParams.set('embed', '');
      return parsed.toString();
    }

    return url;
  } catch {
    return url;
  }
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Gagal membaca fail.'));
      }
    };
    reader.onerror = () => reject(new Error('Ralat semasa membaca fail.'));
    reader.readAsDataURL(file);
  });
}
