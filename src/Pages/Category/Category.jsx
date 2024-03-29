import { useParams } from "react-router-dom";
import Loader from "./../../Components/Loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import './Category.css'
import {Link} from "react-router-dom"
function Category() {
  const { _id } = useParams();
  console.log(_id);
  const [categor, setCategor] = useState({})
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [categoryProducts, setCategory] = useState([]);
  const getCategoryElement = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${_id}`
      );
      console.log(categoryProducts);
     setCategory(data.products);
      console.log(data);
    } catch (err) {
      console.log(err);
      setError("Error to load your data :(");
    } finally {
      setLoader(false);
    }
  };
  async function getCategoryInfo() {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${_id}`)
			if (data.message == 'success') {
				setCategor(data.category)
			}
		} catch (err) {
			console.log(err);
      setError("Error to load your data :(");
		} finally {
			setLoader(false);
		}
	}
  useEffect(() => {
    getCategoryElement();
    getCategoryInfo();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <div className='productCategory'>
      <div className='productCategoryTitle'>
				<h3>Products for category <span>{categor.name}</span></h3>
				<img src={categor.image.secure_url } alt="" width={50} />
			</div>
      {error ? <p>{error}</p> : null}
      <div className='Products  ' >
      { categoryProducts.length > 0 ?categoryProducts.map((e) => (
        <div className="product flex-column flex-wrap" key={e._id}>
          <img className="d-flex " style={{width:'100%'}} src={e.mainImage.secure_url} />
          <h6>{e.name}</h6>
          <p>${e.price}</p>
          <Link to={`/productdetail/${e._id}`}>
				<button className="btn-style">View More</button>
			</Link>
        </div>
      )):<h2> No category Products Found</h2>}
      </div>
     
    </div>
  );
}
export default Category;
