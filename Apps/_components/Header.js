// Universal Header (no framework)
// Props: { title, onToggleSidebar, onToggleSettings, isSidebarOpen, isSettingsOpen }

import { createThemeSwitcher } from "./ThemeSwitcher.js";

export function createHeader(options = {}) {
	const {
		title = "docs",
		onToggleSidebar,
		onToggleSettings,
		isSidebarOpen = false,
		isSettingsOpen = false,
	} = options;

	const header = document.createElement("header");
	header.id = "header";
	header.className = "top-0 right-0 left-0 z-50 fixed bg-primary/90 shadow-lg backdrop-blur-xl px-4 py-2 border-primary-content/30 border-b";

	const container = document.createElement("div");
	container.className = "mx-auto max-w-5xl";
	const row = document.createElement("div");
	row.className = "flex justify-between items-center";

	const left = document.createElement("div");
	left.className = "flex items-center gap-3";

	const logo = document.createElement("span");
	logo.className = "text-primary-content iconify";
	logo.setAttribute("data-icon", "material-symbols:code");
	logo.setAttribute("aria-hidden", "true");

	const h1 = document.createElement("h1");
	h1.className = "font-thin text-primary-content text-xl italic";
	h1.textContent = title;

	const sidebarLink = document.createElement("a");
	sidebarLink.href = "#sidebar";
	sidebarLink.className = [
		"text-primary-content hover:text-secondary",
		isSidebarOpen ? "text-secondary" : "",
	].join(" ");
	sidebarLink.setAttribute("aria-label", "Sidebar");
	sidebarLink.title = "Sidebar";
	sidebarLink.addEventListener("click", (e) => {
		e.preventDefault();
		onToggleSidebar && onToggleSidebar();
	});

	const sidebarIcon = document.createElement("span");
	sidebarIcon.className = "text-2xl iconify";
	sidebarIcon.setAttribute("data-icon", "hugeicons:sidebar-left");
	sidebarIcon.setAttribute("aria-hidden", "true");
	sidebarLink.appendChild(sidebarIcon);

	const settingsLink = document.createElement("a");
	settingsLink.href = "#settings";
	settingsLink.className = [
		"inline-flex items-center text-primary-content hover:text-secondary",
		isSettingsOpen ? "text-secondary" : "",
	].join(" ");
	settingsLink.setAttribute("aria-label", "Settings");
	settingsLink.title = "Settings";
	settingsLink.addEventListener("click", (e) => {
		e.preventDefault();
		onToggleSettings && onToggleSettings();
	});

	const settingsIcon = document.createElement("span");
	settingsIcon.className = "text-2xl iconify";
	settingsIcon.setAttribute("data-icon", "hugeicons:settings-02");
	settingsIcon.setAttribute("aria-hidden", "true");
	settingsLink.appendChild(settingsIcon);

	left.appendChild(logo);
	left.appendChild(h1);
	left.appendChild(sidebarLink);
	left.appendChild(settingsLink);

	const right = document.createElement("div");
	right.className = "flex items-center gap-2";
	right.appendChild(createThemeSwitcher());

	row.appendChild(left);
	row.appendChild(right);
	container.appendChild(row);
	header.appendChild(container);

	return header;
}


