import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import React from "react";

export interface SocialMediaItem {
  name: string;
  icon: React.ReactNode;
  link: string;
}

interface Props {
  items: SocialMediaItem[];
}

const SocialMediaLink = ({ items }: Props) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ pl: { xs: 1, sm: 3 }, pb: { xs: 1, sm: 0 } }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: { xs: 12, sm: 14 },
          color: theme.palette.text.secondary,
        }}
      >
        Social Media:{" "}
      </Typography>
      <Stack direction="row" spacing={0.5}>
        {items.map((social) => (
          <IconButton
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${social.name}`}
            sx={{
              padding: { xs: 0.5, sm: 1 },
              "& svg": {
                fontSize: { xs: "1rem", sm: "1.25rem" },
              },
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};

export default SocialMediaLink;
