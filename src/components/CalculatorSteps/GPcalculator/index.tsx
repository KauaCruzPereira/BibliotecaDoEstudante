import { useState } from "react";
import { solvePG, SolverResult } from "../../../utils/solvers/solver";

type GPCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const GPCalculator = ({ onResultChange }: GPCalculatorProps) => {
  const [a1, setA1] = useState("3");
  const [q, setQ] = useState("2");
  const [n, setN] = useState("5");

  const calculate = () => {
    const result = solvePG(parseFloat(a1), parseFloat(q), parseInt(n));

    onResultChange?.(result);
  };

  const handleA1Change = (value: string) => {
    setA1(value);
    onResultChange?.(null);
  };

  const handleQChange = (value: string) => {
    setQ(value);
    onResultChange?.(null);
  };

  const handleNChange = (value: string) => {
    setN(value);
    onResultChange?.(null);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Progressão Geométrica</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">a₁</label>

          <input
            type="number"
            value={a1}
            placeholder="primeiro termo"
            onChange={(e) => handleA1Change(e.target.value)}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">q</label>

          <input
            type="number"
            value={q}
            placeholder="razão"
            onChange={(e) => handleQChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">n</label>

          <input
            type="number"
            value={n}
            placeholder="nº de termos"
            onChange={(e) => handleNChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

      </div>
        <button
          onClick={calculate}
          className="bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-semibold transition cursor-pointer"
        >
          Calcular
        </button>
    </div>
  );
};
