import test from "node:test";
import assert from "node:assert/strict";
import { slugifyTitle } from "../src/sticky-toc.js";
import { sharePayload } from "../src/share-button.js";

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