import { Grid, Paper, Typography, Divider, Box } from "@mui/material";
import type { Match, Market, OddsSelection } from "@types";
import type { FC } from "react";
import MarketOdd from "./MarketOdd";
import { usePositionsDataActions } from "@contexts";
import type { PositionData } from "@contexts";

const renderMarketOdds = ({
  market,
  onOddRemove,
  onOddSelect,
  position,
}: {
  market: Market;
  onOddSelect: (selection: OddsSelection) => void;
  onOddRemove: () => void;
  position: PositionData;
}) => (
  <Grid container spacing={0.5}>
    {market.oddsSelections.map((selection) => (
      <Grid key={selection.id}>
        <MarketOdd
          selection={selection}
          onOddSelect={onOddSelect}
          position={position}
          onOddRemove={onOddRemove}
        />
      </Grid>
    ))}
  </Grid>
);

const MatchCard: FC<{ match: Match; position: PositionData }> = ({
  match,
  position,
}) => {
  const {
    id,
    sport: { icon },
    sides: { home, away },
    score,
    matchProgress,
    marketOdds,
  } = match;

  const { savePosition, removePosition } = usePositionsDataActions();

  const handleOddSelect = (selection: OddsSelection) =>
    savePosition({
      matchId: id,
      position: {
        match,
        selectedPosition: {
          optionName: selection.name,
          optionOdd: selection.odds,
          optionId: selection.id,
        },
      },
    });

  const handleOddRemove = () => removePosition({ matchId: id });

  return (
    <Paper key={id} sx={{ mb: 2, p: 1.5, borderRadius: 2 }}>
      <Grid container alignItems="center" sx={{ mb: 1 }}>
        <Grid size={{ xs: 5 }}>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src={home.logo}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="subtitle2">{home.name}</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 2 }} sx={{ textAlign: "center" }}>
          <Box width="100%" display="flex" justifyContent="center">
            <Box sx={{ width: 24, height: 24 }}>{icon}</Box>
          </Box>
          <Box position="relative">
            <Box
              sx={{
                position: "absolute",
                top: 4,
                left: "30%",
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "error.main",
                animation: "pulse 1.5s infinite",
              }}
            />
            <Typography variant="body2">
              {score.home} - {score.away}
            </Typography>
          </Box>
          <Typography variant="caption">{matchProgress.toFixed()}'</Typography>
        </Grid>

        <Grid size={{ xs: 5 }} sx={{ textAlign: "right" }}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Typography variant="subtitle2">{away.name}</Typography>
            <Box
              component="img"
              src={away.logo}
              sx={{ width: 24, height: 24, ml: 1 }}
            />
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Grid container spacing={1}>
        <Grid size={{ xs: 4 }}>
          <Typography variant="caption" color="textSecondary">
            1X2
          </Typography>
          {renderMarketOdds({
            market: marketOdds["1X2"],
            onOddSelect: handleOddSelect,
            position,
            onOddRemove: handleOddRemove,
          })}
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography variant="caption" color="textSecondary">
            Double Chance
          </Typography>
          {renderMarketOdds({
            market: marketOdds["DoubleChance"],
            onOddSelect: handleOddSelect,
            position,
            onOddRemove: handleOddRemove,
          })}
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography variant="caption" color="textSecondary">
            Total Goals
          </Typography>
          {renderMarketOdds({
            market: marketOdds["TotalGoals"],
            onOddSelect: handleOddSelect,
            position,
            onOddRemove: handleOddRemove,
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchCard;
