import { useState } from "react";

import { solvePA, SolverResult } from "../../../utils/solvers/solver";

type APCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const APCalculator = ({ onResultChange }: APCalculatorProps) => {
  const [a1, setA1] = useState("2");
  const [r, setR] = useState("3");
  const [n, setN] = useState("6");

  const clearResult = () => {
    onResultChange?.(null);
  };

  const handleSolve = () => {
    const result = solvePA(parseFloat(a1), parseFloat(r), parseInt(n, 10));

    onResultChange?.(result);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Progressão Aritmética</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">a₁</label>

          <input
            type="number"
            value={a1}
            placeholder="primeiro termo"
            onChange={(e) => {
              setA1(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">r</label>

          <input
            type="number"
            value={r}
            placeholder="razão"
            onChange={(e) => {
              setR(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">n</label>

          <input
            type="number"
            value={n}
            placeholder="nº de termos"
            onChange={(e) => {
              setN(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>
      </div>

      <button
        onClick={handleSolve}
        className="bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-semibold transition cursor-pointer"
      >
        Calcular
      </button>
    </div>
  );
};
