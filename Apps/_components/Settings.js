// Universal Settings panel for docs app
// Props: { options: { contentWidth: 'normal'|'wide' }, onChange(options) }

export function createSettings({ options = { contentWidth: 'normal' }, onChange } = {}) {
	const section = document.createElement("section");
	section.id = "settings-content";
	section.className = "space-y-3 p-3";
	section.setAttribute("aria-label", "Settings");

	const head = document.createElement("div");
	head.className = "flex justify-between items-center";

	const title = document.createElement("h2");
	title.className = "font-semibold text-sm";
	title.textContent = "Settings";

	head.appendChild(title);
	section.appendChild(head);

	const grid = document.createElement("div");
	grid.className = "gap-3 grid grid-cols-1 sm:grid-cols-2";

	// Content width chooser
	const widthControl = document.createElement("div");
	widthControl.className = "w-full form-control";
	const widthLabelWrap = document.createElement("div");
	widthLabelWrap.className = "label";
	const widthLabel = document.createElement("span");
	widthLabel.className = "label-text";
	widthLabel.textContent = "Content width";
	widthLabelWrap.appendChild(widthLabel);

	const widthJoin = document.createElement("div");
	widthJoin.className = "join";
	for (const value of ["normal", "wide"]) {
		const a = document.createElement("a");
		a.href = `#width-${value}`;
		a.className = [
			"btn btn-xs join-item",
			options.contentWidth === value ? "btn-primary" : "btn-ghost",
		].join(" ");
		a.textContent = value;
		a.addEventListener("click", (e) => {
			e.preventDefault();
			options.contentWidth = value;
			onChange && onChange({ ...options });
			// update buttons' classes
			for (const sib of widthJoin.querySelectorAll("a")) {
				sib.classList.toggle("btn-primary", sib.textContent === value);
				sib.classList.toggle("btn-ghost", sib.textContent !== value);
			}
		});
		widthJoin.appendChild(a);
	}

	widthControl.appendChild(widthLabelWrap);
	widthControl.appendChild(widthJoin);
	grid.appendChild(widthControl);

	section.appendChild(grid);
	return section;
}


