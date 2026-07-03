import { useMemo, useState } from "react";

import { solveSistema, SolverResult } from "../../../utils/solvers/solver";

type SystemsCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

export const SystemsCalculator = ({
  onResultChange,
}: SystemsCalculatorProps) => {
  const [a1, setA1] = useState("2");
  const [b1, setB1] = useState("1");
  const [c1, setC1] = useState("5");

  const preview1 = useMemo(() => {
    const av = parseFloat(a1);
    const bv = parseFloat(b1);
    const cv = parseFloat(c1);

    const aStr = !isNaN(av) ? `${av}` : "a₁";

    const bStr = !isNaN(bv)
      ? bv < 0
        ? `- ${Math.abs(bv)}`
        : `+ ${bv}`
      : "+ b₁";

    const cStr = !isNaN(cv) ? `${cv}` : "c₁";

    return `${aStr}x ${bStr}y = ${cStr}`;
  }, [a1, b1, c1]);

  const [a2, setA2] = useState("4");
  const [b2, setB2] = useState("-1");
  const [c2, setC2] = useState("3");

  const preview2 = useMemo(() => {
    const av = parseFloat(a2);
    const bv = parseFloat(b2);
    const cv = parseFloat(c2);

    const aStr = !isNaN(av) ? `${av}` : "a₂";

    const bStr = !isNaN(bv)
      ? bv < 0
        ? `- ${Math.abs(bv)}`
        : `+ ${bv}`
      : "+ b₂";

    const cStr = !isNaN(cv) ? `${cv}` : "c₂";

    return `${aStr}x ${bStr}y = ${cStr}`;
  }, [a2, b2, c2]);

  const clearResult = () => {
    onResultChange?.(null);
  };

  const handleSolve = () => {
    const result = solveSistema(
      parseFloat(a1),
      parseFloat(b1),
      parseFloat(c1),
      parseFloat(a2),
      parseFloat(b2),
      parseFloat(c2),
    );

    onResultChange?.(result);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow border border-[var(--wine-border)] p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Sistema 2x2</h2>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-3">
            Equação 1: a₁x + b₁y = c₁
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block mb-1 font-medium">a₁</label>

              <input
                type="number"
                value={a1}
                onChange={(e) => {
                  setA1(e.target.value);
                  clearResult();
                }}
                className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">b₁</label>

              <input
                type="number"
                value={b1}
                onChange={(e) => {
                  setB1(e.target.value);
                  clearResult();
                }}
                className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">c₁</label>

              <input
                type="number"
                value={c1}
                onChange={(e) => {
                  setC1(e.target.value);
                  clearResult();
                }}
                className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
              />
            </div>
            <div className="rounded-lg bg-[var(--wine-muted)] p-4">
              <span className="font-mono text-lg text-gray-600">
                {preview1}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-[var(--wine-border)]" />

        <div>
          <p className="text-sm text-gray-500 mb-3">
            Equação 2: a₂x + b₂y = c₂
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block mb-1 font-medium">a₂</label>

              <input
                type="number"
                value={a2}
                onChange={(e) => {
                  setA2(e.target.value);
                  clearResult();
                }}
                className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">b₂</label>

              <input
                type="number"
                value={b2}
                onChange={(e) => {
                  setB2(e.target.value);
                  clearResult();
                }}
                className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">c₂</label>

              <input
                type="number"
                value={c2}
                onChange={(e) => {
                  setC2(e.target.value);
                  clearResult();
                }}
                className="w-full rounded-lg border border-[var(--wine-border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--wine)]"
              />
            </div>
            <div className="rounded-lg bg-[var(--wine-muted)] p-4">
              <span className="font-mono text-lg text-gray-600">
                {preview2}
              </span>
            </div>
          </div>
        </div>
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
