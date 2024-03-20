import { useParams } from "react-router-dom";
import Loader from "./../../Components/Loader/Loader";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/User";
import axios from "axios";
import 'bootstrap'
import './ProductDetail.css'
import { Zoom, toast } from "react-toastify";
function ProductDetail() {
  const {AuthName }=useContext(UserContext);
    const {_id}=useParams();
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(true);
    const[productdetail, setProductdetail] =useState([]);
    
    const getProductDetailElement = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/products/${_id}`
            );

            console.log(data);
            setProductdetail(data.product);
            console.log(productdetail);
            setError("");
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoader(false);
          }}
          useEffect(()=>{
            getProductDetailElement();
          },[])
          if (loader) {
            return <Loader />;
          }
          const token=localStorage.getItem('userToken');
          const addToCart=async(id)=>{
          /*  console.log('soso');*/
          console.log(id);
          try{ const { data } =await axios.post( `${import.meta.env.VITE_API_URL}/cart`,{productId:id},{headers:{Authorization:`Tariq__${token}`}});
          console.log(data);
          if (data.message == "success") {
      
            toast.success("product added to your cart succefully", {
              position: "bottom-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Zoom,
            });}}
          catch(err){
            console.log(err);
            if (err.response.status === 409) {
                toast.error("this product allready exist in your cart !", {
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
          }
          
         
          }
    
return(<div  className="detail-container">
{error?<p>{error}</p>:null}

    
        <div className="productdetail" key={productdetail._id}>
            <h2>{productdetail.name}</h2>
         <img  className="img-fluid"src={productdetail.mainImage.secure_url} alt={productdetail.name} />
        
         <div className="productdetailSubImage">
         {productdetail.subImages.map((e)=>{
            <img src={e.secure_url} alt={productdetail.name} />
        })} 
         </div>
         <p>{productdetail.description}</p>
         <span>{productdetail.price}$</span> 
         {AuthName ?<><button onClick={()=>addToCart(productdetail._id)}>Add to Cart</button> </>:<></>}
         
           
        </div>
       
       {/* <div className="more-details">
            <h3>Product detial</h3>
            <img src={productdetail.mainImage.secure_url} alt={productdetail.name} />
        <p>{productdetail.description}</p>
        <span>{productdetail.price}$</span>
            <button>Addtocart</button>
          
        </div>*/}
    

</div>);
          }
export default ProductDetail;
