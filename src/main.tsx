import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";

import { enableMocking } from "@utils";
import { queryClient } from "@http";

import { PositionsContextProvider } from "@contexts";
import { CssBaseline } from "@mui/material";

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PositionsContextProvider>
          <CssBaseline />
          <App />
        </PositionsContextProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
