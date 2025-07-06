import type { FC } from "react";
import { usePositionsData } from "@contexts";
import { Box, Typography } from "@mui/material";
import PositionCard from "./PositionCard";
import type { RemovePositionPayload } from "@contexts";

const PositionsContent: FC<{
  removePosition: ({ matchId }: RemovePositionPayload) => void;
}> = ({ removePosition }) => {
  const {
    state: { positions },
  } = usePositionsData();

  const positionsData = Object.values(positions);

  if (!positionsData.length)
    return <Typography>No Positions Selected</Typography>;

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {positionsData.map((position) => (
        <PositionCard position={position} removePosition={removePosition} />
      ))}
    </Box>
  );
};

export default PositionsContent;
