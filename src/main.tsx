import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const application = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

const root = document.getElementById("root")!;
// Filter queries change the listing; prerendered files contain the unfiltered page.
if (root.dataset.prerendered === "true" && !new URLSearchParams(window.location.search).has("category")) {
  hydrateRoot(root, application);
} else {
  createRoot(root).render(application);
}
