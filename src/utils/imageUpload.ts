/**
 * Compresses and resizes a user-selected image file on the client so it renders
 * crisply on high-DPI screens while staying compact enough for localStorage.
 */
export function compressImageToDataUrl(
  file: File,
  maxDimension = 960,
  quality = 0.88
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        const { naturalWidth: w, naturalHeight: h } = img;
        if (!w || !h) {
          resolve(dataUrl);
          return;
        }

        const scale = Math.min(1, maxDimension / Math.max(w, h));
        const targetW = Math.max(1, Math.round(w * scale));
        const targetH = Math.max(1, Math.round(h * scale));

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, targetW, targetH);
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const compressed = canvas.toDataURL(outputType, quality);
        resolve(compressed);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
