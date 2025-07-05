import { PositionActionsEnum } from "@enums";
import type { RemovePositionPayload, SavePositionPayload } from "./store";
import usePositionsData from "./usePositionsData";

const usePositionsDataActions = () => {
  const { dispatch } = usePositionsData();

  return {
    savePosition: ({ matchId, position }: SavePositionPayload) =>
      dispatch({
        type: PositionActionsEnum.SAVE_POSITION,
        payload: { position, matchId },
      }),

    removePosition: ({ matchId }: RemovePositionPayload) =>
      dispatch({
        type: PositionActionsEnum.REMOVE_POSITION,
        payload: { matchId },
      }),

    removeAllPositions: () =>
      dispatch({ type: PositionActionsEnum.CLEAR_ALL_POSITIONS }),
  };
};

export default usePositionsDataActions;
