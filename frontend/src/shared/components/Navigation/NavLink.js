import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import classes from "./NavLink.module.css";
const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "link")}
          to="/"
          end
        >
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to={`/${auth.userId}/places`}
          >
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to="/places/new"
          >
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to="/auth"
          >
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && <li><button onClick={auth.logout}>LOGOUT</button></li>}
    </ul>
  );
};
export default NavLinks;
