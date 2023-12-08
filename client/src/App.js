import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { clearErrors as clearUserErrors } from "./features/user/userSlice";
import { fetchCurrentUser } from "./features/user/userSlice";
import Authentication from "./features/user/auth";
import { setToken } from "./utils/main";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const userErrors = useSelector((state) => state.user.errors);
  const errors = [...userErrors];

  const clearErrorsAction = useCallback(() => {
    dispatch(clearUserErrors(""));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!user) {
        const action = await dispatch(fetchCurrentUser());
        if (typeof action.payload !== "string") {
          if (action.payload.flag === "refresh") {
            setToken(action.payload.jwt_token);
          }
        }
      }
    })();
  }, [user, dispatch]);

  useEffect(() => {
    if (errors.length) {
      clearErrorsAction();
      // const timeout = setTimeout(clearErrorsAction, 3000)
      // return () => {
      //   clearTimeout(timeout)
      // };
    }
  }, [errors, clearErrorsAction]);

  if (!user)
    return (
      <>
        <Toaster />
        <Authentication />
      </>
    );
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default App;
