
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { Zoom } from "react-toastify";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Loader from './../../../Components/Loader/Loader';
import axios from 'axios';
import './Cart.css'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import 'bootstrap'
function Cart() {
  const token=localStorage.getItem('userToken');
  
  const [cartItems,setCartItems] =useState([]);
  const[loader,setLoader]=useState(true);
  const[error,setError]=useState('');
  /*to decrease qauntity*/ 
  const decreaseQuantity=async(id)=>{
    try{const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId:id},{headers:{Authorization:`Tariq__${token}`}});
    console.log(data);
  getCart();}
    catch(err){
      console.log(err);
      setError('Error To Load Data :(')
    }
    finally{setLoader(false)}
    

  }
  /*increaseQuantity */
  const increaseQuantity=async(id)=>{
    try{const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId:id},{headers:{Authorization:`Tariq__${token}`}});
    console.log(data);
    getCart();}
    catch(err){
      console.log(err);
      setError('Error To Load Data :(')
    }
    finally{setLoader(false)}
    

  }
  /*to remove all elements */
const removeAllItmes=async()=>{
  try{
    const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{},{headers:{Authorization:`Tariq__${token}`}});
    console.log(data);
    getCart();}
  catch(err){
    console.log(err);
      setError('Error to load your data :(') 
    
  }
  finally{
    setLoader(false);
  }
}
{/*to remove an item */}
  const removeCartItem=async(id)=>{
    try{
      const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId:id},{headers:{Authorization:`Tariq__${token}`}})
    console.log(data);
   getCart();
   
  setError("");}
    catch(err){
      console.log(err);
      setError('Error to load your data :(') 
    }
    finally{
      setLoader(false);
    }
  }
  /*to get all cart element */
  const getCart=async()=>{
    try{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart`,{headers:{Authorization:`Tariq__${token}`}})
  setCartItems(data.products);
  setError("");}
    catch(err){
      toast.error(err.response.data.message || 'Error to load your data :(')
    }
    finally{
      setLoader(false);
    }
  }
  useEffect(()=>{getCart()},[]);
  if(loader){
    return <Loader />
  }
  /*display data */
  return (<>
   {error?<p>{error}</p>:null}
    <div className='cart-items-container table-responsive' >
      <h2>CartItems</h2>
      <table className="table table-hover table table-bordered ">
      
      <thead>
        <tr>
          <th >ItemName</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>SubTotal</th>
        </tr>
      </thead>
      <tbody>
   {(cartItems.length >0) ?cartItems.map((e)=>(
        <tr key={e.productId}>
          <td className='d-flex flex-column align-items-center'> {e.details.name}
          <img   className='img-fluid'src= {e.details.mainImage.secure_url}/>
              <span>{e.details.colors}</span> 
          
      <button onClick={()=>removeCartItem(e.productId)}><IoMdRemoveCircleOutline /></button>
</td>
          <td> <button onClick={()=>{decreaseQuantity(e.productId)}}><FaMinus /></button><span>{e.quantity}</span><button onClick={()=>{increaseQuantity(e.productId)}}><FaPlus /></button></td>
          <td>{e.details.price}$</td>
          <td>{e.details.price*e.quantity}$</td>
          </tr>
      
  
   )):<tr><td colSpan="4">your cart is empty</td></tr>}
   </tbody>
   <tfoot>
    <tr >
      <td colSpan="4"><button onClick={removeAllItmes} >ClearCart</button></td>
      
    </tr>
   </tfoot>
   </table>
   
      </div></>
   
  )
}

export default Cart