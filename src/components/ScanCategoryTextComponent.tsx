import * as React from "react";
import { useRoster } from "./contexts/roster-context";
import { CategoryComponent } from "./CategoryComponent";
import { CombinedCategoryComponent } from "./CombinedCategoryComponent";

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

interface Lump {
  type: "keyword" | "text";
  text: string;
}

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
    const parsedAndSplit: Lump[] = splitString.map((t) => {
      if (allCategories.find((cat) => cat === t)) {
        return { type: "keyword", text: t };
      } else {
        return { type: "text", text: t };
      }
    });

    const splitAndGroupedCategories = parsedAndSplit.reduce((acc, i) => {
      if (i.type === "text" && i.text === " ") return acc;
      if (i.type === "text") {
        acc.push([i], []);
      } else {
        const lastElemInList = acc[acc.length - 1];
        if (lastElemInList) {
          lastElemInList.push(i);
        } else {
          acc.push([i]);
        }
      }
      return acc;
    }, [] as Lump[][]);

    return (
      <>
        {splitAndGroupedCategories.map((lumpArray) => {
          return (
            <>
              {lumpArray[0]?.type === "text" && (
                <span>{lumpArray[0].text}</span>
              )}
              {lumpArray[0]?.type === "keyword" && (
                <CombinedCategoryComponent
                  categories={lumpArray.map((lump) => ({
                    name: lump.text,
                    primary: false,
                  }))}
                />
              )}
            </>
          );
        })}
      </>
    );

    // return (
    //   <>
    //     {parsedAndSplit.map((textLump) => {
    //       if (textLump.type === "text") {
    //         return <span>{textLump.text}</span>;
    //       } else {
    //         return (
    //           <CategoryComponent
    //             category={{ name: textLump.text, primary: false }}
    //           />
    //         );
    //       }
    //     })}
    //   </>
    // );
  };
