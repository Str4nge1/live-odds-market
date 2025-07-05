import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const serviceWorker = setupWorker(...handlers);

export default serviceWorker