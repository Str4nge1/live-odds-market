import { generateRandomMatch } from "./randomMatch";
import { LIVE_MATCHES_NUMBER, MATCHES_TO_UPDATE_NUMBER } from "@config";
import type { Match, Matches, UpdateMatchesConfig } from "@types";

export const generateRandomMatches = (
  count: number = LIVE_MATCHES_NUMBER
): Matches => Array.from({ length: count }).map(generateRandomMatch);

const getRandomMatch = (matches: Match[]) => {
  const weightedIndex = Math.floor(
    Math.pow(Math.random(), 1.5) * matches.length
  );
  return matches[weightedIndex];
};

const adjustOdds = (value: number, volatility: number): number => {
  // Use a non-linear adjustment curve for realistic odds movement
  const direction = Math.random() > 0.4 ? 1 : -1; // 60% chance to increase
  const change = direction * Math.pow(Math.random(), 2) * volatility * 1.3;
  const newValue = value * (1 + change / 100);
  return parseFloat(Math.max(newValue, 1.02).toFixed(3)); // Higher minimum odds
};

export const updateMatches = (
  matches: Matches,
  {
    count = MATCHES_TO_UPDATE_NUMBER,
    updateIntensity = 0.7,
  }: UpdateMatchesConfig = {}
) => {
  const updatedMatches: Matches = [];
  const updateThreshold = 0.6 * updateIntensity; // Higher base threshold

  // Create more updates but with smaller changes
  const effectiveCount = Math.min(Math.floor(count * 1.3), matches.length);

  for (let i = 0; i < effectiveCount; i++) {
    const selectedMatch = getRandomMatch(matches);
    const marketOdds = { ...selectedMatch.marketOdds };
    const volatility = 3.2 * updateIntensity; // Higher base volatility

    // Update both markets more frequently (30% chance to update both)
    if (Math.random() < updateThreshold) {
      marketOdds["1X2"].oddsSelections = marketOdds["1X2"].oddsSelections.map(
        (s) => ({
          ...s,
          odds: adjustOdds(s.odds, volatility),
          prevOdds: s.odds,
        })
      );
    }

    if (Math.random() < updateThreshold * 0.9) {
      marketOdds["DoubleChance"].oddsSelections = marketOdds[
        "DoubleChance"
      ].oddsSelections.map((s) => ({
        ...s,
        odds: adjustOdds(s.odds, volatility * 0.8), // Less volatility for double chance
        prevOdds: s.odds,
      }));
    }

    // Add score updates 20% of the time
    if (Math.random() < 0.2) {
      const scoreChange = Math.random() > 0.7 ? 1 : 0; // 30% chance of score change
      if (Math.random() > 0.5) {
        selectedMatch.score.home += scoreChange;
      } else {
        selectedMatch.score.away += scoreChange;
      }
    }

    updatedMatches.push({
      ...selectedMatch,
      marketOdds,
    });
  }

  return updatedMatches;
};
