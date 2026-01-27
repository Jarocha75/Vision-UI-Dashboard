import { Box, Button, Card, Typography } from "@mui/material";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            p: 3,
            background: "#060B28",
          }}
        >
          <Card
            sx={{
              maxWidth: 500,
              width: "100%",
              p: 4,
              textAlign: "center",
              background: `linear-gradient(
                126.97deg,
                rgba(10, 18, 65, 0.85) 28.26%,
                rgba(15, 22, 60, 0.8) 91.2%
              )`,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(245, 54, 92, 0.2) 0%, rgba(245, 54, 92, 0.1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <AlertTriangle size={40} color="#F5365C" />
            </Box>

            <Typography variant="h5" sx={{ mb: 1, color: "#fff" }}>
              Niečo sa pokazilo
            </Typography>

            <Typography variant="body2" sx={{ mb: 3, color: "#A0AEC0" }}>
              Vyskytla sa neočakávaná chyba. Skúste obnoviť stránku alebo sa vráťte späť.
            </Typography>

            {import.meta.env.DEV && this.state.error && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  background: "rgba(245, 54, 92, 0.1)",
                  border: "1px solid rgba(245, 54, 92, 0.3)",
                  textAlign: "left",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    color: "#F5365C",
                    wordBreak: "break-word",
                  }}
                >
                  {this.state.error.message}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={this.handleReset}
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    background: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                Skúsiť znova
              </Button>

              <Button
                variant="contained"
                startIcon={<RefreshCw size={18} />}
                onClick={this.handleReload}
                sx={{
                  background: "linear-gradient(135deg, #3A7BFF 0%, #0066FF 100%)",
                }}
              >
                Obnoviť stránku
              </Button>
            </Box>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
