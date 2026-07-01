import { SolverResult } from "../../../utils/solvers/solver";

interface ResultBoxProps {
  result: SolverResult | null;
}

export function ResultBox({ result }: ResultBoxProps) {
  if (!result) return null;

  const isOk = result.ok;

  return (
    <div
      className={`w-full h-fit rounded-4xl border p-6 bg-white rounded-4xl shadow-sm
        ${isOk ? "border-emerald-300 bg-white" : "border-red-300 bg-white"}
      `}
    >
      <span
        className={`
          inline-flex rounded-full px-3 py-1 text-[11px]
          font-bold uppercase tracking-wider mb-3
          ${
            isOk ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }
        `}
      >
        {isOk ? "Sucesso" : "Erro"}
      </span>

      <div
        className={`text-sm mb-1 ${isOk ? "text-slate-500" : "text-red-600"}`}
      >
        {result.title}
      </div>

      <div
        className={`
          font-mono text-2xl mb-4 break-words
          ${isOk ? "text-slate-900" : "text-red-700"}
        `}
      >
        {result.value}
      </div>

      {result.steps.length > 0 && (
        <div
          className={`
            rounded-2xl border p-4
            ${
              isOk ? "border-slate-200 bg-slate-50" : "border-red-200 bg-red-50"
            }
          `}
        >
          {result.steps.map((step, index) => (
            <p
              key={index}
              className={`
                font-mono text-sm leading-6
                ${index !== result.steps.length - 1 ? "mb-3" : ""}
                ${isOk ? "text-slate-600" : "text-red-700"}
              `}
            >
              {step}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
