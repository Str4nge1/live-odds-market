import type { FC } from "react";
import { debounce } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import type { MatchesResponse } from "@types";
import type { Positions } from "@contexts";
import Row from "./Row";
import { getInitialScrollOffset, updateScrollOffset } from "./utils";

const handleScrollOffsetUpdate = debounce(updateScrollOffset, 150);

const MarketDashboard: FC<{ matches: MatchesResponse; positions: Positions }> = ({
  matches,
  positions,
}) => {
  const matchEntries = Object.values(matches || {});

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          itemData={{ matches: matchEntries, positions }}
          height={height}
          itemCount={matchEntries.length}
          itemSize={200}
          width={width}
          itemKey={(index) => matchEntries[index].id}
          initialScrollOffset={getInitialScrollOffset()}
          onScroll={(event) => handleScrollOffsetUpdate(event.scrollOffset)}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default MarketDashboard;
