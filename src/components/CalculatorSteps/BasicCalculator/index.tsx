import { useEffect, useRef, useState } from "react";

import { solveCalculator, SolverResult } from "../../../utils/solvers/solver";

type BasicCalculatorProps = {
  onResultChange?: (result: SolverResult | null) => void;
};

const BUTTON_ROWS = [
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "-"],
  ["0", ".", "(", ")", "+"],
];

export const BasicCalculator = ({ onResultChange }: BasicCalculatorProps) => {
  const [expression, setExpression] = useState("0");

  const exprRef = useRef(expression);

  useEffect(() => {
    exprRef.current = expression;
  }, [expression]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      let handled = false;

      if (/^[0-9]$/.test(key)) {
        setExpression((prev) => (prev === "0" ? key : prev + key));
        onResultChange?.(null);
        handled = true;
      } else if (key === ".") {
        setExpression((prev) => (prev === "0" ? "0." : prev + "."));
        onResultChange?.(null);
        handled = true;
      } else if (key === "+" || key === "-") {
        setExpression((prev) => (prev === "0" ? key : prev + key));
        onResultChange?.(null);
        handled = true;
      } else if (key === "*") {
        setExpression((prev) => (prev === "0" ? "×" : prev + "×"));
        onResultChange?.(null);
        handled = true;
      } else if (key === "/") {
        setExpression((prev) => (prev === "0" ? "÷" : prev + "÷"));
        onResultChange?.(null);
        handled = true;
      } else if (key === "(" || key === ")") {
        setExpression((prev) => (prev === "0" ? key : prev + key));
        onResultChange?.(null);
        handled = true;
      } else if (key === "Enter" || key === "=") {
        const r = solveCalculator(exprRef.current);
        onResultChange?.(r);
        handled = true;
      } else if (key === "Backspace") {
        setExpression((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
        onResultChange?.(null);
        handled = true;
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        setExpression("0");
        onResultChange?.(null);
        handled = true;
      }

      if (handled) e.preventDefault();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const append = (value: string) => {
    setExpression((prev) => {
      if (prev === "0" && value !== "." && !["×", "÷", ")"].includes(value)) {
        return value;
      }
      return prev + value;
    });
    onResultChange?.(null);
  };

  const handleClear = () => {
    setExpression("0");
    onResultChange?.(null);
  };

  const handleDelete = () => {
    setExpression((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
    onResultChange?.(null);
  };

  const handleEvaluate = () => {
    const r = solveCalculator(expression);
    onResultChange?.(r);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow p-4 flex flex-col gap-4 border border-[var(--wine-border)]">
      <h2 className="text-lg font-semibold">Calculadora básica</h2>

      <div className="bg-[var(--wine-muted)] rounded-lg p-4 min-h-[90px] flex items-center justify-end">
        <span className="text-2xl font-mono break-all text-right">
          {expression}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {BUTTON_ROWS.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((label) => (
              <button
                key={label}
                onClick={() => append(label)}
                className="flex-1 bg-[var(--wine-muted)] border border-[var(--wine-border)] hover:opacity-70 rounded-lg py-3 text-lg font-semibold cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        ))}

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex-1 text-white bg-[var(--wine)] hover:bg-[var(--wine-dark)] rounded-lg py-3 cursor-pointer"
          >
            C
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 text-white bg-[var(--wine)] hover:bg-[var(--wine-dark)] rounded-lg py-3 cursor-pointer"
          >
            DEL
          </button>
          <button
            onClick={handleEvaluate}
            className="flex-[2] bg-[var(--wine)] text-white hover:bg-[var(--wine-dark)] rounded-lg py-3 cursor-pointer"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
