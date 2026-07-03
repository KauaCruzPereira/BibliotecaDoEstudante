import { useMemo, useState } from "react";

import { solveQuadratic, SolverResult } from "../../../utils/solvers/solver";

type SecondDegreeCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const SecondDegreeCalculator = ({
  onResultChange,
}: SecondDegreeCalculatorProps) => {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");

  const preview = useMemo(() => {
    const bv = parseFloat(b);
    const cv = parseFloat(c);

    const bStr = !isNaN(bv) ? (bv < 0 ? `${bv}x` : `+ ${bv}x`) : "+ bx";

    const cStr = !isNaN(cv) ? (cv < 0 ? `${cv}` : `+ ${cv}`) : "+ c";

    return `${a || "a"}x² ${bStr} ${cStr} = 0`;
  }, [a, b, c]);

  const clearResult = () => {
    onResultChange?.(null);
  };

  const handleSolve = () => {
    const result = solveQuadratic(parseFloat(a), parseFloat(b), parseFloat(c));

    onResultChange?.(result);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Equação de 2º grau (Bhaskara)</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">a</label>

          <input
            type="number"
            value={a}
            placeholder="coef. de x²"
            onChange={(e) => {
              setA(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">b</label>

          <input
            type="number"
            value={b}
            placeholder="coef. de x"
            onChange={(e) => {
              setB(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">c</label>

          <input
            type="number"
            value={c}
            placeholder="constante"
            onChange={(e) => {
              setC(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>
      </div>

      <div className="rounded-lg bg-[var(--wine-muted)] p-4">
        <span className="font-mono text-lg text-gray-600">{preview}</span>
      </div>

      <button
        onClick={handleSolve}
        className="bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-semibold transition cursor-pointer"
      >
        Resolver (Bhaskara)
      </button>
    </div>
  );
};
