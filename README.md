# Elementor Sticky UI

A reusable sticky table of contents, generic sticky sidebars, and floating share action for Elementor, WordPress, or plain HTML pages.

## What works

- Sticky searchable TOC generated from page headings
- Collision-free generated heading IDs
- Current-section highlighting with IntersectionObserver
- Header-aware sticky offsets
- Generic left/right sticky sidebars
- Responsive fallback to normal flow on narrow screens
- Floating Web Share / clipboard action
- Elementor-aware automatic initialization
- Installable WordPress plugin wrapper

## WordPress / Elementor installation

Copy or clone the repo to:

```
wp-content/plugins/elementor-sticky-ui
```

Then activate **Elementor Sticky UI** in WordPress.

The plugin requires WordPress 6.5+ for native script modules.

The TOC automatically looks for Elementor theme post content, an article, or main content. To make an Elementor container sticky, give it either:

```
js-sticky-sidebar
```

as a CSS class, or add the `data-sticky-sidebar` attribute.

No private CPTs, membership logic, scores, production URLs, or client content are used.

## Plain HTML / custom integration

```js
import { mountStickyToc } from "./src/sticky-toc.js";
import { mountStickySidebars } from "./src/sticky-sidebar.js";

mountStickyToc({ contentSelector: "article" });
mountStickySidebars();
```

See `examples/demo.html` for two sidebars, a TOC, and the share action.

Run a local server from the repo root, for example:

```sh
python3 -m http.server 8000
```

then open `http://localhost:8000/examples/demo.html`.

## Development

```sh
npm test
npm run check
php -l elementor-sticky-ui.php
```

## Security

The package does not transmit page content. The share helper uses browser-native sharing or clipboard APIs only.

## License

Apache-2.0. See `LICENSE`.
