import { useState } from "react";
import { solvePorcentagem, SolverResult } from "../../../utils/solvers/solver";

type PercentageCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const PercentageCalculator = ({
  onResultChange,
}: PercentageCalculatorProps) => {
  const [value, setValue] = useState("250");
  const [percentage, setPercentage] = useState("15");

  const handleValueChange = (value: string) => {
    setValue(value);
    onResultChange?.(null);
  };

  const handlePercentageChange = (value: string) => {
    setPercentage(value);
    onResultChange?.(null);
  };

  const calculate = (type: "of" | "add" | "sub") => {
    const result = solvePorcentagem(
      parseFloat(value),
      parseFloat(percentage),
      type,
    );

    onResultChange?.(result);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Calcular Porcentagem</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            value={value}
            placeholder="valor"
            onChange={(e) => handleValueChange(e.target.value)}
            className="flex-1 min-w-0 rounded-lg border border-[var(--wine-border)] px-4 py-3 font-mono outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />

          <span className="text-gray-500 text-lg">×</span>

          <input
            type="number"
            value={percentage}
            placeholder="%"
            onChange={(e) => handlePercentageChange(e.target.value)}
            className="flex-1 min-w-0 rounded-lg border border-[var(--wine-border)] px-4 py-3 font-mono outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />

          <span className="text-gray-500 text-lg">%</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => calculate("of")}
            className="flex-1 bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-medium transition cursor-pointer"
          >
            X% de Y
          </button>

          <button
            onClick={() => calculate("add")}
            className="flex-1 bg-[var(--wine-muted)] border border-[var(--wine-border)] hover:opacity-70 rounded-lg py-3 font-medium transition cursor-pointer"
          >
            Adicionar %
          </button>

          <button
            onClick={() => calculate("sub")}
            className="flex-1 bg-[var(--wine-muted)] border border-[var(--wine-border)] hover:opacity-70 rounded-lg py-3 font-medium transition cursor-pointer"
          >
            Subtrair %
          </button>
        </div>
      </div>
    </div>
  );
};
