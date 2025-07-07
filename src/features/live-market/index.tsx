import { useCallback, useState, useTransition } from "react";

import { useWebSocket } from "@hooks";
import { WS_URL } from "@config";
import { type Matches, type MatchesResponse } from "@types";
import { getTransformedMatches } from "@utils";
import { Loader } from "@widgets";
import { usePositionsData } from "@contexts";

import useMatches from "./useMatches";
import MarketDashboard from "./MarketDashboard";

const LiveOddsMarket = () => {
  const { data, isPending } = useMatches();
  const [liveMatches, setLiveMatches] = useState<MatchesResponse>({});
  const [, startTransition] = useTransition();
  const {
    state: { positions },
  } = usePositionsData();

  const handleMatchesUpdate = useCallback((matches: Matches) => {
    startTransition(() => {
      const transformedMatches = getTransformedMatches(matches);

      setLiveMatches(transformedMatches);
    });
  }, []);

  const { isError } = useWebSocket<Matches>({
    url: WS_URL,
    onMessage: handleMatchesUpdate,
  });

  const matches = {
    ...data,
    ...liveMatches,
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) return <div>socket connection error</div>;

  return <MarketDashboard matches={matches} positions={positions} />;
};

export default LiveOddsMarket;
