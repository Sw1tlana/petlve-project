import { NavLink } from "react-router-dom";

function AuthNav() {
  return (
    <div>
        <NavLink to="/signin">Log In</NavLink>
        <NavLink to="/signup">Registration</NavLink>
    </div>
  )
};

export default AuthNav;
