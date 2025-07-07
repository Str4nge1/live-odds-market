import { http, HttpResponse, ws } from "msw";
import { API_BASE_URL, WS_MESSAGE_INTERVAL, WS_URL } from "@config";
import { generateRandomMatches, updateMatches } from "../matches";
import { loadInitialState } from "@contexts";

const liveUpdatesWs = ws.link(WS_URL);

const loadPreservedMatches = () => {
  // get preserved matches
  // and swap random matches data
  const { positions } = loadInitialState();
  const matches = generateRandomMatches();

  Object.values(positions).forEach(({ match, matchIndex }) => {
    matches[matchIndex] = match;
  });

  return matches;
};

const matches = loadPreservedMatches();

export const handlers = [
  http.get(`${API_BASE_URL}matches`, () => {
    return HttpResponse.json(matches);
  }),
  liveUpdatesWs.addEventListener("connection", ({ client }) => {
    const interval = setInterval(() => {
      client.send(JSON.stringify(updateMatches(matches)));
    }, WS_MESSAGE_INTERVAL);

    client.addEventListener("close", () => {
      clearInterval(interval);
    });
  }),
];
