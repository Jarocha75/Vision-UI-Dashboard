import { Box, useMediaQuery, useTheme } from "@mui/material";

interface ArcProgressProps {
  value: number;
  size?: number | { xs: number; md: number };
  thickness?: number;
  startAngle?: number;
  endAngle?: number;
  gradientId?: string;
  gradientStart?: string;
  gradientEnd?: string;
  clip?: "top" | "bottom" | "left" | "right" | "none";
}

const ArcProgress = ({
  value,
  size = 260,
  thickness = 12,
  startAngle = 180,
  endAngle = 360,
  gradientId = "arcGradient",
  gradientStart = "#3A7BFF",
  gradientEnd = "#00E1FF",
  clip = "none",
}: ArcProgressProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const numericSize =
    typeof size === "number"
      ? size
      : isMobile
      ? size.xs
      : size.md;
  const radius = (numericSize - thickness) / 2;

  const sweepAngle = endAngle - startAngle;
  const progressAngle = (value / 100) * sweepAngle;

  const polarToCartesian = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: numericSize / 2 + radius * Math.cos(rad),
      y: numericSize / 2 + radius * Math.sin(rad),
    };
  };

  const arcStart = polarToCartesian(startAngle);
  const arcEnd = polarToCartesian(startAngle + sweepAngle);
  const arcProgressEnd = polarToCartesian(startAngle + progressAngle);

  const largeArcFlag = sweepAngle > 180 ? 1 : 0;
  const progressLargeArcFlag = progressAngle > 180 ? 1 : 0;

  // --- CLIPPING --- //
  const clipStyle: React.CSSProperties = {
    width: numericSize,
    height: numericSize,
    overflow: "hidden",
    position: "relative",
  };

  if (clip === "top") {
    clipStyle.height = numericSize / 2;
  } else if (clip === "bottom") {
    clipStyle.height = numericSize / 2;
    clipStyle.top = -(numericSize / 2);
  } else if (clip === "left") {
    clipStyle.width = numericSize / 2;
  } else if (clip === "right") {
    clipStyle.width = numericSize / 2;
    clipStyle.left = -(numericSize / 2);
  }

  return (
    <Box sx={clipStyle}>
      <svg
        width={numericSize}
        height={numericSize}
        style={{ position: "absolute" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>

        {/* BACK ARC */}
        <path
          d={`
            M ${arcStart.x} ${arcStart.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}
          `}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />

        {/* PROGRESS ARC */}
        <path
          d={`
            M ${arcStart.x} ${arcStart.y}
            A ${radius} ${radius} 0 ${progressLargeArcFlag} 1 ${arcProgressEnd.x} ${arcProgressEnd.y}
          `}
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

export default ArcProgress;
