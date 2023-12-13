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

const leagueSchema = yup.object().shape({
  name: yup.string().required("League name is required"),
});

const initialValues = {
  name: "",
};

const LeagueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [league, setLeague] = useState({});

  useEffect(() => {
    const getLeague = async () => {
      try {
        const res = await axios.get(`/leagues/${id}`);
        setLeague(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) {
      getLeague();
    }
  }, [id]);

  const handleFormSubmit = async (values) => {
    if (!id) {
      values.manager_id = user.id;
      try {
        const res = await axios({
          method: "POST",
          url: "/leagues",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
          data: JSON.stringify(values),
        });
        navigate(`/users/${user.id}/dashboard/`);
        toast.success("League created");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      delete values.manager_name;
      delete values.manager;
      try {
        const res = await axios({
          method: "PATCH",
          url: `/leagues/${league.id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
          data: JSON.stringify(values),
        });
        navigate(`/users/${user.id}/dashboard/`);
        toast.success("League updated", {
          duration: 4000,
          // position: "top-right",
          // style: {
          //   border: "1px solid #333",
          //   backgroundImage: "linear-gradient(to right, #f61a71, #ff311e)",
          //   padding: "10px",
          //   color: "#333",
          // },
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "New"} League Form</h1>
      <Formik
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        initialValues={id ? league : initialValues}
        validationSchema={leagueSchema}
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
                  label="League Name"
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
                  {id ? "Update" : "Create"} League
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default LeagueForm;
