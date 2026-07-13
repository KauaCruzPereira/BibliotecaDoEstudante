import { useState } from "react";
import { CalculatorSelector } from "../../components/TabSelector";
import { BasicCalculator } from "../../components/CalculatorSteps/BasicCalculator";
import { FirstDegreeCalculator } from "../../components/CalculatorSteps/FirstDegreeCalculator";
import { ResultBox } from "../../components/Results/Box";
import { ResultsText } from "../../components/Results/Text";
import { CalculatorTypes } from "../../types/calculators.type";
import { SolverResult } from "../../utils/solvers/solver";
import { SecondDegreeCalculator } from "../../components/CalculatorSteps/SecondDegreeCalculator";
import { SystemsCalculator } from "../../components/CalculatorSteps/SystemsCalculator";
import { APCalculator } from "../../components/CalculatorSteps/APcalculator";
import { GPCalculator } from "../../components/CalculatorSteps/GPcalculator";
import { ExponentialCalculator } from "../../components/CalculatorSteps/ExponentialCalculator";
import { PercentageCalculator } from "../../components/CalculatorSteps/PercentageCalculator";
import { RuleOfThreeCalculator } from "../../components/CalculatorSteps/RuleOfThreeCalculator";

export const StepCalculator = () => {
  const [calculatorType, setCalculatorType] =
    useState<CalculatorTypes>("basica");
  const [result, setResult] = useState<SolverResult | null>(null);

  const TAB_LABELS: { id: CalculatorTypes; label: string }[] = [
    { id: "basica", label: "Calculadora" },
    { id: "primeiroG", label: "1º Grau" },
    { id: "segundoG", label: "2º Grau" },
    { id: "sistemas", label: "Sistemas" },
    { id: "pa", label: "PA" },
    { id: "pg", label: "PG" },
    { id: "exponencial", label: "Exponencial" },
    { id: "porcentagem", label: "Porcentagem" },
    { id: "regra3", label: "Regra de 3" },
  ];

  const handleSetCalculatorType = (type: CalculatorTypes) => {
    setCalculatorType(type);
    setResult(null);
  };

  const calculators = {
    basica: <BasicCalculator onResultChange={setResult} />,
    primeiroG: <FirstDegreeCalculator onResultChange={setResult} />,
    segundoG: <SecondDegreeCalculator onResultChange={setResult} />,
    sistemas: <SystemsCalculator onResultChange={setResult} />,
    pa: <APCalculator onResultChange={setResult} />,
    pg: <GPCalculator onResultChange={setResult} />,
    exponencial: <ExponentialCalculator onResultChange={setResult} />,
    porcentagem: <PercentageCalculator onResultChange={setResult} />,
    regra3: <RuleOfThreeCalculator onResultChange={setResult} />,
  };

  return (
    <main className="px-2 py-4 sm:p-6 lg:p-8 mb-40">
      <h1 className="text-[#3b3f48] font-black text-[clamp(1.0rem,1.5vw,2rem)]">
        Calculadora Passo a Passo
      </h1>

      <CalculatorSelector
        active={calculatorType}
        onChange={handleSetCalculatorType}
        labels={TAB_LABELS}
      />

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:basis-[55%] lg:max-w-[55%]">
          {calculators[calculatorType]}
        </div>

        <div className="w-full lg:basis-[45%] lg:max-w-[45%]">
          {result ? <ResultBox result={result} /> : <ResultsText />}
        </div>
      </div>
    </main>
  );
};
