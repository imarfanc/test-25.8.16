---
id: components
title: Components
icon: mdi:shape-outline
file: ./pages/components.md
---

# Components

This docs site uses simplified, framework-free versions of the shared UI components:

- `Header`: fixed top bar with title and theme switcher
- `Sidebar`: page navigation, uses Iconify icons
- `Settings`: quick per-page tweaks

```js
// Example of using components in plain JS
import { createHeader } from "../../_components/Header.js";

document.getElementById("mount-header").appendChild(createHeader({ title: "docs" }));
```
