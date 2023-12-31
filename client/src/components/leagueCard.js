import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { randomThumb } from "../utils/main";
import { Button } from "@mui/material";

const LeagueCard = ({ isOwn, league, handleAdd, handleEdit, handleDelete }) => {
  const user = useSelector((state) => state.user.data);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card sx={{ display: "flex", width: "35vw" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={randomThumb()}
          alt={league.name}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {league.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {league.manager_name}
            </Typography>
          </CardContent>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {isOwn && (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleEdit(league.id)}
                  >
                    Edit League
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleDelete(league.id)}
                  >
                    Delete League
                  </Button>
                </>
              )}
              <Button
                size="small"
                variant="contained"
                sx={{ ml: 16 }}
                onClick={() => handleAdd(league.id)}
              >
                {isOwn ? "Add Team" : "Join League"}
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default LeagueCard;
