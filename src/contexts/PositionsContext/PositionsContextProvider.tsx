import { useReducer, type FC, type PropsWithChildren } from "react";
import { initialState, PositionsDataContext } from "./store";
import { loadInitialState, positionsReducer } from "./utils";

const PositionsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    positionsReducer,
    initialState,
    loadInitialState
  );

  return (
    <PositionsDataContext.Provider value={{ state, dispatch }}>
      {children}
    </PositionsDataContext.Provider>
  );
};

export default PositionsContextProvider;
