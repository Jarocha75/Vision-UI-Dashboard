import { Box, LinearProgress } from "@mui/material";
import { getProgress } from "@/utils/progress";

type StatProgressProps = {
  value: number;
  max: number;
};

const StatProgress = ({ value, max }: StatProgressProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={getProgress(value, max)}
        sx={{
          height: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.12)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
            backgroundColor: "#3A7BFF",
          },
        }}
      />
    </Box>
  );
};

export default StatProgress;
