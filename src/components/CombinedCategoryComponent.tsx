import * as React from "react";
import { Category } from "../services/types";
import { useRoster } from "./contexts/roster-context";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { UnitNameComponent } from "./UnitNameComponent";
import { HashLink } from "react-router-hash-link";
import { getAllCategories } from "./SelectionInfoComponent";

interface CombinedCategoryComponentProps {
  categories: Category[];
}

export const CombinedCategoryComponent: React.FC<CombinedCategoryComponentProps> =
  ({ categories }) => {
    const { roster } = useRoster();
    const categoryNames = categories.map((cat) => cat.name).join(" ");

    const popover = (popoverProps: CombinedCategoryComponentProps) => {
      const matchingSelections = roster.forces
        .flatMap((force) => force.selections)
        .filter((selection) => {
          return categories.every((cat) => {
            const strings = getAllCategories(selection, []).map((i) =>
              i.name.toLowerCase(),
            );
            return strings.includes(cat.name.toLowerCase());
          });
        })
        ?.filter((val, id, array) => {
          return array.map((i) => i.name).indexOf(val.name) == id;
        });

      return (
        <Popover {...popoverProps} id="popover-basic">
          <Popover.Title as="h3">Keywords: {categoryNames}</Popover.Title>
          <Popover.Content>
            <>
              The following <b>units</b> in your sheet have the keywords{" "}
              {categoryNames}:
              <ul>
                {matchingSelections?.map((selection) => (
                  <li key={`popover-content-unit-name-${selection.id}`}>
                    <HashLink
                      key={`navigator-link-${selection.id}`}
                      smooth
                      to={"#" + selection.id}
                    >
                      <UnitNameComponent selection={selection} />
                    </HashLink>
                  </li>
                ))}
              </ul>
            </>
          </Popover.Content>
        </Popover>
      );
    };

    return (
      <OverlayTrigger
        trigger={["click"]}
        placement={"right"}
        overlay={popover}
        rootClose
      >
        <span style={{ borderBottom: "1px dashed" }}>{categoryNames}</span>
      </OverlayTrigger>
    );
  };
