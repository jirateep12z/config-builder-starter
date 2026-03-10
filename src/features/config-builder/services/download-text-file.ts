const OBJECT_URL_REVOKE_DELAY_MS = 40_000;

export function DownloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const object_url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = object_url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(
    () => URL.revokeObjectURL(object_url),
    OBJECT_URL_REVOKE_DELAY_MS
  );
}
