import * as React from "react";
import { Cost } from "../services/types";

interface CostsComponentProps {
  costs: Cost[];
}

export const CostsComponent: React.FC<CostsComponentProps> = ({ costs }) => {
  const relevantCosts = costs
    .filter((cost) => cost.name !== "PL")
    .filter((cost) => cost.value != 0);

  if (!relevantCosts.length) {
    return null;
  }

  console.log(relevantCosts);
  return (
    <>
      {" "}
      [{relevantCosts.map((cost) => "" + cost.value + cost.name).join(", ")}]
    </>
  );
};
