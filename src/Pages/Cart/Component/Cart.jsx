
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Loader from './../../../Components/Loader/Loader';
import axios from 'axios';
import './Cart.css'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
function Cart() {
  const token=localStorage.getItem('userToken');
  const [cartItems,setCartItems] =useState([]);
  const[loader,setLoader]=useState(true);
  const[error,setError]=useState('');
  const[reomveItem,setremoveItem]=useState([]);
  const[removeall,setRemoveAll]=useState([]);
  /*to remove all elements */
const removeAllItmes=async()=>{
  try{
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{headers:{Authorization:`Tariq__${token}`}})
  console.log(data);
   setRemoveAll(data.products);
 
setError("");}
  catch(err){
    toast.error(error.response.data.message || 'Error to load your data :(')
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
     setremoveItem(data.products);
   
  setError("");}
    catch(err){
      toast.error(error.response.data.message || 'Error to load your data :(')
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
      toast.error(error.response.data.message || 'Error to load your data :(')
    }
    finally{
      setLoader(false);
    }
  }
  useEffect(()=>{getCart();},[]);
  if(loader){
    return <Loader />
  }
  /*display data */
  return (<>
   {error?<p>{error}</p>:null}
    <div className='cart-items-container' >
      <h2>CartItems</h2>
      <table border={true}>
      <thead>
        <tr>
          <th >ItemName</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>SubTotal</th>
        </tr>
      </thead>
      <tbody>
   {cartItems.map(e=>{
        <tr key={e.productId}>
          <td>{e.details.name}
         <img src= {e.details.mainImage.secure_url}/>
         <span>{e.details.colors}</span> 
          
      <button onClick={removeCartItem()}><IoMdRemoveCircleOutline /></button>
</td>
          <td> <button><FaMinus /></button><span>{e.quantity}<button><FaPlus /></button></span></td>
          <td>{e.details.price}$</td>
          <td>{e.details.price*e.quantity}</td>
          </tr>
      
  
   } )}
   </tbody>
   <tfoot>
    <tr>
      <td><button onClick={removeAllItmes} >ClearCart</button></td>
    </tr>
   </tfoot>
   </table>
   
      </div></>
   
  )
}

export default Cart