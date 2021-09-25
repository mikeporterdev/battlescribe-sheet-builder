import * as React from "react";
import { useRoster } from "./contexts/roster-context";
import { CategoryComponent } from "./CategoryComponent";

interface ScanCategoryTextComponentProps {
  text: string;
}

// function splitMulti(str: string, keywords: string[]) {
//   return keywords.reduce((acc, keyword) => {});
// }
//
// function splitTextByKeyword(
//   str: string,
//   keyword: string,
// ): { text: string; type: "text" | "keyword" }[] {
//   const split = str.split(keyword).map((text) => {
//     return { text, type: "text" as const };
//   });
//
//   console.log(str);
//   console.log(split, keyword);
//
//   const flatMap = split.flatMap((value, index, array) =>
//     array.length - 1 !== index // check for the last item
//       ? [value, { text: keyword, type: "keyword" as const }]
//       : value,
//   );
//   console.log(flatMap);
//   return flatMap;
// }

const tokenIndexes = (
  text: string,
  keywords: string[],
): { start: number; end: number; keyword: string }[] => {
  const filter = keywords
    .map((keyword) => {
      const index = text.indexOf(keyword);
      if (index === -1) return undefined;

      return {
        start: index,
        end: index + keyword.length,
        keyword,
      };
    })
    .filter((i) => i);
  console.log(text);
  console.log(filter);
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
