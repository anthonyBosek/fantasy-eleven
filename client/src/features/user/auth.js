import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { fetchRegister } from "./userSlice";
import { setToken, setRefreshToken } from "../../utils/main";
import toast from "react-hot-toast";
import Login from "./login";
import "../../styles/auth.css";
import Register from "./register";

function Authentication() {
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();

  const signupSchema = yup.object().shape({
    first_name: yup.string().required("Please enter a first name"),
    last_name: yup.string().required("Please enter a last name"),
    username: yup.string().required("Please enter a user name"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Please enter a user email"),
    password: yup
      .string()
      .required("Please enter a user password")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /[a-zA-Z0-9]/,
        "Password can only contain Latin letters and numbers."
      ),
  });
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Please enter a user email"),
    password: yup.string().required("Please enter a user password"),
  });
  const url = signUp ? "/auth/register" : "/auth/login";

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUp ? signupSchema : loginSchema,
    onSubmit: async (values) => {
      const action = await dispatch(fetchRegister({ url, values }));
      if (typeof action.payload !== "string") {
        toast.success(`Welcome ${action.payload.user.username}!`);
        setToken(action.payload.jwt_token);
        setRefreshToken(action.payload.refresh_token);
      } else {
        toast.error(action.payload);
      }
    },
  });

  const handleClick = () => setSignUp((signUp) => !signUp);

  return (
    <div id="auth">
      {/* <Login /> */}
      <Register />
      {/* <div id="register-switch">
        <div onClick={handleClick}>{signUp ? "Log In" : "Register"}</div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {signUp && (
          <>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.first_name && formik.touched.first_name ? (
              <div className="error-message show">
                {formik.errors.first_name}
              </div>
            ) : null}
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.last_name && formik.touched.last_name ? (
              <div className="error-message show">
                {formik.errors.last_name}
              </div>
            ) : null}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username ? (
              <div className="error-message show">{formik.errors.username}</div>
            ) : null}
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="error-message show">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="error-message show">{formik.errors.password}</div>
        ) : null}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form> */}
    </div>
  );
}

export default Authentication;
