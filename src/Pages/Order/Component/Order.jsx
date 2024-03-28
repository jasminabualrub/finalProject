
import {  useEffect, useState } from "react";
import { number, object, string} from 'yup';
import axios from "axios";
import { Zoom, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'bootstrap' 
/*import { Link, useNavigate } from "react-router-dom";*/

import '../../../Context/User'
/*import { UserContext } from "../../../Context/User";*/
function Order() {
  
  const token=localStorage.getItem('userToken');
 /* const {setUserToken}=useContext(UserContext);
  const navigate=useNavigate();*/
  const [cartItems, setCartItems] = useState([]);
  const [errors,setError]=useState([]);
  const[loader,setLoader]=useState(false);
  const navigate=useNavigate();
  const [order, setOrder] = useState({
  
    couponName: "",
    address: "",
    phone:"",
   
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };
 
  const validateData=async()=>{
    const orderSchema=object({
            
      couponName:string().email('Plz check your Coupon Name'),
      address:string().required(toast.error('address is required field')),
      phone:number().max(10).required(toast.error('phone is required field')),
    });

try{
await orderSchema.validate(order,{abortEarly:false});
return true;}
catch(err){
  console.log("validation error",err.errors);
  toast.error(err.message || 'validation error')
 setError(err.errors);
return false;}
              
  }
 
   
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate=await validateData();
    console.log(validate);
 
    try{
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`,order,{headers:{Authorization:`Tariq__${token}`}});
    
    setOrder({
      couponName: "",
      address: "",
      phone:"",
    });
    console.log(data);
    if (data.message == "success") {
      
      toast.success("your order Created successfully", {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
     /* localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      */
      navigate(`/profile`)
    }
    console.log(data);
  } catch (err) {
    if (err.response.status === 400) {
      toast.error("plz check your order !", {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
    console.log(err);
  }
  finally{
    setLoader(false);
  }
  }
    
    
    /* const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,{user});*/ //هاي عشان ابعث الداتا عن طريق البودي بحط البراميتر هو اليوزر
    const getCart = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Tariq__${token}` },
        });
        setCartItems(data.products);
       
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
      return <loader/>;
    }

  return (
    <>
      
 {errors.length > 0?errors.map(error=><p>{error}</p>):''}
 <h3 style={{fontFamily:"Satisfy, cursive",fontWeight:"700"}} className="d-flex  flex-column align-items-center mt-5 mb-5">Elements to order</h3>
 <div className="d-flex align-items-center justify-content-center flex-md-wrap flex-lg-nowrap">
 
 {cartItems.length > 0 ? (
              cartItems.map((e) => (
                <div className="d-flex  flex-column align-items-center " key={e.productId}>
                
         
                  <h6> {e.details.name}</h6> 
                    <img
                      className="img-fluid  d-flex" style={{width:'150px', height:'150px',borderRadius:'50%',objectFit:'cover',border:'1px solid #ccc',boxShadow:'2px 2px 2px #ccc'}}
                      src={e.details.mainImage.secure_url}
                    />
                     <p>{e.quantity} item in your cart</p>
                    
                    </div>
              )
            ) ): <></>
            
            }
 </div>
           
         
 <div className='formStyle'>
  <h1> Create Order</h1>
 <form onSubmit={handelSubmit}>
      
<div className="email-container">
<label>CouponName:</label>
      <input className="form-control"
        type="text"
        name="couponName"
        value={order.couponName}
        onChange={handelChange}
      />
</div>
      <div className="passward-container"><label>Address:</label>
      <input className="form-control"
        type="text"
        name="address"
        value={order.address}
        onChange={handelChange}
      /></div>
      
      <div className="passward-container"><label>Phone:</label>
      <input className="form-control"
        type="number"
        name="phone"
        value={order.phone}
        onChange={handelChange}
      /></div>

      <button type="submit"  className= "btn btn-outline-success" disabled={loader?'disabled':null}>{!loader?'Order To Install':'Wait...'}</button>
      
     
     
    
      
      
    </form>
 </div>
      
    </>
  );
  }

export default Order;
