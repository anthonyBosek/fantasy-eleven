import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { getCookie } from "../utils/main";

const teamSchema = yup.object().shape({
  name: yup.string().required("League name is required"),
});

const initialValues = {
  name: "",
};

const TeamForm = () => {
  const { id, team_id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [team, setTeam] = useState({});

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await axios.get(`/teams/${team_id}`);
        setTeam(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (team_id) {
      getTeam();
    }
  }, [team_id]);

  const handleFormSubmit = async (values) => {
    console.log("values", values);
    console.log("team_id", team_id);
    if (!team_id) {
      values.owner_id = user.id;
      values.league_id = id;
      try {
        const res = await axios({
          method: "POST",
          url: "/teams",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
          data: JSON.stringify(values),
        });
        navigate(`/users/${user.id}/dashboard/`);
        toast.success("Team created");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      //   delete values.manager_name;
      //   delete values.manager;
      try {
        const res = await axios({
          method: "PATCH",
          url: `/teams/${team.id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
          data: JSON.stringify(values),
        });
        navigate(`/users/${user.id}/dashboard/`);
        toast.success("Team updated");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1>{team_id ? "Edit" : "New"} Team Form</h1>
      <Formik
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        initialValues={team_id ? team : initialValues}
        validationSchema={teamSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  type="text"
                  label="Team Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {team_id ? "Update" : "Create"} Team
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default TeamForm;
