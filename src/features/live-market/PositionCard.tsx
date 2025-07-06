import type { PositionData, RemovePositionPayload } from "@contexts";
import { DeleteForever } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { type FC } from "react";

const PositionCard: FC<{
  position: PositionData;
  removePosition: ({ matchId }: RemovePositionPayload) => void;
}> = ({ position, removePosition }) => {
  const {
    match: {
      id,
      sides: { home, away },
    },
    selectedPosition: { optionName, optionOdd },
  } = position;

  return (
    <Card sx={{ minWidth: 275, width: "100%", boxShadow: 3 }}>
      <CardContent sx={{ position: "relative" }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          textAlign="center"
        >
          {home.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          VS
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {away.name}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body1" fontWeight="bold">
            {optionName}
          </Typography>
        </Box>

        <Typography variant="h5" component="div" textAlign="right" mt={1}>
          {optionOdd}
        </Typography>
        <IconButton
          onClick={() => removePosition({ matchId: id })}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <DeleteForever />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PositionCard;
