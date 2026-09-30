# Elementor Sticky UI

Reusable sticky table-of-contents behavior for long web pages, based on the working section-navigation implementation in the source website. It includes heading IDs, searchable horizontal section links, sticky-header offset, active-section highlighting, and an optional floating Web Share/clipboard button.

## Features

- Generates a TOC from `h2` and `h3` headings.
- Creates collision-free IDs and preserves existing heading IDs.
- Filters headings with a search field.
- Highlights the current section with `IntersectionObserver`.
- Adapts the sticky offset to a fixed or sticky header and keeps links scrollable on mobile.
- Shares the page with the Web Share API or copies its URL when available.

## Installation

No package installation is required for the browser demo. For a site, copy `src/sticky-toc.js` and `src/sticky-toc.css` into a child theme or a site-owned plugin and enqueue them locally.

## Quick start

```js
import { mountStickyToc } from "./src/sticky-toc.js";
mountStickyToc({ contentSelector: "article" });
```

Open `examples/demo.html` through a local HTTP server to see the interactive example. It needs no remote assets.

## Elementor usage

Place article headings in the Elementor post-content area and add a stable CSS class such as `article-content` to its wrapper. Enqueue the module and stylesheet from a child theme or site plugin, then call `mountStickyToc({ contentSelector: ".article-content" })` after the content is present. For a generic site outside Elementor, use a semantic `<main>` or `<article>` and the same module.

## Configuration and expected output

`contentSelector`, `headingSelector`, and `headerSelector` are configurable. The module returns a handle with `nav` and `destroy()`; it returns `null` when fewer than two headings are found. The share helper returns `shared`, `copied`, or `unavailable`.

## Architecture

`src/sticky-toc.js` handles DOM discovery, generated links, search, sticky offset, and active-section observation. `src/sticky-toc.css` is generic responsive styling. `src/share-button.js` contains the optional share fallback. The demo is static HTML and does not require WordPress.

## Development and testing

```sh
npm test
node --check src/sticky-toc.js
node --check src/share-button.js
```

The tests cover pure ID generation and share payloads. Browser and Elementor runtime checks are still required before this project can be marked ready.

## Security

The module does not send page content anywhere. The share helper only sends the page title and URL through browser-native sharing or clipboard APIs. Do not add private site content or production URLs to examples.

## Licence

Apache-2.0. See `LICENSE`.