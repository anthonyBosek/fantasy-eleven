import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { clearErrors as clearUserErrors } from "./features/user/userSlice";
import { fetchCurrentUser } from "./features/user/userSlice";
import Header from "./components/header";
import Nav from "./components/navbar";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const userErrors = useSelector((state) => state.user.errors);
  const errors = useMemo(() => userErrors, [userErrors]);

  const clearErrorsAction = useCallback(() => {
    dispatch(clearUserErrors(""));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!user) {
        const action = await dispatch(fetchCurrentUser());
        if (typeof action.payload !== "string") {
          if (action.payload.flag === "refresh") {
            console.log("refresh token", action.payload);
          }
        } else {
          // console.log("error", action.payload);
          // toast.error("Token expired. Please log in again.");
          navigate("/");
        }
      } else {
        // console.log("user", user);
        navigate(`/users/${user.id}/dashboard/`);
      }
    })();
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (errors.length) {
      clearErrorsAction();
    }
  }, [errors, clearErrorsAction]);

  return (
    <>
      <Toaster />
      <Header />
      <Nav />
      <Outlet />
    </>
  );
};

export default App;
