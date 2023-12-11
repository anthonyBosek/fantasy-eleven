import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { logout } from "../features/user/userSlice";
import "../styles/nav.css";

const ColorButtonOutlined = styled(Button)(() => ({
  fontFamily: "Oswald",
  color: "#381d54",
  border: "1px solid #381d54",
  "&:hover": {
    backgroundColor: "#f8f9fa",
    border: "1px solid #381d54",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
}));

const Nav = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handleClick = async () => {
    if (user) {
      const res = await axios({
        method: "DELETE",
        url: "/auth/logout",
      });
      if (res.status === 204) {
        dispatch(logout());
        toast.success("Logged out successfully!");
        nav("/");
      } else {
        toast.error("Failed to log out!");
      }
    } else {
      nav("/auth");
    }
  };

  return (
    <nav>
      <div className="nav-box">
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/premier-league">Premier League</NavLink>
          <NavLink to="/fantasy">Fantasy</NavLink>
          {user && (
            <NavLink to={`/users/${user.id}/dashboard`}>Dashboard</NavLink>
          )}
        </div>
        <div className="nav-btns">
          <ColorButtonOutlined
            size="small"
            variant="outlined"
            onClick={handleClick}
          >
            {user ? "Logout" : "Login"}
          </ColorButtonOutlined>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
