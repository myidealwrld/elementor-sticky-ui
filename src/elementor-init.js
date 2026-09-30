import { mountStickyToc } from "./sticky-toc.js";
import { mountStickySidebars } from "./sticky-sidebar.js";
import { sharePage } from "./share-button.js";

function findContentSelector(documentRef) {
  const candidates = [
    ".elementor-widget-theme-post-content .elementor-widget-container",
    ".elementor-location-single article",
    "article",
    "main",
  ];
  return candidates.find((selector) => documentRef.querySelector(selector)) || null;
}

export function bootElementorStickyUi(documentRef = globalThis.document) {
  if (!documentRef) return { toc: null, sidebars: [] };
  const contentSelector = findContentSelector(documentRef);
  const toc = contentSelector ? mountStickyToc({ documentRef, contentSelector }) : null;
  const sidebars = mountStickySidebars({ documentRef });

  for (const button of documentRef.querySelectorAll("[data-share-page]")) {
    if (button.dataset.stickyUiBound === "true") continue;
    button.dataset.stickyUiBound = "true";
    button.addEventListener("click", async () => {
      const label = button.textContent;
      try {
        const result = await sharePage({
          title: documentRef.title,
          url: documentRef.defaultView?.location?.href,
        });
        if (result === "copied") {
          button.textContent = "Link copied";
          setTimeout(() => { button.textContent = label; }, 1400);
        }
      } catch (error) {
        console.warn("Share action failed", error);
      }
    });
  }

  return { toc, sidebars };
}

function boot() {
  bootElementorStickyUi(globalThis.document);
}

if (globalThis.document?.readyState === "loading") {
  globalThis.document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
