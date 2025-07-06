import type { Matches, MatchesResponse } from "@types";

// https://mswjs.io/docs/integrations/browser/
export async function enableMocking() {
  const { serviceWorker } = await import("../mocks");

  if (import.meta.env.MODE !== "development") {
    return serviceWorker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }

  // `serviceWorker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return serviceWorker.start();
}

export const getTransformedMatches = (matches: Matches): MatchesResponse =>
  matches.reduce<MatchesResponse>((acc, match) => {
    acc[match.id] = match;
    return acc;
  }, {});
