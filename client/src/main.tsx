import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./i18n";
import "./services/setupInterceptors.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import router from "./components/routing/routes.tsx";
import theme from "./theme.ts";

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
              <RouterProvider router={router} />
            </ErrorBoundary>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#0F1535",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                },
                success: {
                  iconTheme: {
                    primary: "#01B574",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#E31A1A",
                    secondary: "#fff",
                  },
                },
              }}
            />
            {import.meta.env.DEV && <ReactQueryDevtools />}
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
