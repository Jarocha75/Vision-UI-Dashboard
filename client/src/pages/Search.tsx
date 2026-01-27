import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearch } from "@/hooks/useSearch";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const Search = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { results, hasResults, resultCount } = useSearch(query);

  const getChipColor = (type: string) => {
    switch (type) {
      case "page":
        return "primary";
      case "author":
        return "secondary";
      case "project":
        return "success";
      case "billing":
        return "info";
      case "invoice":
        return "warning";
      case "transaction":
        return "error";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "page":
        return "Stránka";
      case "author":
        return "Autor";
      case "project":
        return "Projekt";
      case "billing":
        return "Billing";
      case "invoice":
        return "Faktúra";
      case "transaction":
        return "Transakcia";
      default:
        return type;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} color="white" mb={1}>
        Výsledky vyhľadávania
      </Typography>
      <Typography variant="body1" color="grey.400" mb={3}>
        {hasResults
          ? `Nájdených ${resultCount} výsledkov pre "${query}"`
          : `Žiadne výsledky pre "${query}"`}
      </Typography>

      {hasResults ? (
        <Card
          sx={{
            background: theme.palette.card.basic,
            borderRadius: "20px",
            border: `1px solid ${alpha("#fff", 0.1)}`,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <List>
              {results.map((result, index) => {
                const IconComponent = result.icon;
                return (
                  <ListItem
                    key={`${result.type}-${index}`}
                    disablePadding
                    divider={index < results.length - 1}
                    sx={{
                      borderColor: alpha("#fff", 0.1),
                    }}
                  >
                    <ListItemButton
                      onClick={() => navigate(result.path)}
                      sx={{
                        py: 2,
                        "&:hover": {
                          backgroundColor: alpha("#fff", 0.05),
                        },
                      }}
                    >
                      <ListItemAvatar>
                        {result.image ? (
                          <Avatar src={result.image} />
                        ) : (
                          <Avatar
                            sx={{
                              bgcolor: alpha(
                                theme.palette.primary.main,
                                0.2
                              ),
                            }}
                          >
                            {IconComponent && (
                              <IconComponent
                                sx={{ color: theme.palette.primary.main }}
                              />
                            )}
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                          >
                            <Typography color="white" fontWeight={500}>
                              {result.title}
                            </Typography>
                            <Chip
                              label={getTypeLabel(result.type)}
                              size="small"
                              color={getChipColor(result.type)}
                              sx={{ height: 20, fontSize: "0.7rem" }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="grey.500"
                            sx={{ mt: 0.5 }}
                          >
                            {result.subtitle}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            background: theme.palette.card.basic,
            borderRadius: "20px",
            border: `1px solid ${alpha("#fff", 0.1)}`,
            p: 6,
            textAlign: "center",
          }}
        >
          <SearchOffIcon
            sx={{ fontSize: 80, color: "grey.600", mb: 2 }}
          />
          <Typography variant="h6" color="grey.400">
            Nenašli sa žiadne výsledky
          </Typography>
          <Typography variant="body2" color="grey.600" mt={1}>
            Skús iný výraz alebo kľúčové slovo
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Search;
