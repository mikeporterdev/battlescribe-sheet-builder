import * as React from "react";
import { useRoster } from "./contexts/roster-context";
import { CategoryComponent } from "./CategoryComponent";

interface ScanCategoryTextComponentProps {
  text: string;
}

const tokenIndexes = (
  text: string,
  keywords: string[],
): { start: number; end: number; keyword: string }[] => {
  const filter = keywords
    .flatMap((keyword) => {
      const startingIndices = [];

      let indexOccurence = text.indexOf(keyword, 0);

      while (indexOccurence >= 0) {
        startingIndices.push(indexOccurence);

        indexOccurence = text.indexOf(keyword, indexOccurence + 1);
      }

      return startingIndices.map((idx) => {
        return {
          start: idx,
          end: idx + keyword.length,
          keyword,
        };
      });
    })
    .filter((i) => i);
  return filter;
};

const splitOn = (slicable: string, ...indices) =>
  [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));

export const ScanCategoryTextComponent: React.FC<ScanCategoryTextComponentProps> =
  ({ text }) => {
    const { roster } = useRoster();

    const allCategoryKeys = Object.keys(roster.categoryMap.selections);
    const allCategories = allCategoryKeys.map((cat) => cat.toUpperCase());

    const message = tokenIndexes(text, allCategories).sort((a, b) =>
      a.start < b.start ? -1 : 0,
    );
    const splitString = splitOn(
      text,
      ...message.flatMap((i) => [i.start, i.end]),
    );
    const parsedAndSplit = splitString.map((t) => {
      if (allCategories.find((cat) => cat === t)) {
        return { type: "keyword", text: t };
      } else {
        return { type: "text", text: t };
      }
    });

    return (
      <>
        {parsedAndSplit.map((textLump) => {
          if (textLump.type === "text") {
            return <span>{textLump.text}</span>;
          } else {
            return (
              <CategoryComponent
                category={{ name: textLump.text, primary: false }}
              />
            );
          }
        })}
      </>
    );
  };
