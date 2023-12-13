import { useSelector } from "react-redux";
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
  const user = useSelector((state) => state.user.data);

  const handleFormSubmit = async (values) => {
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
      console.log(res);
      toast.success("League created");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1>LeagueForm</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
                  Create League
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
