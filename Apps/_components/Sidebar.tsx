/** @jsxImportSource https://esm.sh/react@18.2.0 */
import _React from "https://esm.sh/react@18.2.0";

type ChecklistsSidebarProps = {
  availableCategoryTags: string[];
  availableStatusTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
};

export default function ChecklistsSidebar({
  availableCategoryTags,
  availableStatusTags,
  selectedTags,
  onToggleTag,
  onClear,
}: ChecklistsSidebarProps) {
  const isSelected = (tag: string) => selectedTags.includes(tag);

  return (
    <aside id="sidebar-content" className="p-3" aria-label="Sidebar">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-sm">Filters</h2>
        <button
          type="button"
          className="hover:text-primary text-base-content btn btn-xs btn-ghost"
          onClick={onClear}
        >
          <span
            className="mr-1 iconify"
            data-icon="hugeicons:eraser"
            aria-hidden="true"
          ></span>
          Clear
        </button>
      </div>

      <div className="space-y-3">
        <section aria-label="Category Tags">
          <h3 className="opacity-70 mb-1 font-semibold text-xs uppercase tracking-wide">
            Categories
          </h3>
          <div className="flex flex-wrap gap-1">
            {availableCategoryTags.length === 0 && (
              <span className="opacity-60 text-xs">No category tags</span>
            )}
            {availableCategoryTags.map((tag) => (
              <label
                key={`cat-${tag}`}
                className={[
                  "badge gap-1 cursor-pointer select-none",
                  isSelected(tag) ? "badge-primary" : "badge-ghost",
                ].join(" ")}
                title={
                  isSelected(tag)
                    ? "Click to remove filter"
                    : "Click to add filter"
                }
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected(tag)}
                  onChange={() => onToggleTag(tag)}
                />
                <span className="text-xs">{tag}</span>
              </label>
            ))}
          </div>
        </section>

        <section aria-label="Status Tags">
          <h3 className="opacity-70 mb-1 font-semibold text-xs uppercase tracking-wide">
            Status
          </h3>
          <div className="flex flex-wrap gap-1">
            {availableStatusTags.length === 0 && (
              <span className="opacity-60 text-xs">No status tags</span>
            )}
            {availableStatusTags.map((tag) => (
              <label
                key={`status-${tag}`}
                className={[
                  "badge badge-outline gap-1 cursor-pointer select-none",
                  isSelected(tag) ? "badge-primary" : "badge-ghost",
                ].join(" ")}
                title={
                  isSelected(tag)
                    ? "Click to remove filter"
                    : "Click to add filter"
                }
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected(tag)}
                  onChange={() => onToggleTag(tag)}
                />
                <span className="text-xs">{tag}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
