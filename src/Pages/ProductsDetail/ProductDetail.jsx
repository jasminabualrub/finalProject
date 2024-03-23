import { Navigate, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import { FaCartPlus } from "react-icons/fa6";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Loader from "./../../Components/Loader/Loader";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/User";
import axios from "axios";
import "bootstrap";
import "./ProductDetail.css";
import { Zoom, toast } from "react-toastify";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
function ProductDetail() {
  const { AuthName } = useContext(UserContext);
  const { _id } = useParams();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [productdetail, setProductdetail] = useState([]);
  const navigate = useNavigate();
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
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProductDetailElement();
  }, []);
  if (loader) {
    return <Loader />;
  }
  const token = localStorage.getItem("userToken");
  const addToCart = async (id) => {
    /*  console.log('soso');*/
    console.log(id);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId: id },
        { headers: { Authorization: `Tariq__${token}` } }
      );
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
        });
        navigate("/cart");
      }
    } catch (err) {
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
  };

  return (
    <div className="detail-container d-flex flex-md-wrap flex-lg-nowrap ">
      {error ? <p>{error}</p> : null}
      <div className="product-details-images col-6 m-3">
        <img
          className="img-fluid mb-3 img-swiper "
          src={productdetail.mainImage.secure_url}
          alt={productdetail.name}
        />
        <p>{productdetail.description}</p>
        <div className="product-details-subimages d-flex">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 1000 }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {productdetail.subImages.map((e) => (
              <div className="d-flex  " key={e.id}>
                <SwiperSlide>
                  <img
                    style={{ borderRadius: "5px!important" }}
                    src={e.secure_url}
                  />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className="productdetail col-6 d-flex justify-content-start align-self-stretch"
        key={productdetail._id}
      >
        <h4>{productdetail.name}</h4>
        <span>{productdetail.price}$</span>

        {AuthName ? (
          <>
            <button onClick={() => addToCart(productdetail._id)}>
              Add to Cart <FaCartPlus />
            </button>{" "}
          </>
        ) : (
          <></>
        )}

        <div className="comment">
          <h6>Comments</h6>
          {productdetail.reviews.map((e) => (
            <div className="comment-box " key={e.id}>
                 <span
                className="text-wrap"
                style={{ color: "black", fontWeight: "200" }}
              >
               is {e.comment}
              </span>
              <br />
              <span
                className="text-wrap"
                style={{ color: "black", fontWeight: "200", fontSize: "8px" }}
              >
                comment by {e.createdBy.userName}{" "}<br/>
              </span>
           
              <span
                className="text-wrap"
                style={{ color: "black", fontWeight: "200", fontSize: "8px" }}
              >
                {" "}
                created at {e.createdAt}
              </span>
              <br />
              <span
                className="text-wrap"
                style={{ color: "black", fontWeight: "300", fontSize: "10px" }}
              >
                {" "}
                Rating {e.rating} /5
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
