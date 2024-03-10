import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
/*import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";*/
import axios from "axios";
import "./products.css";
import "bootstrap";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Loader from "../../../Components/Loader/Loader";
function CategoryProducts({categoryId}) {
  const [products, setProducts] = useState([]);
  /* const[allproducts,setallProducts]=useState([]);*/
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
   

    

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${categoryId}`
      );
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      setError("error to load data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId])

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {error ? <p>{error}</p> : null}
      <h1 className="listProduct">list of our Products</h1>

      {products.length > 0 ? (
        products.map((e) => (
          <div className="product" key={e._id}>
            <h1>{e.name}</h1>
            <img
              className="img-fluid"
              src={e.mainImage.secure_url}
              alt={e.name}
            />
            <p>{e.price}$</p>
          </div>
        ))
      ) : (
        <h2>`Not products found 🦄`</h2>
      )}
    </>
  );
}

export default CategoryProducts;
