const API_BASE_URL = "/live-odds/api/";
const WS_URL = "wss://live-odds.com";
const WS_MESSAGE_INTERVAL = 3000; // update in every 3 seconds
const LIVE_MATCHES_NUMBER = 12_000;
const MATCHES_TO_UPDATE_NUMBER = LIVE_MATCHES_NUMBER * 0.1; // update 10% of live matches each time

export {
  API_BASE_URL,
  LIVE_MATCHES_NUMBER,
  MATCHES_TO_UPDATE_NUMBER,
  WS_URL,
  WS_MESSAGE_INTERVAL,
};
