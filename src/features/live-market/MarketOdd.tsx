import { useEffect, useState, type FC } from "react";
import { OddAnimationEnum } from "@enums";
import { Button, styled, Typography } from "@mui/material";
import type { OddAnimationType, OddsSelection } from "@types";
import type { PositionData } from "@contexts";

const OddsButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "animation",
})<{ animation: OddAnimationType | null; isSelected: boolean }>(
  ({ theme, animation, isSelected }) => ({
    minWidth: 0,
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.25),
    fontWeight: "bold",
    backgroundColor: isSelected ? theme.palette.success.dark : "inherit",
    color: isSelected ? theme.palette.common.white : "inherit",
    animation: animation && !isSelected ? `${animation} 1s ease-in` : "none",
    "@keyframes increase": {
      "0%": { backgroundColor: theme.palette.success.light },
      "100%": { backgroundColor: "inherit" },
    },
    "@keyframes decrease": {
      "0%": { backgroundColor: theme.palette.error.light },
      "100%": { backgroundColor: "inherit" },
    },
  })
);

const MarketOdd: FC<{
  selection: OddsSelection;
  onOddSelect: (selection: OddsSelection) => void;
  onOddRemove: () => void;
  position?: PositionData;
}> = ({ selection, onOddSelect, position, onOddRemove }) => {
  const { id, name, odds, prevOdds } = selection;
  const [animationClass, setAnimationClass] = useState<OddAnimationType | null>(
    null
  );

  const isSelected = id === position?.selectedPosition.optionId;

  useEffect(() => {
    if (!(odds && prevOdds)) return;

    if (odds !== prevOdds) {
      if (odds > prevOdds) setAnimationClass(OddAnimationEnum.ODD_INCREASE);
      else setAnimationClass(OddAnimationEnum.ODD_DECREASE);
    }

    const timeout = setTimeout(() => setAnimationClass(null), 1000);
    return () => clearTimeout(timeout);
  }, [odds, prevOdds]);

  return (
    <>
      <Typography variant="body2" textAlign="center">
        {name}
      </Typography>
      <OddsButton
        variant="outlined"
        size="small"
        animation={animationClass}
        onClick={() => {
          if (isSelected) {
            onOddRemove();
            return
          }
          onOddSelect(selection);
        }}
        isSelected={isSelected}
      >
        {odds.toFixed(2)}
      </OddsButton>
    </>
  );
};

export default MarketOdd;
