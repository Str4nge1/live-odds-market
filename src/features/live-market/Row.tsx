import type { Matches } from "@types";
import MatchCard from "./MatchCard";
import type { Positions } from "@contexts";

const Row = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: {
    matches: Matches;
    positions: Positions;
  };
}) => {
  const { matches, positions } = data;
  const match = matches[index];
  const position = positions[match.id];

  return (
    <div style={style}>
      <MatchCard match={match} position={position} />
    </div>
  );
};

export default Row;
