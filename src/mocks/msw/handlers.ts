import { http, HttpResponse, ws } from "msw";
import { API_BASE_URL, WS_MESSAGE_INTERVAL, WS_URL } from "@config";
import { generateRandomMatches, updateMatches } from "../matches";

const liveUpdatesWs = ws.link(WS_URL);
const randomMatches = generateRandomMatches();

export const handlers = [
  http.get(`${API_BASE_URL}matches`, () => {
    return HttpResponse.json(randomMatches);
  }),
  liveUpdatesWs.addEventListener("connection", ({ client }) => {
    const interval = setInterval(() => {
      client.send(JSON.stringify(updateMatches(randomMatches)));
    }, WS_MESSAGE_INTERVAL);

    client.addEventListener("close", () => {
      clearInterval(interval);
    });
  }),
];
