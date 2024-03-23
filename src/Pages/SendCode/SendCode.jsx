import { useContext, useState } from "react";
import { object, string } from "yup";
import axios from "axios";
import { Zoom, toast } from "react-toastify";

import "bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/User";

function SendCode() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setError] = useState([]);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateData = async () => {
    const ForgetSchema = object({
      email: string().email("Plz check your Email"),
    });

    try {
      await ForgetSchema.validate(user, { abortEarly: false });
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
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
        user
      );
      setUser({
        email: "",
      });

      if (data.message == "success") {
        toast.success("code sent to your email successfully", {
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
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        navigate("/forgetpassward");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  /* const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,{user});*/ //هاي عشان ابعث الداتا عن طريق البودي بحط البراميتر هو اليوزر

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <div className="formStyle">
        <h1>SendCode</h1>
        <form
          onSubmit={handelSubmit}
          className="d-flex flex-column justify-content-center align-items-center gap-3"
        >
          <div className="email-container">
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={user.email}
              onChange={handelChange}
            />
          </div>

          <button
            type="submit"
            style={{ width: "fit-content" }}
            className="btn btn-outline-success  "
            disabled={loader ? "disabled" : null}
          >
            {!loader ? "submit" : "Wait..."}
          </button>
        </form>
      </div>
    </>
  );
}

export default SendCode;
