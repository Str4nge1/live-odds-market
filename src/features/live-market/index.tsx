import { useCallback, useEffect, useState, useTransition } from "react";

import { useWebSocket } from "@hooks";
import { WS_URL } from "@config";
import { type Matches, type MatchesResponse } from "@types";
import { getTransformedMatches } from "@utils";
import { Loader } from "@widgets";
import { usePositionsData, loadInitialState } from "@contexts";

import useMatches from "./useMatches";
import MarketDashboard from "./MarketDashboard";

const LiveOddsMarket = () => {
  const { data, isPending } = useMatches();
  const [liveMatches, setLiveMatches] = useState<MatchesResponse>({});
  const [preservedMatches, setPreservedMatches] = useState<MatchesResponse>({});
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

  useEffect(() => {
    const { positions } = loadInitialState();

    if (Object.keys(positions).length) {
      const selectedPositionMatches = Object.fromEntries(
        Object.entries(positions).map(([matchId, position]) => [
          matchId,
          position.match,
        ])
      );

      setPreservedMatches(selectedPositionMatches);
    }
  }, []);

  const matches = {
    ...preservedMatches,
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
