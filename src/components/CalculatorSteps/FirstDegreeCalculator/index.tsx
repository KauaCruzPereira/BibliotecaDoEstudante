import { useMemo, useState } from "react";

import {
  solveLinear,
  SolverResult,
} from "../../../utils/solvers/solver";

type FirstDegreeCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const FirstDegreeCalculator = ({
  onResultChange,
}: FirstDegreeCalculatorProps) => {
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [c, setC] = useState("11");

  const preview = useMemo(() => {
    const av = a || "a";
    const bv = parseFloat(b);

    const sign = !isNaN(bv) && bv < 0 ? "" : "+";

    return `${av}x ${sign} ${b || "b"} = ${c || "c"}`;
  }, [a, b, c]);

  const handleSolve = () => {
    const result = solveLinear(
      parseFloat(a),
      parseFloat(b),
      parseFloat(c)
    );

    onResultChange?.(result);
  };

  const clearResult = () => onResultChange?.(null);

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">
        Equação de 1º grau
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">
            a
          </label>

          <input
            type="number"
            value={a}
            placeholder="coef. de x"
            onChange={(e) => {
              setA(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            b
          </label>

          <input
            type="number"
            value={b}
            placeholder="constante"
            onChange={(e) => {
              setB(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            c
          </label>

          <input
            type="number"
            value={c}
            placeholder="resultado"
            onChange={(e) => {
              setC(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>
      </div>

      <div className="rounded-lg bg-[var(--wine-muted)] p-4">
        <span className="font-mono text-lg text-gray-600">
          {preview}
        </span>
      </div>

      <button
        onClick={handleSolve}
        className="bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-semibold transition cursor-pointer"
      >
        Resolver
      </button>
    </div>
  );
};