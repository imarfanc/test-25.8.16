/** @jsxImportSource https://esm.sh/react@18.2.0 */
import _React from "https://esm.sh/react@18.2.0";

export type GridColumns = 1 | 2 | 3 | 4 | 5;
export type CardHeight = "h-36" | "h-48" | "h-56" | "h-fit";

type ChecklistsSettingsProps = {
  gridColumns: GridColumns;
  onGridColumnsChange: (cols: GridColumns) => void;
  cardHeight: CardHeight;
  onCardHeightChange: (height: CardHeight) => void;
  groupByStatus?: boolean;
  onGroupByStatusChange?: (v: boolean) => void;
};

export default function ChecklistsSettings({
  gridColumns,
  onGridColumnsChange,
  cardHeight,
  onCardHeightChange,
  groupByStatus,
  onGroupByStatusChange,
}: ChecklistsSettingsProps) {
  return (
    <section
      id="settings-content"
      className="space-y-3 p-3"
      aria-label="Settings"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-sm">Settings</h2>
      </div>

      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
        <div className="w-full form-control">
          <div className="label">
            <span className="label-text">Grid columns</span>
          </div>
          <div className="join">
            {[1, 2, 3, 4, 5].map((c) => (
              <a
                key={`cols-${c}`}
                href={`#cols-${c}`}
                className={[
                  "btn btn-xs join-item",
                  gridColumns === c ? "btn-primary" : "btn-ghost",
                ].join(" ")}
                onClick={(e) => {
                  e.preventDefault();
                  onGridColumnsChange(c as GridColumns);
                }}
              >
                {c}
              </a>
            ))}
          </div>
        </div>

        <div className="w-full form-control">
          <div className="label">
            <span className="label-text">Card height</span>
          </div>
          <div className="join">
            {["h-36", "h-48", "h-56", "h-fit"].map((h) => (
              <a
                key={`height-${h}`}
                href={`#${h}`}
                className={[
                  "btn btn-xs join-item",
                  cardHeight === (h as CardHeight)
                    ? "btn-primary"
                    : "btn-ghost",
                ].join(" ")}
                onClick={(e) => {
                  e.preventDefault();
                  onCardHeightChange(h as CardHeight);
                }}
              >
                {h}
              </a>
            ))}
          </div>
        </div>

        {typeof groupByStatus === "boolean" && typeof onGroupByStatusChange === "function" && (
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Group by status tag</span>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={!!groupByStatus}
              onChange={(e) => onGroupByStatusChange?.(e.target.checked)}
            />
          </label>
        )}
      </div>
    </section>
  );
}
