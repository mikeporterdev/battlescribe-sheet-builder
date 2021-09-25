import * as React from "react";
import { Category } from "../services/types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRoster } from "./contexts/roster-context";

interface CategoryComponentProps {
  category: Category;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = (props) => {
  const { roster } = useRoster();

  const popover = (popoverProps: CategoryComponentProps) => {
    const selections = roster.categoryMap.selections;
    const matchingCategories =
      selections[
        Object.keys(selections).find(
          (key) => key.toLowerCase() === props.category.name.toLowerCase(),
        )
      ];
    return (
      <Popover {...popoverProps} id="popover-basic">
        <Popover.Title as="h3">Keyword: {props.category.name}</Popover.Title>
        <Popover.Content>
          <>
            The following <b>units</b> in your sheet have the keyword{" "}
            {props.category.name}:
            <ul>
              {matchingCategories?.map((i) => (
                <li>{i.name}</li>
              ))}
            </ul>
          </>
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={"right"}
      overlay={popover}
    >
      <span>{props.category.name}</span>
    </OverlayTrigger>
  );
};
