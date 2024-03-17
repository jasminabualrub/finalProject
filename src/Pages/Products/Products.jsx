import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import './Products.css'
import {Link} from "react-router-dom"
function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=1&limit=10`
      );
      console.log(data.products);
      setProducts(data.products);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Error loading products");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <div className='Products'>
      <div className='ProductsTitle'  >
		<h3 >Products in FitMe Site... </h3>
 </div>
      {error ? <p>{error}</p> : null}
<div className='ProductsInfo'>
{products.length > 0 ? (
        products.map((e) => (
          <div className="product" key={e._id}>
            <img src={e.mainImage.secure_url} alt={e.name} />
			<h6>{e.name}</h6>
			<p>${e.price}</p>
			<Link to={`/productdetail/${e._id}`}>
				<button className="btn-style">View More</button>
			</Link>
          </div>
        ))
      ) : (
        <h2> No Products Found</h2>
      )}

</div>
      
    </div>
  );
}

export default Products;
