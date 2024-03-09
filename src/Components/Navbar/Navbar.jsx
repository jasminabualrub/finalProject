import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "bootstrap";
function Navbar() {
 
  return (
    
    <>
      <div className="Stickynavbar-Container">
        <div className="Stickynavbar">
          Welcome to Our FitMe Store get<span>20%OFF</span>{" "}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{height: '70px'}}>
        <div className="container-fluid" style={{height: "100%", display: "flex", alignItems: "center"}}>
          <NavLink className="navbar-brand font" to="#">
            <span>F</span>it<span>M</span>e
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
             {/* <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>*/}
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
            </ul>
            <ul className="d-flex gap-2 border-line" role="search">
              <li className="border-line" type="submit">
                <NavLink className="active-press"  to="/signin">
                  {" "}
                  Login
                </NavLink>
              </li>
              <li className="border-line" type="submit">
                <NavLink className="active-press" to="/signup">
                  {" "}
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
