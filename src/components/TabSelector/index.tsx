import { CalculatorTypes } from "../../types/calculators.type";

interface TabBarProps {
  labels?: { id: CalculatorTypes; label: string }[];
  active: CalculatorTypes;
  onChange: (id: CalculatorTypes) => void;
}

export function CalculatorSelector({ active, onChange, labels }: TabBarProps) {
  return (
    <div className="rounded-3xl border border-[var(--wine-border)] bg-white overflow-hidden my-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 py-2 min-w-max">
          {labels?.map(({ id, label }) => {
            const isActive = active === id;

            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`
                  whitespace-nowrap
                  rounded-full
                  border
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition-colors
                  cursor-pointer
                  ${
                    isActive
                      ? "bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white"
                      : "bg-[var(--wine-muted)] border-[var(--wine-border)] text-slate-600 hover:opacity-70"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
