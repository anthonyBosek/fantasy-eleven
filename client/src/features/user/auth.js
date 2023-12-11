import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/copyright";
import logo from "../../assets/images/logo.png";
import { fetchRegister } from "./userSlice";
import "../../styles/auth.css";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[a-zA-Z0-9]/,
      "Only alphanumeric characters allowed for password"
    ),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Authentication = () => {
  const dispatch = useDispatch();
  const [isReg, setIsReg] = useState(false);

  const url = isReg ? "/auth/register" : "/auth/login";

  const handleToggle = () => setIsReg((isReg) => !isReg);

  const handleFormSubmit = async (values) => {
    const action = await dispatch(fetchRegister({ url, values }));
    if (typeof action.payload !== "string") {
      console.log("action.payload", action.payload);
      const username = action.payload.user
        ? action.payload.user.username
        : action.payload.username;
      toast.success(`Welcome ${username}!`);
      console.log("action.payload", action.payload);
    } else {
      toast.error(action.payload);
    }
  };

  return (
    <div id="auth">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" className="auth-logo" />
          <Typography component="h1" variant="h4" fontFamily="Oswald">
            {isReg ? "Register" : "Log In"}
          </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={isReg ? initialValuesRegister : initialValuesLogin}
            validationSchema={isReg ? registerSchema : loginSchema}
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
                <Grid container spacing={2}>
                  {isReg && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="text"
                          label="First Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.first_name}
                          name="first_name"
                          error={!!touched.first_name && !!errors.first_name}
                          helperText={touched.first_name && errors.first_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="text"
                          label="Last Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.last_name}
                          name="last_name"
                          error={!!touched.last_name && !!errors.last_name}
                          helperText={touched.last_name && errors.last_name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          name="username"
                          error={!!touched.username && !!errors.username}
                          helperText={touched.username && errors.username}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Email Address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isReg ? "Sign Up" : "Sign In"}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={handleToggle}>
                      {isReg
                        ? "Already have an account? Log in"
                        : "Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
};

export default Authentication;
