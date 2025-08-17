/** @jsxImportSource https://esm.sh/react@18.2.0 */
import ThemeSwitcher from "/Apps/_components/ThemeSwitcher.tsx";

type ChecklistsHeaderProps = {
  onToggleSidebar?: () => void;
  onToggleSettings?: () => void;
  onNewChecklist?: () => void;
  isSidebarOpen?: boolean;
  isSettingsOpen?: boolean;
};

export default function ChecklistsHeader(props: ChecklistsHeaderProps) {
  return (
    <header
      id="header"
      className="top-0 right-0 left-0 z-50 fixed bg-primary/90 shadow-lg backdrop-blur-xl px-8 py-0 border-primary-content/30 border-b"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-between items-center h-8">
          <div className="flex items-center gap-2">
            <span
              className="text-primary-content iconify"
              data-icon="material-symbols:code"
              aria-hidden="true"
            ></span>
            <h1 className="font-thin text-primary-content text-xl italic">
              checklists-editor
            </h1>
            {/* sidebar link */}
            <a
              href="#sidebar"
              className={[
                "text-primary-content hover:text-secondary",
                props.isSidebarOpen ? "text-secondary" : "",
              ].join(" ")}
              aria-label="Sidebar"
              title="Sidebar"
              onClick={(e) => {
                e.preventDefault();
                props.onToggleSidebar?.();
              }}
            >
              <span
                className="text-2xl iconify"
                data-icon="hugeicons:sidebar-left"
                aria-hidden="true"
              ></span>
            </a>
            {/* settings link */}
            <a
              href="#settings"
              className={[
                "inline-flex items-center text-primary-content hover:text-secondary",
                props.isSettingsOpen ? "text-secondary" : "",
              ].join(" ")}
              aria-label="Settings"
              title="Settings"
              onClick={(e) => {
                e.preventDefault();
                props.onToggleSettings?.();
              }}
            >
              <span
                className="text-2xl iconify"
                data-icon="hugeicons:settings-02"
                aria-hidden="true"
              ></span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            {/* new checklist link */}
            <a
              href="#new-checklist"
              className="inline-flex items-center gap-1 text-primary-content hover:text-secondary whitespace-nowrap"
              aria-label="New Checklist"
              title="New Checklist"
              onClick={(e) => {
                e.preventDefault();
                props.onNewChecklist?.();
              }}
            >
              <span
                className="text-2xl iconify"
                data-icon="hugeicons:plus-sign-square"
                aria-hidden="true"
              ></span>
              <span>New Checklist</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
