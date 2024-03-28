import { NavLink, Outlet } from "react-router-dom";
import Home from "../../Home/Component/Home";

function Profile() {
  return (
    <>
      <div className="container-fluid">
        <ul className="nav nav-tabs justify-content-end style-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link "
              aria-current="page"
              to="/profile/info"
            >
              Information
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link "
              aria-current="page"
              to="/profile/contact"
            >
              contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link "
              aria-current="page"
              to="/profile/getOrder"
            >
              order
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
      <Home />
    </>
  );
}

export default Profile;
