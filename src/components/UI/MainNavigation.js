import { Link } from "react-router-dom";
import classes from "./MainNavigation.modules.css";


function MainNavigation() {
  function LogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/log-in";
  }
  return (
    <div>
      <nav className={classes.nav}>
        <ul>
          <li className="nav-item">
            <Link to="/">Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/log-in">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/sign-up">Signin</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={LogOut}>Log Out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
