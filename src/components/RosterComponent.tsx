import * as React from "react";
import { Roster, Rule, Selection } from "../services/types";
import "./../assets/scss/Roster.scss";
import { ForceComponent } from "./ForceComponent";
import { CostsComponent } from "./CostsComponent";
import { sortByName } from "../utils/sort-by-name";

type RosterComponentProps = { roster: Roster };

const flattenSelectionRules = (roster: Roster): Rule[] => {
  return roster.forces
    .flatMap((force) => force.selections)
    .flatMap((selection) => getRulesForSelection(selection, []));
};

const getRulesForSelection = (selection: Selection, acc: Rule[]): Rule[] => {
  if (selection.selections) {
    return [
      ...acc,
      ...selection.rules,
      ...selection.selections.flatMap((selection) => {
        return getRulesForSelection(selection, acc);
      }),
    ];
  } else {
    return [...acc, ...selection.rules];
  }
};

export const RosterComponent: React.FC<RosterComponentProps> = ({ roster }) => {
  return (
    <div className={"roster-container"}>
      <h1 className={"roster-header"}>
        {roster.name} <CostsComponent costs={roster.costs} />
      </h1>
      {roster.forces.map((force) => (
        <ForceComponent key={force.name} force={force} />
      ))}
      <h3>Force Rules</h3>
      <ul style={{ whiteSpace: "pre-line" }}>
        {roster.forces
          .flatMap((force) => {
            return force.rules;
          })
          .sort(sortByName)
          .filter((val, id, array) => {
            return array.map((i) => i.name).indexOf(val.name) == id;
          })
          .map((rule) => (
            <li key={`force-rule-${rule.name}`}>
              <b>{rule.name}: </b>
              <span>{rule.description}</span>
            </li>
          ))}
      </ul>
      <h3>Selection Rules</h3>
      <ul style={{ whiteSpace: "pre-line" }}>
        {flattenSelectionRules(roster)
          .filter((val, id, array) => {
            return array.map((i) => i.name).indexOf(val.name) == id;
          })
          .sort(sortByName)

          .map((rule) => (
            <li key={`selection-rule-${rule.name}`}>
              <b>{rule.name}: </b>
              <span>{rule.description}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
