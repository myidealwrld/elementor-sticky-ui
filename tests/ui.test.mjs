import test from "node:test";
import assert from "node:assert/strict";
import { slugifyTitle } from "../src/sticky-toc.js";
import { sharePayload } from "../src/share-button.js";
import { mountStickySidebar, mountStickySidebars } from "../src/sticky-sidebar.js";

test("creates stable heading IDs from titles", () => {
  assert.equal(slugifyTitle("Current section: Café & tea"), "current-section-cafe-tea");
  assert.equal(slugifyTitle("!!!"), "section");
});

test("share payload contains only the generic title and URL", () => {
  assert.deepEqual(sharePayload({ title: "Sample page", url: "https://example.test/page" }), {
    title: "Sample page",
    url: "https://example.test/page",
  });
});

test("sticky sidebar helpers fail safely without a document", () => {
  assert.equal(mountStickySidebar({ documentRef: null, element: {} }), null);
  assert.deepEqual(mountStickySidebars({ documentRef: null }), []);
});
