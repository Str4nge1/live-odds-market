import { useCallback, useState } from "react";

import { useWebSocket } from "@hooks";
import { WS_URL } from "@config";
import { type Matches, type MatchesResponse } from "@types";
import { getTransformedMatches } from "@utils";

import useMatches from "./useMatches";

const LiveOddsMarket = () => {
  const { data } = useMatches();
  const [liveMatches, setLiveMatches] = useState<MatchesResponse>({});

  const handleMatchesUpdate = useCallback((matches: Matches) => {
    const transformedMatches = getTransformedMatches(matches);

    setLiveMatches(transformedMatches);
  }, []);

  const { isError } = useWebSocket<Matches>({
    url: WS_URL,
    onMessage: handleMatchesUpdate,
  });

  const matches = {
    ...data,
    ...liveMatches,
  };

  if (isError) return <div>socket error</div>;

  const matchesArray = Object.values(matches);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {matchesArray.map(({ id, marketOdds }) => {
        return (
          <div key={id}>
            <p>{id}</p>
            <div>
              {marketOdds["1X2"].oddsSelections.map(
                ({ name, odds, prevOdds }) => {
                  return (
                    <div key={name}>
                      <div>id: ${name}</div>
                      <div>odds {odds}</div>
                      <div>prevOdss {prevOdds}</div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveOddsMarket;
