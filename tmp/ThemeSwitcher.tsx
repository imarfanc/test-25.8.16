/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { useEffect, useState } from "https://esm.sh/react@18.2.0";
import { loadTheme, saveTheme, type ThemeName } from "/Apps/subscriptions-editor/lib/prefs.ts";

const LIGHT_THEMES: ThemeName[] = [
  "aqua", "retro", "nord", "light", "cupcake", "emerald", "corporate", "garden", "pastel", "fantasy", "lofi", "lemonade", "winter"
];

const DARK_THEMES: ThemeName[] = [
  "synthwave", "cyberpunk", "dark", "dracula", "night", "dim", "halloween", "forest", "black", "luxury", "sunset"
];

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(() => loadTheme());

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const renderOption = (name: ThemeName) => (
    <li key={name}>
      <button type="button" className="gap-3 px-2" onClick={() => setTheme(name)} aria-label={`Set theme ${name}`}>
        <div data-theme={name} className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm border border-base-300/30">
          <div className="bg-base-content size-1 rounded-full"></div>
          <div className="bg-primary size-1 rounded-full"></div>
          <div className="bg-secondary size-1 rounded-full"></div>
          <div className="bg-accent size-1 rounded-full"></div>
        </div>
        <div className="w-32 truncate text-left">{name}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={["h-3 w-3 shrink-0", theme === name ? "visible" : "invisible"].join(" ")}>
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
        </svg>
      </button>
    </li>
  );

  return (
    <div title="Change Theme" className="dropdown dropdown-end block">
      <div tabIndex={0} role="button" className="btn group btn-sm gap-1.5 px-1.5 btn-ghost" aria-label="Change Theme">
        <div className="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors">
          <div className="bg-base-content size-1 rounded-full"></div>
          <div className="bg-primary size-1 rounded-full"></div>
          <div className="bg-secondary size-1 rounded-full"></div>
          <div className="bg-accent size-1 rounded-full"></div>
        </div>
        <svg width="12" height="12" className="mt-px hidden size-2 fill-current opacity-60 sm:inline-block text-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
      </div>
      <div tabIndex={0} className="dropdown-content bg-base-200 text-base-content rounded-box max-h-[calc(100vh-8.2rem)] overflow-y-auto border border-white/5 shadow-2xl outline-1 outline-black/5 mt-2 z-50">
        <ul className="menu w-56">
          <li className="menu-title text-xs">Theme</li>
          <li className="menu-title text-[10px] opacity-60 mt-1">Light</li>
          {LIGHT_THEMES.map(renderOption)}
          <li className="menu-title text-[10px] opacity-60 mt-2">Dark</li>
          {DARK_THEMES.map(renderOption)}
        </ul>
      </div>
    </div>
  );
}


