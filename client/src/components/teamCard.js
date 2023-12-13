import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { randomThumb, getCookie } from "../utils/main";

const TeamCard = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.data);
  const [team, setTeam] = useState({});

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/teams/${id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });
        setTeam(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) {
      getTeam();
    }
  }, [id]);

  const handleEdit = () => {
    console.log("edit");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div>
      <h1>TeamCard</h1>
      <h2>{team.name}</h2>
      <h2>{team.league?.name}</h2>
      {console.log(team.players)}
    </div>
    // <Grid
    //   item
    //   xs={12}
    //   sm={6}
    //   sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    // >
    //   <Card sx={{ display: "flex", width: "35vw" }}>
    //     <CardMedia
    //       component="img"
    //       sx={{ width: 151 }}
    //       image={randomThumb()}
    //       alt={team.name}
    //     />
    //     <Box sx={{ display: "flex", flexDirection: "column" }}>
    //       <CardContent sx={{ flex: "1 0 auto" }}>
    //         <Typography component="div" variant="h5">
    //           {team.name}
    //         </Typography>
    //         <Typography
    //           variant="subtitle1"
    //           color="text.secondary"
    //           component="div"
    //         >
    //           {team.league.name}
    //         </Typography>
    //       </CardContent>
    //       <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
    //         <Button size="small" variant="contained" onClick={handleEdit}>
    //           Edit Team
    //         </Button>
    //         <Button size="small" variant="contained" onClick={handleDelete}>
    //           Delete Team
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Card>
    // </Grid>
  );
};

export default TeamCard;
