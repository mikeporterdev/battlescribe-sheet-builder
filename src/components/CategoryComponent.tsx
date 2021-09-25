import * as React from "react";
import { Category } from "../services/types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRoster } from "./contexts/roster-context";

interface CategoryComponentProps {
  category: Category;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = (props) => {
  const { roster } = useRoster();

  const popover = (popoverProps: CategoryComponentProps) => (
    <Popover {...popoverProps} id="popover-basic">
      <Popover.Title as="h3">Keyword: {props.category.name}</Popover.Title>
      <Popover.Content>
        <>
          The following <b>units</b> have the keyword {props.category.name}:
          <ul>
            {roster.categoryMap.selections[props.category.name]?.map((i) => (
              <li>{i.name}</li>
            ))}
          </ul>
        </>
      </Popover.Content>
    </Popover>
  );

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
