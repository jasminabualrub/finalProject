
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

import Loader from './../../../Components/Loader/Loader';
import axios from 'axios';
import './Profile.css'

import 'bootstrap'

function GetOrder() {
  const token=localStorage.getItem('userToken');
  
  const [orderItems,setOrderItems] =useState([]);
  const[loader,setLoader]=useState(true);
  const[error,setError]=useState('');
  
  /*to get all cart element */
  const getOrder=async()=>{
    try{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,{headers:{Authorization:`Tariq__${token}`}})
      setOrderItems(data.orders);
console.log(data.orders)

  setError("");}
    catch(err){
      toast.error(err.response.data.message || 'Error to load your data :(')
    }
    finally{
      setLoader(false);
    }
  }
  useEffect(()=>{getOrder()},[]);
  if(loader){
    return <Loader />
  }
  /*display data */
  return (<div  className='orderlist'>
  {error? <p>{error}</p> : null}
  <h2 className='text-center m-5'>List of orders</h2>
  {orderItems.length >0 ?(orderItems.map((e)=>(
    <div className='OrderItem d-flex flex-column flex-wrap  ' key={e._id}>
      {e.products.map((el)=>(
        <div className="product d-flex gap-5 flex-sm-wrap flex-md-wrap flex-lg-nowrap" key={el._id}>
          <div className='order-img img-fluid  col-4'><img src={el.productId.mainImage.secure_url}/></div>
         
          <div className='img-Detail text-center d-flex flex-column justify-content-center gap-3 col-5'>
          <h5 style={{color:'gray'}}>{el.productId.name}</h5>
          <p>${el. finalPrice}</p>
          <h6>{el.quantity} item</h6>
          </div>
         
     
      
      <div className='OrderStatus  text-center mt-5 col-3 '>
        <h5  style={{color:'gray'}}>status </h5>
        <h6>{e.status}...</h6>
      </div>
          </div>
          
    
      ))}
    </div>
  
  ))):(<p>List of Order is Empty</p>)}
   </div>
   
  )
}

export default GetOrder