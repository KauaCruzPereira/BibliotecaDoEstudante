import { CalculatorTypes } from "../../types/calculators.type";

const TAB_LABELS: { id: CalculatorTypes; label: string }[] = [
  { id: "basica", label: "Calculadora" },
  { id: "primeiroG", label: "1º Grau" },
  { id: "segundoG", label: "2º Grau" },
  { id: "sistemas", label: "Sistemas" },
  { id: "pa", label: "PA" },
  { id: "pg", label: "PG" },
  { id: "exponencial", label: "Exponencial" },
  { id: "porcentagem", label: "Porcentagem" },
  { id: "regra3", label: "Regra de 3" },
];

interface TabBarProps {
  active: CalculatorTypes;
  onChange: (id: CalculatorTypes) => void;
}

export function CalculatorSelector({ active, onChange }: TabBarProps) {
  return (
    <div className="rounded-3xl border border-[var(--wine-border)] bg-white overflow-hidden my-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 py-2 min-w-max">
          {TAB_LABELS.map(({ id, label }) => {
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
