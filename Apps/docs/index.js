import { createHeader } from "../_components/Header.js";
import { createSidebar } from "../_components/Sidebar.js";
import { createSettings } from "../_components/Settings.js";

// Files to scan for frontmatter. We derive id/title/icon/file from frontmatter.
const PAGE_FILES = [
	"./pages/getting-started.md",
	"./pages/components.md",
	"./pages/faq.md",
];

let PAGES = [];

// State for sidebar and settings visibility
let isSidebarOpen = false;
let isSettingsOpen = false;

function getDefaultPageId() {
	return PAGES.length > 0 ? PAGES[0].id : "";
}

function parseHash() {
	const hash = location.hash.replace(/^#\/?/, "");
	return hash || getDefaultPageId();
}

function resolvePage(id) {
	return PAGES.find((p) => p.id === id) || PAGES[0];
}

// Parse frontmatter of the form:
// ---\nkey: value\n...\n---\ncontent
function parseFrontmatter(text, fallbackFile) {
	let meta = {};
	let content = text;
	if (text.startsWith("---\n")) {
		const end = text.indexOf("\n---\n", 4);
		if (end !== -1) {
			const raw = text.slice(4, end).split("\n");
			for (const line of raw) {
				const m = /^(\w[\w-]*):\s*(.*)$/.exec(line.trim());
				if (m) {
					const key = m[1];
					let value = m[2];
					if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
						value = value.slice(1, -1);
					}
					meta[key] = value;
				}
			}
			content = text.slice(end + 5);
		}
	}
	if (!meta.file) meta.file = fallbackFile;
	if (!meta.id) meta.id = (fallbackFile || "").replace(/^.*\/(.*?)\.md$/, "$1");
	if (!meta.title) meta.title = meta.id;
	return { meta, content };
}

// Minimal markdown to HTML converter (headings, code, lists, paragraphs)
function mdToHtml(src) {
	// escape
	const esc = (s) => s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

	const lines = src.replace(/\r\n?/g, "\n").split("\n");
	let html = "";
	let inList = false;
	let inCode = false;
	for (let line of lines) {
		if (line.startsWith("```")) {
			if (!inCode) { html += "<pre><code>"; inCode = true; }
			else { html += "</code></pre>"; inCode = false; }
			continue;
		}
		if (inCode) { html += esc(line) + "\n"; continue; }

		const h = /^(#{1,6})\s+(.*)$/.exec(line);
		if (h) {
			const level = h[1].length;
			html += `<h${level}>${esc(h[2])}</h${level}>`;
			continue;
		}

		const li = /^[-*]\s+(.*)$/.exec(line);
		if (li) {
			if (!inList) { html += "<ul>"; inList = true; }
			html += `<li>${esc(li[1])}</li>`;
			continue;
		} else if (inList && line.trim() === "") {
			html += "</ul>"; inList = false; continue;
		}

		if (line.trim() === "") {
			html += "";
		} else {
			html += `<p>${esc(line)}</p>`;
		}
	}
	if (inList) html += "</ul>";
	return html;
}

function stripFrontmatter(text) {
	if (text.startsWith("---\n")) {
		const end = text.indexOf("\n---\n", 4);
		if (end !== -1) return text.slice(end + 5);
	}
	return text;
}

async function fetchPageHtml(file) {
	const res = await fetch(file, { headers: { Accept: "text/plain" } });
	const text = await res.text();
	return mdToHtml(stripFrontmatter(text));
}

async function loadPages() {
	const pages = [];
	for (const file of PAGE_FILES) {
		try {
			const res = await fetch(file, { headers: { Accept: "text/plain" } });
			const text = await res.text();
			const { meta } = parseFrontmatter(text, file);
			pages.push({ id: meta.id, title: meta.title, icon: meta.icon, file: meta.file || file });
		} catch (err) {
			console.error("Failed to load page metadata", file, err);
		}
	}
	return pages;
}

function toggleSidebar() {
	isSidebarOpen = !isSidebarOpen;
	const sidebarMount = document.getElementById("mount-sidebar");
	if (sidebarMount) {
		sidebarMount.style.display = isSidebarOpen ? "block" : "none";
	}
	// Re-render header with updated state
	const currentPageId = parseHash();
	render(currentPageId, true); // true to preserve content
}

function toggleSettings() {
	isSettingsOpen = !isSettingsOpen;
	const toolbarMount = document.getElementById("mount-toolbar");
	if (toolbarMount) {
		toolbarMount.style.display = isSettingsOpen ? "block" : "none";
	}
	// Re-render header with updated state
	const currentPageId = parseHash();
	render(currentPageId, true); // true to preserve content
}

function render(pageId, preserveContent = false) {
	const headerMount = document.getElementById("mount-header");
	const sidebarMount = document.getElementById("mount-sidebar");
	const contentMount = document.getElementById("mount-content");
	const toolbarMount = document.getElementById("mount-toolbar");

	if (!PAGES || PAGES.length === 0) {
		return;
	}

	// Header
	headerMount.innerHTML = "";
	headerMount.appendChild(createHeader({ 
		title: "docs", 
		onToggleSidebar: toggleSidebar,
		onToggleSettings: toggleSettings,
		isSidebarOpen: isSidebarOpen,
		isSettingsOpen: isSettingsOpen
	}));

	// Sidebar
	const page = resolvePage(pageId);
	const onNavigate = (id) => {
		if (id !== pageId) {
			location.hash = `#/${id}`;
		}
	};
	
	// Only update sidebar if not preserving content
	if (!preserveContent) {
		sidebarMount.innerHTML = "";
		sidebarMount.appendChild(createSidebar({ pages: PAGES, currentId: page.id, onNavigate }));
		sidebarMount.style.display = isSidebarOpen ? "block" : "none";
	}

	// Settings toolbar
	// Only update settings if not preserving content
	if (!preserveContent) {
		toolbarMount.innerHTML = "";
		const currentOptions = { contentWidth: (sessionStorage.getItem("docs.contentWidth") || "normal") };
		const settings = createSettings({ options: currentOptions, onChange: (opts) => {
			sessionStorage.setItem("docs.contentWidth", opts.contentWidth);
			contentMount.classList.toggle("max-w-3xl", opts.contentWidth === "normal");
		}});
		toolbarMount.appendChild(settings);
		toolbarMount.style.display = isSettingsOpen ? "block" : "none";
	}

	// Content - only update if not preserving content
	if (!preserveContent) {
		contentMount.classList.toggle("max-w-3xl", (sessionStorage.getItem("docs.contentWidth") || "normal") === "normal");
		contentMount.innerHTML = "<div class=\"text-base-content/60 text-sm\">Loading...</div>";
		fetchPageHtml(page.file).then((html) => {
			contentMount.innerHTML = html;
		});
	}
}

window.addEventListener("hashchange", () => {
	if (PAGES.length > 0) render(parseHash());
});

document.addEventListener("DOMContentLoaded", async () => {
	PAGES = await loadPages();
	render(parseHash());
});


