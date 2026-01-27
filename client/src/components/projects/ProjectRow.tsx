import {
  Avatar,
  LinearProgress,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

interface Props {
  company: string;
  logo: string;
  members: string[];
  budget: number | null;
  completion: number;
}

const ProjectRow = ({ company, logo, members, budget, completion }: Props) => {
  const theme = useTheme();

  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={logo} sx={{ width: 32, height: 32 }} />
          <Typography fontSize={14} fontWeight={600}>
            {company}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack direction="row" spacing={-1}>
          {members.map((avatar, i) => (
            <Avatar
              key={i}
              src={avatar}
              sx={{
                width: 24,
                height: 24,
                fontSize: 12,
                border: `2px solid ${theme.palette.background.paper}`,
                backgroundColor: theme.palette.primary.main,
              }}
            >
              {!avatar && "U"}
            </Avatar>
          ))}
        </Stack>
      </TableCell>

      <TableCell>
        <Typography
          fontSize={14}
          fontWeight={600}
          color={budget ? "text.primary" : "text.secondary"}
        >
          {budget ? `$${budget.toLocaleString()}` : "Not set"}
        </Typography>
      </TableCell>

      <TableCell>
        <Stack spacing={1}>
          <Typography fontSize={12} fontWeight={600}>
            {completion}%
          </Typography>

          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              height: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.12)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#3A7BFF",
              },
            }}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
