// AppMeta type removed - JavaScript doesn't need type definitions

const daisyColors = new Set([
	"primary",
	"secondary",
	"accent",
	"neutral",
	"info",
	"success",
	"warning",
	"error",
]);

async function loadApps() {
	const res = await fetch("./Apps/Apps.json", { headers: { Accept: "application/json" } });
	const data = await res.json();
	return Array.isArray(data) ? data : (Array.isArray(data?.apps) ? data.apps : []);
}

function renderApps(apps) {
	const container = document.getElementById("apps");
	if (!container) return;
	container.innerHTML = "";

	if (apps.length === 0) {
		const empty = document.createElement("div");
		empty.className = "text-center text-base-content/70";
		empty.textContent = "No apps found.";
		container.appendChild(empty);
		return;
	}

	// Group by section preserving the order encountered in Apps.json
	const bySection = new Map();
	const sectionOrder = [];
	for (const app of apps) {
		const key = (app.section || "apps");
		if (!bySection.has(key)) {
			bySection.set(key, []);
			sectionOrder.push(key);
		}
		bySection.get(key).push(app);
	}

	// Render sections in the same order as in Apps.json
	for (const section of sectionOrder) {
		const group = bySection.get(section);
		// sort by sortname or fallback to name/slug
		group.sort((a, b) => (a.sortname || a.name || a.slug || "").localeCompare(b.sortname || b.name || b.slug || ""));

		const sectionEl = document.createElement("div");
		sectionEl.className = "mb-6";
		const heading = document.createElement("h2");
		heading.className = "text-sm font-thin italic tracking-wider text-base-content/60 mb-2";
		heading.textContent = `${section} (${group.length})`;
		sectionEl.appendChild(heading);

		const grid = document.createElement("div");
		grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3";

		for (const app of group) {
			// Determine background, text, and border colors
			const parseDaisyWithAlpha = (value, fallbackBase = "neutral") => {
				if (!value) return fallbackBase;
				const lower = value.toLowerCase();
				const [base, alpha] = lower.split("/", 2);
				const safeBase = daisyColors.has(base) ? base : fallbackBase;
				return alpha ? `${safeBase}/${alpha}` : safeBase;
			};

			const bgColorClass = parseDaisyWithAlpha(app.color);
			const borderHoverColor = parseDaisyWithAlpha(app.borderhoverColor || app.borderColor || app.color);

			let textClass;
			if (app.textColor && typeof app.textColor === "string") {
				textClass = app.textColor.toLowerCase();
			} else {
				const [base] = (app.color || "").toLowerCase().split("/", 2);
				textClass = base && daisyColors.has(base) ? `${base}-content` : "base-content";
			}

			const card = document.createElement("a");
			card.href = app.path || "#";
			card.className = [
				"block rounded-lg border p-3",
				"border-base-300",
				`hover:border-${borderHoverColor}`,
				`bg-${bgColorClass} text-${textClass}`,
				"hover:opacity-90",
			].join(" ");

			const header = document.createElement("div");
			header.className = "flex items-center gap-2";

			if (app.icon && typeof app.icon === "string") {
				const iconEl = document.createElement("span");
				iconEl.className = "iconify text-current text-lg";
				iconEl.setAttribute("data-icon", app.icon);
				iconEl.setAttribute("aria-hidden", "true");
				header.appendChild(iconEl);
			}

			const title = document.createElement("div");
			title.className = "text-sm font-semibold";
			title.textContent = app.name || app.slug || "App";
			header.appendChild(title);

			const desc = document.createElement("div");
			desc.className = "text-xs opacity-80";
			desc.textContent = app.description || "";

			card.appendChild(header);
			if (desc.textContent) card.appendChild(desc);
			grid.appendChild(card);
		}

		sectionEl.appendChild(grid);
		container.appendChild(sectionEl);
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const apps = await loadApps();
	const titleEl = document.querySelector("h1.card-title");
	if (titleEl) {
		titleEl.textContent = `neo Apps v4 (${apps.length})`;
	}
	renderApps(apps);
});