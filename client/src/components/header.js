import "../styles/header.css";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <div id="hdr">
      <div className="hdr-rt">
        <div className="hdr-rt-box"></div>
      </div>
      <div className="hdr-lt">
        <div>
          <img src={logo} alt="logo" className="hdr-logo" />
        </div>
        <div className="hdr-title">Fantasy Eleven</div>
      </div>
    </div>
  );
};

export default Header;
