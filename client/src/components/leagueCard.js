import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import thumb1 from "../assets/images/thumbs/thumb-1.jpg";
import thumb2 from "../assets/images/thumbs/thumb-2.jpg";
import thumb3 from "../assets/images/thumbs/thumb-3.jpg";
import thumb4 from "../assets/images/thumbs/thumb-4.jpg";
import thumb5 from "../assets/images/thumbs/thumb-5.jpg";

const LeagueCard = ({ league }) => {
  const randomThumb = () => {
    return Math.random();
  };
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
          image={team.logo}
          alt={team.code}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {team.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {venue.name}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default LeagueCard;
