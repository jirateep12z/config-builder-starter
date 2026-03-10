export async function CopyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.warn('[CopyToClipboard] Clipboard API unavailable:', err);
    return false;
  }
}
