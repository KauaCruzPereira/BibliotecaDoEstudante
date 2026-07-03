import { useState } from "react";
import { solveExponential, SolverResult } from "../../../utils/solvers/solver";

type ExponentialCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const ExponentialCalculator = ({
  onResultChange,
}: ExponentialCalculatorProps) => {
  const [a, setA] = useState("2");
  const [b, setB] = useState("32");

  const handleAChange = (value: string) => {
    setA(value);
    onResultChange?.(null);
  };

  const handleBChange = (value: string) => {
    setB(value);
    onResultChange?.(null);
  };

  const handleSolve = () => {
    const result = solveExponential(parseFloat(a), parseFloat(b));

    onResultChange?.(result);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">aˣ = b → encontrar x</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">a</label>

          <input
            type="number"
            value={a}
            placeholder="base"
            onChange={(e) => handleAChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">b</label>

          <input
            type="number"
            value={b}
            placeholder="resultado"
            onChange={(e) => handleBChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <p className="text-sm text-gray-500">
          Usa logaritmo:{" "}
          <span className="font-medium">x = log(b) / log(a)</span>
        </p>

        <button
          onClick={handleSolve}
          className="bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-semibold transition cursor-pointer"
        >
          Resolver
        </button>
      </div>
    </div>
  );
};
