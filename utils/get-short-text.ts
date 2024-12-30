export function getShortText(text: string, n: number): { primaryText: string; secondaryText: string } {
  if (text.length > n) {
    const primaryText = text.substring(0, n) + "...";
    const secondaryText = text.substring(n);
    return { primaryText, secondaryText };
  }
  return { primaryText: text, secondaryText: "" };
}
