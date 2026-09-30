export function sharePayload({ title, url } = {}) {
  return {
    title: String(title || ""),
    url: String(url || globalThis.location?.href || ""),
  };
}

export async function sharePage(details = {}) {
  const payload = sharePayload(details);
  if (globalThis.navigator?.share) {
    await globalThis.navigator.share(payload);
    return "shared";
  }
  if (globalThis.navigator?.clipboard?.writeText && payload.url) {
    await globalThis.navigator.clipboard.writeText(payload.url);
    return "copied";
  }
  return "unavailable";
}