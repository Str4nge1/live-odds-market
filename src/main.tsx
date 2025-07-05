import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";

import { enableMocking } from "@utils";
import { queryClient } from "@http";

import "./index.css";
import { PositionsContextProvider } from "@contexts";

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PositionsContextProvider>
          <App />
        </PositionsContextProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
