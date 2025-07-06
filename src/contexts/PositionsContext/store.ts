import type { PositionActionsEnum } from "@enums";
import type { Match } from "@types";
import type { Dispatch } from "react";
import { createContext } from "react";

export type PositionData = {
  match: Match;
  selectedPosition: {
    optionName: string;
    optionOdd: number;
    optionId: string
  };
};

export type Positions = Record<string, PositionData>

export type State = {
  positions: Positions;
};

export type SavePositionPayload = {
  position: PositionData;
  matchId: string;
};

export type RemovePositionPayload = {
  matchId: string;
};

export type Action =
  | {
      type: PositionActionsEnum.SAVE_POSITION;
      payload: SavePositionPayload;
    }
  | {
      type: PositionActionsEnum.REMOVE_POSITION;
      payload: RemovePositionPayload;
    }
  | { type: PositionActionsEnum.CLEAR_ALL_POSITIONS };

export const initialState: State = {
  positions: {},
};

export const PositionsDataContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});
