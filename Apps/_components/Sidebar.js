// Universal Sidebar for docs navigation
// Props: { pages: Array<{ id, title, icon? }>, currentId, onNavigate(id) }

export function createSidebar({ pages = [], currentId = null, onNavigate } = {}) {
	const aside = document.createElement("aside");
	aside.id = "sidebar-content";
	aside.className = "p-3";
	aside.setAttribute("aria-label", "Sidebar");

	const head = document.createElement("div");
	head.className = "flex justify-between items-center mb-2";

	const title = document.createElement("h2");
	title.className = "font-semibold text-sm";
	title.textContent = "Docs";

	head.appendChild(title);
	aside.appendChild(head);

	const list = document.createElement("ul");
	list.className = "menu menu-sm bg-base-200 rounded-box border border-base-300";

	for (const page of pages) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `#/${page.id}`;
		a.className = currentId === page.id ? "active" : "";
		a.addEventListener("click", (e) => {
			// allow native hash change, but also invoke callback immediately for snappier UX
			onNavigate && onNavigate(page.id);
		});

		if (page.icon) {
			const icon = document.createElement("span");
			icon.className = "iconify text-current text-base me-2";
			icon.setAttribute("data-icon", page.icon);
			icon.setAttribute("aria-hidden", "true");
			a.appendChild(icon);
		}

		const label = document.createElement("span");
		label.textContent = page.title || page.id;
		a.appendChild(label);

		li.appendChild(a);
		list.appendChild(li);
	}

	aside.appendChild(list);
	return aside;
}


