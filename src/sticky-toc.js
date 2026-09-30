export function slugifyTitle(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";
}

export function mountStickyToc({
  documentRef = globalThis.document,
  contentSelector = "main",
  headingSelector = "h2, h3",
  headerSelector = "header.site-header, .elementor-location-header, body > header",
} = {}) {
  if (!documentRef) return null;
  const content = documentRef.querySelector(contentSelector);
  if (!content) return null;
  const headings = [...content.querySelectorAll(headingSelector)]
    .filter((heading) => heading.textContent.trim() && !heading.closest("nav, .sticky-toc"));
  if (headings.length < 2) return null;

  const usedIds = new Set([...documentRef.querySelectorAll("[id]")].map((node) => node.id));
  const entries = headings.map((heading) => {
    const title = heading.textContent.trim().replace(/\s+/g, " ");
    if (!heading.id) {
      const base = slugifyTitle(title);
      let candidate = base;
      let suffix = 2;
      while (usedIds.has(candidate)) candidate = `${base}-${suffix++}`;
      heading.id = candidate;
      usedIds.add(candidate);
    }
    return { heading, title, id: heading.id };
  });

  const nav = documentRef.createElement("nav");
  nav.className = "sticky-toc";
  nav.setAttribute("aria-label", "On this page");
  const search = documentRef.createElement("input");
  search.className = "sticky-toc__search";
  search.type = "search";
  search.placeholder = "Find a section";
  search.setAttribute("aria-label", "Find a section");
  const list = documentRef.createElement("ul");
  list.className = "sticky-toc__list";
  const links = entries.map(({ title, id }) => {
    const item = documentRef.createElement("li");
    const link = documentRef.createElement("a");
    link.href = `#${encodeURIComponent(id)}`;
    link.textContent = title;
    link.dataset.keywords = title.toLowerCase();
    item.append(link);
    list.append(item);
    return { link, item };
  });
  const empty = documentRef.createElement("p");
  empty.className = "sticky-toc__empty";
  empty.textContent = "No matching section";
  empty.hidden = true;
  nav.append(search, list, empty);

  const header = documentRef.querySelector(headerSelector);
  if (header?.parentNode) header.insertAdjacentElement("afterend", nav);
  else documentRef.body.prepend(nav);

  const updateOffset = () => {
    if (!header) return nav.style.setProperty("--sticky-toc-offset", "0px");
    const position = documentRef.defaultView.getComputedStyle(header).position;
    const height = position === "fixed" || position === "sticky" ? header.getBoundingClientRect().height : 0;
    nav.style.setProperty("--sticky-toc-offset", `${Math.round(height)}px`);
  };
  updateOffset();
  documentRef.defaultView.addEventListener("resize", updateOffset, { passive: true });

  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const { link, item } of links) {
      const match = !query || `${link.textContent} ${link.dataset.keywords}`.toLowerCase().includes(query);
      item.hidden = !match;
      if (match) visible += 1;
    }
    empty.hidden = visible > 0;
  });

  const Observer = documentRef.defaultView.IntersectionObserver;
  const observer = Observer ? new Observer((observed) => {
    for (const entry of observed) {
      if (!entry.isIntersecting) continue;
      for (const { link } of links) link.classList.toggle("is-current", link.hash === `#${entry.target.id}`);
      links.find(({ link }) => link.classList.contains("is-current"))?.link.scrollIntoView({ block: "nearest", inline: "center" });
    }
  }, { rootMargin: "-18% 0px -72% 0px" }) : null;
  if (observer) entries.forEach(({ heading }) => observer.observe(heading));

  return {
    nav,
    destroy() {
      observer?.disconnect();
      documentRef.defaultView.removeEventListener("resize", updateOffset);
      nav.remove();
    },
  };
}