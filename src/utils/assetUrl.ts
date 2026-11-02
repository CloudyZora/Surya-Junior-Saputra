/**
 * Normalizes local asset paths so they resolve cleanly on both root domains ("/")
 * and subpath deployments such as GitHub Pages ("/Surya-Junior-Saputra/").
 */
export function resolveAssetUrl(src: string): string {
  if (!src) return '';
  if (
    src.startsWith('data:') ||
    src.startsWith('blob:') ||
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('./')
  ) {
    return src;
  }
  if (src.startsWith('/')) {
    return `.${src}`;
  }
  return `./${src}`;
}
