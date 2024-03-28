import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "./../../../Components/Loader/Loader";
import axios from "axios";
import "bootstrap";

function Contact() {
  const token = localStorage.getItem("userToken");
  const [userInfo, setUserInfo] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setUserInfo(data.user);
      console.log(data.user);

      setError("");
    } catch (err) {
      toast.error(err.response.data.message || "Error to load your data :(");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {error ? <p>{error}</p> : null}

      <div className=" user-email p-3" key={userInfo.id}>
        <h5>
          <span>UserEmail:</span>
          {userInfo.email}
        </h5>
      </div>
    </>
  );
}

export default Contact;
