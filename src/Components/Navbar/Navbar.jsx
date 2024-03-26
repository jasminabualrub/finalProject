import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "bootstrap";
import { TiShoppingCart } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
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
const token = localStorage.getItem("userToken");
const [counter, setCounter] = useState();

  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
const getCart = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: { Authorization: `Tariq__${token}` },
    });
   
    setCounter(data.count);
    setError("");
  } catch (err) {
    toast.error(err.response.data.message || "Error to load your data :(");
  } finally {
    setLoader(false);
  }
};
useEffect(() => {
  getCart();
}, []);
if (loader) {
  return <Loader />;
}
    return (
    
    <>
      <div className="Stickynavbar-Container p-3">
        <div className="Stickynavbar p-3">
          Welcome to Our FitMe Store get<span>20%OFF</span>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3" style={{height: '70px',position:'relative'}}>
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
            
              {AuthName ?<> 
               <li className="nav-item">
                <NavLink style={{position:'relative'}} className="nav-link size" to="/cart">
                <TiShoppingCart />
                <span className="d-flex align-items-center justify-content-center " style={{ color: "black", position:'absolute', top: "0px",right:'16px',zIndex:'9',width:'22px',height:'22px',borderRadius:'50%',backgroundColor:' #d5bdaf', }}>
        {counter}
      </span>
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
