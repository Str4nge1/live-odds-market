import { faker } from "@faker-js/faker";
import { type Match, type Side, type Sport } from "@types";

class RandomizedMatchGenerator {
  private readonly config = {
    odds: { min: 1.1, max: 12, decimals: 2 },
    overUnder: {
      minLine: 0.25,
      maxLine: 5.0,
      step: 0.25,
      minOdds: 1.2,
      maxOdds: 2.8,
    },
    timeOffset: { min: -90, max: -15 },
    scores: { maxPerTeam: 6, range: { min: 0, max: 4 } },
    sports: [
      { id: "soccer", name: "Soccer", icon: "⚽" },
      { id: "basketball", name: "Basketball", icon: "🏀" },
    ],
  };

  private createSport = (): Sport => {
    return faker.helpers.arrayElement(this.config.sports);
  };

  private generateRandomId(): string {
    return `Match-${crypto.randomUUID().slice(0, 6)}`;
  }

  private createSide(): Side {
    const nameComponents = [
      faker.location.city(),
      faker.company.buzzNoun(),
      faker.animal.type(),
      faker.color.human(),
    ];

    return {
      name: faker.helpers.shuffle(nameComponents).slice(0, 2).join(" "),
      logo: faker.image.avatar(),
    };
  }

  private generateSides() {
    const home = this.createSide();
    const maxAttempts = 10;
    let attempts = 0;
    let away: Side;

    while (attempts < maxAttempts) {
      away = this.createSide();

      // Success case - names are different
      if (away.name !== home.name) {
        return { home, away };
      }

      attempts++;
    }

    // Fallback after max attempts - guarantee unique name
    away = this.createSide();
    away.name = `${away.name}-${faker.string.alphanumeric(4)}`; // More reliable than random number
    return { home, away };
  }

  private calculateDynamicOdds(baseOdds: number): number {
    const variation = faker.number.float({
      min: 0.7,
      max: 1.3,
      fractionDigits: 2,
    });
    return parseFloat((baseOdds * variation).toFixed(2));
  }

  private generateMarketOdds() {
    const baseOdds = parseFloat(faker.finance.amount(this.config.odds));

    return {
      homeWin: this.calculateDynamicOdds(baseOdds),
      awayWin: this.calculateDynamicOdds(baseOdds),
      draw: parseFloat(
        (
          baseOdds *
          faker.number.float({ min: 1.1, max: 1.3, fractionDigits: 2 })
        ).toFixed(2)
      ),
    };
  }

  private createDoubleChanceMarkets(
    homeWin: number,
    awayWin: number,
    draw: number
  ) {
    const combinations = [
      { id: "1X", name: "1X", a: homeWin, b: draw },
      { id: "12", name: "12", a: awayWin, b: draw },
      { id: "X2", name: "X2", a: homeWin, b: awayWin },
    ];

    return combinations.map(({ a, b, ...rest }) => ({
      ...rest,
      odds: parseFloat(((a * b) / (a + b + 0.5)).toFixed(2)),
      prevOdds: parseFloat(((a * b) / (a + b + 0.5)).toFixed(2)),
    }));
  }

  private generateOverUnderMarket() {
    const { minLine, maxLine, step, minOdds, maxOdds } = this.config.overUnder;
    const possibleLines = Array.from(
      { length: Math.floor((maxLine - minLine) / step) + 1 },
      (_, i) => parseFloat((minLine + i * step).toFixed(1))
    );

    const line = faker.helpers.arrayElement(possibleLines);
    const randomOdds = () =>
      parseFloat(
        faker.number
          .float({ min: minOdds, max: maxOdds, fractionDigits: 2 })
          .toFixed(2)
      );

    const overOdds = randomOdds();
    const underOdds = randomOdds();

    return [
      {
        id: "over-line",
        name: "Over",
        odds: overOdds,
        prevOdds: overOdds,
        line,
      },
      {
        id: "under-line",
        name: "Under",
        odds: underOdds,
        prevOdds: underOdds,
        line,
      },
    ];
  }

  private buildMarkets(homeWin: number, awayWin: number, draw: number) {
    return {
      "1X2": {
        oddsSelections: [
          { id: "1", name: "1", odds: homeWin, prevOdds: homeWin },
          { id: "X", name: "X", odds: draw, prevOdds: draw },
          { id: "2", name: "2", odds: awayWin, prevOdds: awayWin },
        ],
      },
      DoubleChance: {
        oddsSelections: this.createDoubleChanceMarkets(homeWin, awayWin, draw),
      },
      TotalGoals: {
        oddsSelections: this.generateOverUnderMarket(),
      },
    };
  }

  private calculateMatchProgress(offset: number): number {
    const progress = Math.abs(offset) / 1.8;
    return offset < 0
      ? faker.number.float({
          min: progress * 0.9,
          max: Math.min(100, progress * 1.1),
        })
      : 0;
  }

  public generate(): Match {
    const sides = this.generateSides();
    const { homeWin, awayWin, draw } = this.generateMarketOdds();
    const matchStartTime = new Date();
    const randomSport = this.createSport();

    const timeOffset = faker.number.int(this.config.timeOffset);
    matchStartTime.setMinutes(matchStartTime.getMinutes() + timeOffset);

    return {
      id: this.generateRandomId(),
      sides,
      marketOdds: this.buildMarkets(homeWin, awayWin, draw),
      sport: randomSport,
      score: {
        home: Math.min(
          this.config.scores.maxPerTeam,
          faker.number.int(this.config.scores.range)
        ),
        away: Math.min(
          this.config.scores.maxPerTeam,
          faker.number.int(this.config.scores.range)
        ),
      },
      matchStartTime,
      matchProgress: this.calculateMatchProgress(timeOffset),
    };
  }
}

export const generateRandomMatch = (): Match => {
  return new RandomizedMatchGenerator().generate();
};
