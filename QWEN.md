# Qwen Code Context for `test-25.8.16`

This document provides essential context for Qwen Code to understand and assist with this project.

## Project Type

This is a **code project**. It is a simple, static web application framework for hosting multiple small web apps and a documentation site. It uses modern browser JavaScript (ES modules) with no build step. The main technologies are:

*   **HTML/CSS:** Core markup and styling.
*   **Tailwind CSS (v4):** Utility-first CSS framework, loaded via CDN.
*   **DaisyUI:** Tailwind CSS component library, loaded via CDN.
*   **Iconify:** Icon library, loaded via CDN.
*   **Vanilla JavaScript (ES Modules):** Core logic for the dashboard, docs site, and component utilities.
*   **Markdown:** Used for content within the docs site.

## Project Overview

The main purpose of this project is to serve as a central hub for a collection of small, static web applications ("neo Apps") and provide a simple documentation site. It features a main dashboard (`index.html`) that lists the available apps, fetched dynamically from a JSON file (`Apps/Apps.json`). It also includes a reusable component library (`Apps/_components`) for building consistent UI elements like headers, sidebars, and settings panels, primarily used by the documentation site (`Apps/docs`).

Key aspects:

*   **No Build Step:** The project is designed to work directly in the browser using ES modules and CDN-hosted dependencies. This simplifies development and deployment (e.g., to GitHub Pages).
*   **Dynamic App Listing:** The main dashboard fetches app metadata from `Apps/Apps.json` to render the list of available applications.
*   **Reusable Components:** Vanilla JS components in `Apps/_components` provide a foundation for consistent UI across different parts of the project, like the docs site.
*   **Docs Site:** A lightweight documentation site built using the reusable components, loading content from Markdown files.

## Building and Running

This project is static and doesn't require a traditional build process. It's intended to be served by a local HTTP server.

*   **Run locally:** Use a simple HTTP server. The recommended command is:
    ```bash
    python3 -m http.server 5173
    ```
    Then, open `http://localhost:5173/` in your browser.
*   **Open docs site:** Navigate to `http://localhost:5173/Apps/docs/` or open `Apps/docs/index.html` directly.

## Development Conventions

Based on `AGENTS.md`:

*   **Language:** Browser JavaScript (ES modules).
*   **Styling:**
    *   Use **DaisyUI utility classes** extensively.
    *   Avoid inline styles.
    *   **Indentation:** Tabs.
    *   **Quotes:** Double (`""`).
    *   **Statement Endings:** Semicolons.
*   **Components:**
    *   Vanilla JS UI utilities are located in `Apps/_components/`.
    *   Filenames use **PascalCase** (e.g., `Header.js`).
    *   Factory functions for components follow the pattern `create<ComponentName>()` (e.g., `createHeader()`).
*   **Data (`Apps/Apps.json`):**
    *   Keep the list sorted by section.
    *   Use kebab-case for `slug` and `id` values.
*   **Testing:**
    *   No formal test suite currently.
    *   Validate changes by serving locally and checking:
        *   Home page renders cards, sections, and icons without console errors.
        *   Docs pages load Markdown and update via hash navigation.
*   **Commit Messages:** Use Conventional Commit style when possible: `type(scope): summary` (e.g., `docs(app): build docs index`).
*   **Security:** Do not commit secrets. Libraries are loaded via CDN; pin to known versions when updating. Serve over HTTP locally to avoid fetch/CORS issues.

## Key Files and Directories

*   `index.html`: Main dashboard page.
*   `frontend/index.js`: Script that fetches `Apps/Apps.json` and renders the app cards on the dashboard.
*   `Apps/Apps.json`: Central configuration file containing metadata for all listed apps (name, path, section, styling, icon).
*   `Apps/_components/`: Directory containing reusable vanilla JS UI components (`Header.js`, `Sidebar.js`, `Settings.js`, `ThemeSwitcher.js`).
*   `Apps/docs/`: A lightweight documentation site built using the components in `Apps/_components` and loading content from Markdown files.
*   `tmp/`: Directory for optional helpers or drafts (e.g., TypeScript/TSX files, build scripts). Not required for normal usage.