import { Navigate, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import { object, string } from "yup";
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
  const [user, setUser] = useState({
    comment: "",
    rating: "",
  });
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
  /*review section t create  */

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateData = async () => {
    const commentSchema = object({
      comment: string().max(200),
      rating: string()
        .min(1, "at least one")
        .max(5)
        .required("rating is required field"),
    });
    try {
      await commentSchema.validate(user, { abortEarly: false });
      return true;
    } catch (err) {
      console.log("validation error", err.errors);
      setError(err.errors);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = await validateData();
    console.log(validate);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${_id}/review`,
        user,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setUser({
        comment: "",
        rating: "",
      });

      if (data.message == "success") {
        toast.success("you are success to comment", {
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
      console.log(data);
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(
          "this product is not exist in your cart so you can not review it || this product is reviewd!",
          {
            position: "bottom-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          }
        );
      }
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <h3
        style={{
          fontFamily: "Satisfy, cursive",
          fontWeight: " 900",
          fontSize: "4vw",
        }}
        className="d-flex  flex-column align-items-center mt-5 mb-5"
      >
        Product Details
      </h3>
      <hr />
      <div className=" d-lg-flex flex-md-wrap flex-lg-nowrap ">
        {error ? <p>{error}</p> : null}

        <div className="product-details-images col-md-12 col-lg-6  m-3 align-items-center d-flex justify-content-center flex-column">
          <img
            className="img-fluid mb-3 img-swiper "
            src={productdetail.mainImage.secure_url}
            alt={productdetail.name}
            style={{ borderRadius: "5px", boxShadow: "2px 2px 2px #ccc" }}
          />
          {/* <p>{productdetail.description}</p>*/}
          <div className="product-details-subimages d-flex img-fluid">
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
          className=" col-lg-6 col-md-12 d-flex justify-content-center align-items-center  flex-column gap-3"
          key={productdetail._id}
        >
          <h4 className="  d-flex justify-content-center ">
            {productdetail.name}
          </h4>
          <h5
            className="  d-flex justify-content-center "
            style={{ fontWeight: 700, color: " #c48967" }}
          >
            {productdetail.price}$
          </h5>

          {AuthName ? (
            <>
              <button
                style={{
                  width: "fit-content",
                  padding: "10px",
                  backgroundColor: " #6b9080 ",
                  color: "white",
                  borderRadius: "7px",
                }}
                className="  d-flex justify-content-center align-items-center hov "
                onClick={() => addToCart(productdetail._id)}
              >
                Add to Cart <FaCartPlus />
              </button>{" "}
            </>
          ) : (
            <></>
          )}
          <button style={{ width: "fit-content", padding: "10px",backgroundColor: "  #6b9080 ",color: "white" }}type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            create your review
          </button>
          <div className="modal fade" id="exampleModal" tabindex="-1"aria-labelledby="exampleModalLabel"aria-hidden="true" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add your comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                
                  <div className="modal-body">
                  <form onSubmit={handelSubmit}>
                    <div className="email-container">
                      <label>comment:</label>
                      <input
                        className="form-control"
                        type="comment"
                        name="comment"
                        value={user.comment}
                        onChange={handelChange}
                      />
                    </div>
                    <div className="passward-container">
                      <label>Rating:</label>
                      <input
                        className="form-control"
                        type="rating"
                        name="rating"
                        value={user.rating}
                        onChange={handelChange}
                      />
                    </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      style={{
                        width: "fit-content",
                        padding: "10px",
                        backgroundColor: " #d5bdaf",
                        color: "white",
                      }}
                      onClick={handelSubmit}
                    >
                      {" "}
                      Add review
                    </button>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="comment">
        <h6>Comments ({productdetail.reviews.length})</h6>
        {productdetail.reviews.map((e) => (
          <div
            className="comment-box p-3 mb-3 d-flex justify-content-between"
            key={e.id}
          >
            <div className="comment-detail">
              {" "}
              <div className="img-commentt-box d-flex gap-3">
                <img
                  className="img-fluid "
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    border: "1px solid #ccc",
                    objectFit:'cover'
                  }}
                  src={e.createdBy.image.secure_url}
                />
                <span
                  className="text-wrap d-flex align-items-center"
                  style={{ color: "black", fontWeight: "200" }}
                >
                  is {e.comment}
                </span>
              </div>
              <br />
              <span
                style={{ color: "black", fontWeight: "200", fontSize: "8px" }}
              >
                comment by {e.createdBy.userName} <br />
              </span>
              <span
                style={{ color: "black", fontWeight: "200", fontSize: "8px" }}
              >
                created at {e.createdAt}
              </span>
              <br />
            </div>
            <div className="comment-rating">
              {" "}
              <span
                style={{ color: "black", fontWeight: "300", fontSize: "10px" }}
              >
                Rating :
                <span
                  style={{
                    color: " #d5bdaf",
                    fontWeight: "900",
                    fontSize: "12px",
                  }}
                >
                  {e.rating}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default ProductDetail;
