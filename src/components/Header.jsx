import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import NavBar from "./NavBar";
import "./Header.css";

const Header = () => {
  const { usuario } = useAuthContext();

  return (
    <header className="header-wrapper">
      <NavBar />

      {usuario === "admin" && (
        <div className="admin-link-container">
          <Link className="admin-link" to="/admin">
            Admin
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
