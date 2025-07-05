import { useContext } from "react";
import { PositionsDataContext } from "./store";

const usePositionsData = () => {
  const context = useContext(PositionsDataContext);

  if (!context) {
    throw new Error(
      "usePositionsData must be used within a PositionsDataProvider"
    );
  }

  return context;
};

export default usePositionsData;
