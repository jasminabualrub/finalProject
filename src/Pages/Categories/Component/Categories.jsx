import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Categories.css";
import { NavLink, useParams } from "react-router-dom";
// import required modules
import { EffectCoverflow, Pagination ,Autoplay} from "swiper/modules";
import Loader from "../../../Components/Loader/Loader";

function Categories() {
  
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [categories, setCategory] = useState([]);
  const getCategories = async () => {
    console.log(import.meta.env.VITE_API_URL);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`
      );
      console.log(data.categories);
      if(data.message=='success') {
      setCategory(data.categories);}
    } catch (err) {
     
      console.log(err);
      setError("Error to load your data :(");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <div className='categories-container'>
    <h3>Categories</h3>
      {error ? <p>{error}</p> : null}
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
        autoplay={{delay:1000}}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        {categories.length > 0 ? (
          categories.map((e) => (
            <div className="category" key={e._id}>
              <SwiperSlide>
                <NavLink  to={`/category/${e._id}`}>
                <img src={e.image.secure_url} alt={e.name} />
                </NavLink>
                 
              
              </SwiperSlide>

              {/*<h1>{e.name}</h1>*/}
            </div>
          ))
        ) : (
          <p> No Category Found</p>
        )}
      </Swiper>
    </div>
  );
}

export default Categories;
