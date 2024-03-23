import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "bootstrap";
import { TiShoppingCart } from "react-icons/ti";
import { useContext } from "react";
import { UserContext } from "../../Context/User";
import { Navigate } from "react-router-dom";
function Navbar() {
/* const spaceBottomclass=()=>{
  document.querySelector('.navbar-toggler').classList.toggle.className='spacebottom';
 
 }*/
 const Navigate=useNavigate();
 const {AuthName ,setUserToken,setAuthName}=useContext(UserContext);
const logout=()=>{
  localStorage.removeItem('userToken');
  setUserToken(null);
  setAuthName(null);
  Navigate('/signin');
}

    return (
    
    <>
      <div className="Stickynavbar-Container p-3">
        <div className="Stickynavbar p-3">
          Welcome to Our FitMe Store get<span>20%OFF</span>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3" style={{height: '70px'}}>
        <div className="container-fluid" style={{height: "100%", display: "flex", alignItems: "center,",backgroundColor:" rgba(255,255, 255, 1) "}}>
          <NavLink className="navbar-brand font d-flex justify-content-center align-items-center  col-4" to="#">
            <span>F</span>it<span>M</span>e
          </NavLink>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse  p-3 gap-3" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mt-2 mb-2 mb-lg-2 col-4">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
          
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
            
              {AuthName ?<> 
               <li className="nav-item">
                <NavLink  className="nav-link size" to="/cart">
                <TiShoppingCart />
                </NavLink>
                </li>
              
                {/*<li className="spicial">
                <NavLink  to="#">
                  welcome{AuthName}
                </NavLink>
              </li>*/}
              
                </>:<>
                
              </>}
           
            </ul>
            <ul className="d-flex gap-2 border-line mt-2 mb-2 mb-lg-2  col-4" role="search">
            {AuthName ?<> 
               
              <li className="border-line" type="submit">
              <button onClick={logout} className="active-press" >
                 Logout
                </button>
                </li>
             
              
                </>:<>
                <li className="border-line" type="submit">
                <NavLink className="active-press"  to="/signin">
                  {" "}
                  Login
                </NavLink>
              </li></>}
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
