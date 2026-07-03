import { useState } from "react";
import { solveRegra3, SolverResult } from "../../../utils/solvers/solver";

type RuleOfThreeCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const RuleOfThreeCalculator = ({
  onResultChange,
}: RuleOfThreeCalculatorProps) => {
  const [a, setA] = useState("4");
  const [b, setB] = useState("10");
  const [c, setC] = useState("6");
  const [x, setX] = useState("");

  const clearResult = () => {
    setX("");
    onResultChange?.(null);
  };

  const handleSolve = (type: "dir" | "inv") => {
    const result = solveRegra3(
      parseFloat(a),
      parseFloat(b),
      parseFloat(c),
      type,
    );

    onResultChange?.(result);

    if (result.ok) {
      setX(result.value.replace("x = ", ""));
    } else {
      setX("");
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Regra de 3 simples</h2>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs text-gray-500">A</label>

          <input
            type="number"
            value={a}
            onChange={(e) => {
              setA(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-xs text-gray-500">B</label>

          <input
            type="number"
            value={b}
            onChange={(e) => {
              setB(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-xs text-gray-500">C</label>

          <input
            type="number"
            value={c}
            onChange={(e) => {
              setC(e.target.value);
              clearResult();
            }}
            className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-xs text-gray-500">x = ?</label>

          <input
            value={x}
            readOnly
            className="w-full rounded-lg border border-[#501c2fa9] bg-[#501c2f52] px-4 py-3 font-mono"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500">Se A → B, então C → x</p>

      <div className="flex gap-2">
        <button
          onClick={() => handleSolve("dir")}
          className="flex-1 bg-[var(--wine)] hover:bg-[var(--wine-dark)] text-white rounded-lg py-3 font-medium transition cursor-pointer"
        >
          Direta
        </button>

        <button
          onClick={() => handleSolve("inv")}
          className="flex-1 bg-[var(--wine-muted)] border border-[var(--wine-border)] hover:opacity-70 rounded-lg py-3 font-medium transition cursor-pointer"
        >
          Inversa
        </button>
      </div>
    </div>
  );
};
