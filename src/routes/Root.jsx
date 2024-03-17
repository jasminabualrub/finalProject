import Navbar from "./../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Components/Footer/Footer";

function Root() {
  return (
    <div className="container ">
      <Navbar />
    
      <Outlet />
     
      <Footer />
    </div>
  );
}

export default Root;
