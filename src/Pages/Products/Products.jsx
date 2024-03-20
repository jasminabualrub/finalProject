import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import "./Products.css";
import { Link } from "react-router-dom";

function Products() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [pagesCount, setPagesCount] = useState(0);//تخزن قديه بدها تعرض بالصفحة برودكت
  const [currentPage, setCurrentPage] = useState(1);//الصفحة الحالية
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=2`
      );

      console.log(data.products);
      setProducts(data.products);
      setPagesCount(data.total / data.page);//لحساب عدد البرودكت بالصفحة بثسم عدد المنتجات وهني التوتال على الليميت عدد المنتجات بالصفحة
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
  }, [currentPage]);
  if (loader) {
    return <Loader />;
  }

  return (
    <div className="Products">
      <div className="ProductsTitle">
        <h3>Products in FitMe Site... </h3>
      </div>
      {error ? <p>{error}</p> : null}
      <div className="ProductsInfo">
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

      <div className="pagination" style={{display:'flex',gap:'10px'}}>
        <button
          disabled={currentPage === 1}
          className="number-box"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaAngleLeft />
        </button>
        {Array.from({ length: pagesCount }, (_, index) => index + 1).map(
          (e) => (
            <div
              key={e}
              className="number-box"
              style={{
                backgroundColor: e === currentPage && "#6b9080",
                color: e === currentPage && "white",
              }}
              onClick={() => setCurrentPage(e)}
            >
              {e}
            </div>
          )
        )}
        <button
          disabled={currentPage === pagesCount }
          className="number-box"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default Products;
