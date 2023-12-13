import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const LeagueForm = ({ isEdit, handleEdit, league }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

  const handleFormSubmit = async (values) => {
    if (!isEdit) {
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
        handleEdit(false, res.data);
        toast.success("League created");
      } catch (err) {
        console.log(err);
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
        console.log(res);
        handleEdit(false, res.data);
        // navigate("/fantasy");
        toast.success("League updated", {
          duration: 3000,
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1>{isEdit ? "Edit" : "New"} League Form</h1>
      <Formik
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        initialValues={isEdit ? league : initialValues}
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
                  {isEdit ? "Update" : "Create"} League
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
