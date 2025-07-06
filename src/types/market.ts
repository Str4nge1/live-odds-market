import type { OddAnimationEnum } from "@enums";

export const marketOdds = ["1X2", "DoubleChance", "TotalGoals"] as const;

export type MarketType = (typeof marketOdds)[number];

export type Sport = {
  id: string;
  name: string;
  icon: string;
};

export type Side = {
  name: string;
  logo: string;
};

export type OddsSelection = {
  id: string;
  name: string;
  odds: number;
  prevOdds?: number;
  line?: number;
};

export type Market = {
  oddsSelections: OddsSelection[];
};

export type Match = {
  id: string;
  marketOdds: Record<MarketType, Market>;
  sport: Sport;
  score: {
    home: number;
    away: number;
  };
  sides: {
    home: Side;
    away: Side;
  };
  matchStartTime: string | Date;
  matchProgress: number;
};

export type Matches = Match[];

export type MatchesResponse = Record<string, Match>;

export type UpdateMatchesConfig = {
  count?: number;
  updateIntensity?: number;
};

export type OddAnimationType = OddAnimationEnum;
