import { useState } from "react";
import { BasicCalculator } from "../../components/CalculatorSteps/BasicCalculator";
import { ResultBox } from "../../components/Results/Box";
import { ResultsText } from "../../components/Results/Text";
import { CalculatorSelector } from "../../components/CalculatorSelector";
import { SolverResult } from "../../utils/solvers/solver";
import { CalculatorTypes } from "../../types/calculators.type";


export const StepCalculator = () => {
  const [calculatorType, setCalculatorType] =
    useState<CalculatorTypes>("basica");
  const [result, setResult] = useState<SolverResult | null>(null);

  const calculators = {
    basica: <BasicCalculator onResultChange={setResult} />,
    /*     primeiroG: <FirstDegreeCalculator />,
    segundoG: <SecondDegreeCalculator />,
    sistemas: <SystemsCalculator />,
    pa: <PACalculator />,
    pg: <PGCalculator />,
    exponencial: <ExponentialCalculator />,
    porcentagem: <PercentageCalculator />,
    regra3: <RuleOfThreeCalculator />, */
  };

  return (
    <main className="px-2 py-4 sm:p-6 lg:p-8">
      <h1 className="text-[#3b3f48] font-black text-[clamp(1.0rem,1.5vw,2rem)]">
        Calculadora Passo a Passo
      </h1>

      <CalculatorSelector active={calculatorType} onChange={setCalculatorType} />

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
