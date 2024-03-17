import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";
import Notfound from "./Pages/Notfound/Component/Notfound";
import Home from "./Pages/Home/Component/Home";
import About from "./Pages/About/Components/About";
import Signin from "./Pages/Signin/Component/Login";
import Signup from "./Pages/Signup/Component/Register";
import Forgetpassward from "./Pages/Forgetpassward/Component/Forgetpassward";
import Profile from "./Pages/Profile/Component/Profile";
import Product from "./Pages/Product/Component/Product";
import Cart from "./Pages/Cart/Component/Cart";
import Order from "./Pages/Order/Component/Order";
import Categories from "./Pages/Categories/Component/Categories";
import Loader from "./Components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./Pages/Products/Products";
import Category from './Pages/Category/Category';
import ProductsRoutes from "./auth/ProductsRoute/ProductsRoutes";
import UnProtectedRoutes from "./auth/UnProtectedRoutes";
import ProductDetail from "./Pages/ProductsDetail/ProductDetail";
import UserContextProvider from "./Context/User";
import Logout from "./Pages/Logout/Logout";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <UserContextProvider>
       <About /></UserContextProvider>,
        
      },
      {
       
        path: "/signin",
        element: 
        <UnProtectedRoutes>
          <Signin />
          </UnProtectedRoutes>
        ,
      },
      {
        path: "/signup",
        element: <UnProtectedRoutes>
          <Signup />
          </UnProtectedRoutes>
        ,
      },
      {
        path: "/forgetpassward",
        element: <Forgetpassward />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/category/:_id",
        element: <Category/>,
      },
      {
        path: "/productdetail/:_id",
        element: <ProductDetail/>,
      },
    
      {
        path: "/products",
        element: <ProductsRoutes>
               <Products/>
            </ProductsRoutes>
      },
      {
        path: "/logout",
        element: 
               <Logout/>
           
      },
      {
        path: "/product/:_id",
        element: <Product />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/loader",
        element: <Loader />,
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
    <UserContextProvider> <RouterProvider router={router} /></UserContextProvider>
     
      <ToastContainer />
    </>
  );
}

export default App;
