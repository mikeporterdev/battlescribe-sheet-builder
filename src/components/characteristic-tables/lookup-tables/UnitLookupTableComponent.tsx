import * as React from "react";
import { UnitProfile } from "../../../services/types";
import { ModelSelectionComponent } from "../ModelSelectionComponent";

interface UnitLookupTableComponentInput {
  modelProfiles: UnitProfile[];
}

export const UnitLookupTableComponent = ({
  modelProfiles,
}: UnitLookupTableComponentInput) => {
  return <ModelSelectionComponent modelProfiles={modelProfiles} />;
};
