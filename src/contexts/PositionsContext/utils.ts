import { PositionActionsEnum } from "@enums";
import { initialState, type Action, type State } from "./store";

const POSITIONS_STORAGE_KEY = "positions-storage";

export const persistPositions = (positions: State["positions"]) => {
  localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions));
};

export const loadInitialState = (): State => {
  try {
    const saved = localStorage.getItem(POSITIONS_STORAGE_KEY);
    return saved ? { positions: JSON.parse(saved) } : initialState;
  } catch (error) {
    console.error("Failed to parse saved positions", error);
    return initialState;
  }
};

export const positionsReducer = (state: State, action: Action): State => {
  let newState: State;

  switch (action.type) {
    case PositionActionsEnum.SAVE_POSITION: {
      const { position, matchId } = action.payload;
      const newPositions = {
        ...state.positions,
        [matchId]: position,
      };

      persistPositions(newPositions);
      newState = { positions: newPositions };
      break;
    }

    case PositionActionsEnum.REMOVE_POSITION: {
      const { matchId } = action.payload;
      const newPositions = { ...state.positions };

      delete newPositions[matchId];

      persistPositions(newPositions);
      newState = { positions: newPositions };
      break;
    }

    case PositionActionsEnum.CLEAR_ALL_POSITIONS:
      persistPositions({});
      newState = { positions: {} };
      break;

    default:
      newState = state;
  }

  return newState;
};
