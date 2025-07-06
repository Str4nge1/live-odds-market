import { type FC } from "react";
import { Sidebar } from "@widgets";
import { usePositionsData, usePositionsDataActions } from "@contexts";
import type { SidebarActions } from "@types";
import PositionsContent from "./PositionsContent";

const PositionsSidebar: FC<{ open: boolean; onToggle: () => void }> = ({
  open,
  onToggle,
}) => {
  const { removeAllPositions, removePosition } = usePositionsDataActions();
  const {
    state: { positions },
  } = usePositionsData();

  const hasPositions = Object.keys(positions).length > 0;

  const SIDEBAR_ACTIONS: SidebarActions = [
    {
      label: "Clear Positions",
      variant: "outlined",
      execute: removeAllPositions,
    },
    {
      label: "Place Bet",
      variant: "contained",
      execute: () => {
        alert("Bet Placed");
        removeAllPositions();
        onToggle();
      },
      disabled: !hasPositions,
    },
  ];

  return (
    <Sidebar
      open={open}
      onToggle={onToggle}
      title="Positions"
      actions={SIDEBAR_ACTIONS}
    >
      <PositionsContent removePosition={removePosition} />
    </Sidebar>
  );
};

export default PositionsSidebar;
