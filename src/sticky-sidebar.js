export function mountStickySidebar({
  element,
  documentRef = globalThis.document,
  headerSelector = "header.site-header, .elementor-location-header, body > header",
  gap = 16,
} = {}) {
  if (!documentRef || !element) return null;
  const header = documentRef.querySelector(headerSelector);

  const update = () => {
    let headerHeight = 0;
    if (header) {
      const view = documentRef.defaultView;
      const position = view?.getComputedStyle(header)?.position;
      if (position === "fixed" || position === "sticky") {
        headerHeight = header.getBoundingClientRect().height;
      }
    }
    element.style.setProperty("--sticky-sidebar-offset", `${Math.max(0, Math.round(headerHeight + gap))}px`);
    element.classList.add("sticky-sidebar");
  };

  update();
  documentRef.defaultView?.addEventListener("resize", update, { passive: true });

  return {
    element,
    update,
    destroy() {
      documentRef.defaultView?.removeEventListener("resize", update);
      element.classList.remove("sticky-sidebar");
      element.style.removeProperty("--sticky-sidebar-offset");
    },
  };
}

export function mountStickySidebars({
  documentRef = globalThis.document,
  selector = ".js-sticky-sidebar, [data-sticky-sidebar]",
  headerSelector,
  gap = 16,
} = {}) {
  if (!documentRef) return [];
  return [...documentRef.querySelectorAll(selector)]
    .map((element) => mountStickySidebar({ element, documentRef, headerSelector, gap }))
    .filter(Boolean);
}
