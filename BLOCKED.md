# Partial Extraction: Sidebar Behavior

The working source confirms a sticky, searchable table of contents with current-section highlighting and a floating share action. The production left/right reference sidebar is not a generic navigation component: it reads private custom post types, membership state, scoring, and site URLs. No independently reusable sticky left/right sidebar implementation was identified.

This project contains a generic standalone TOC and optional Web Share/clipboard button. It is **NOT READY** as a complete extraction of all requested sticky sidebar behavior until an independently working generic sidebar source is identified and the demo is exercised in a browser and Elementor.