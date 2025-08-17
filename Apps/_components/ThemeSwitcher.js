// Universal ThemeSwitcher (no framework)
// DaisyUI theme dropdown with localStorage persistence

const STORAGE_KEY = "neoapps.theme";

const LIGHT_THEMES = [
	"aqua", "retro", "nord", "light", "cupcake", "emerald", "corporate", "garden", "pastel", "fantasy", "lofi", "lemonade", "winter"
];

const DARK_THEMES = [
	"synthwave", "cyberpunk", "dark", "dracula", "night", "dim", "halloween", "forest", "black", "luxury", "sunset"
];

function loadTheme() {
	try {
		return localStorage.getItem(STORAGE_KEY) || "aqua";
	} catch {
		return "aqua";
	}
}

function saveTheme(theme) {
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {}
}

function applyTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
}

function createOption(theme, getCurrent, setCurrent) {
	const li = document.createElement("li");
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = "gap-3 px-2";
	btn.setAttribute("aria-label", `Set theme ${theme}`);
	btn.addEventListener("click", () => setCurrent(theme));

	const swatch = document.createElement("div");
	swatch.setAttribute("data-theme", theme);
	swatch.className = "bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm border border-base-300/30";
	for (const cls of ["bg-base-content", "bg-primary", "bg-secondary", "bg-accent"]) {
		const dot = document.createElement("div");
		dot.className = `${cls} size-1 rounded-full`;
		swatch.appendChild(dot);
	}

	const name = document.createElement("div");
	name.className = "w-32 truncate text-left";
	name.textContent = theme;

	const check = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	check.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	check.setAttribute("width", "16");
	check.setAttribute("height", "16");
	check.setAttribute("viewBox", "0 0 24 24");
	check.setAttribute("fill", "currentColor");
	check.classList.add("h-3", "w-3", "shrink-0");

	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", "M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z");
	check.appendChild(path);

	function updateVisibility() {
		const isCurrent = getCurrent() === theme;
		check.style.visibility = isCurrent ? "visible" : "hidden";
	}

	updateVisibility();

	btn.appendChild(swatch);
	btn.appendChild(name);
	btn.appendChild(check);
	li.appendChild(btn);

	return { li, updateVisibility };
}

export function createThemeSwitcher() {
	let currentTheme = loadTheme();
	applyTheme(currentTheme);

	const root = document.createElement("div");
	root.title = "Change Theme";
	root.className = "dropdown dropdown-end block";

	const trigger = document.createElement("div");
	trigger.tabIndex = 0;
	trigger.role = "button";
	trigger.className = "btn group btn-sm gap-1.5 px-1.5 btn-ghost";
	trigger.setAttribute("aria-label", "Change Theme");

	const triggerSwatch = document.createElement("div");
	triggerSwatch.className = "bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors";
	for (const cls of ["bg-base-content", "bg-primary", "bg-secondary", "bg-accent"]) {
		const dot = document.createElement("div");
		dot.className = `${cls} size-1 rounded-full`;
		triggerSwatch.appendChild(dot);
	}

	const caret = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	caret.setAttribute("width", "12");
	caret.setAttribute("height", "12");
	caret.classList.add("mt-px", "hidden", "size-2", "fill-current", "opacity-60", "sm:inline-block", "text-primary-content");
	caret.setAttribute("viewBox", "0 0 2048 2048");
	const caretPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	caretPath.setAttribute("d", "M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z");
	caret.appendChild(caretPath);

	trigger.appendChild(triggerSwatch);
	trigger.appendChild(caret);

	const dropdown = document.createElement("div");
	dropdown.tabIndex = 0;
	dropdown.className = "dropdown-content bg-base-200 text-base-content rounded-box max-h-[calc(100vh-8.2rem)] overflow-y-auto border border-white/5 shadow-2xl outline-1 outline-black/5 mt-2 z-50";

	const list = document.createElement("ul");
	list.className = "menu w-56";

	const title = document.createElement("li");
	title.className = "menu-title text-xs";
	title.textContent = "Theme";
	list.appendChild(title);

	const lightTitle = document.createElement("li");
	lightTitle.className = "menu-title text-[10px] opacity-60 mt-1";
	lightTitle.textContent = "Light";
	list.appendChild(lightTitle);

	const entries = [];
	const getCurrent = () => currentTheme;
	const setCurrent = (t) => {
		currentTheme = t;
		applyTheme(currentTheme);
		saveTheme(currentTheme);
		for (const e of entries) e.updateVisibility();
	};

	for (const name of LIGHT_THEMES) {
		const item = createOption(name, getCurrent, setCurrent);
		entries.push(item);
		list.appendChild(item.li);
	}

	const darkTitle = document.createElement("li");
	darkTitle.className = "menu-title text-[10px] opacity-60 mt-2";
	darkTitle.textContent = "Dark";
	list.appendChild(darkTitle);

	for (const name of DARK_THEMES) {
		const item = createOption(name, getCurrent, setCurrent);
		entries.push(item);
		list.appendChild(item.li);
	}

	dropdown.appendChild(list);
	root.appendChild(trigger);
	root.appendChild(dropdown);
	return root;
}


