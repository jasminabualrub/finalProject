import { useState } from "react";
import { object, string } from "yup";
import axios from "axios";
import { Zoom, toast } from "react-toastify";
function Signup() {
  const [errors, setError] = useState([]);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: files[0] });
  };
  const validateData = async () => {
    const RegisterSchema = object({
      userName: string()
        .min(3, "at least 3 Char")
        .max(20)
        .required("userName  is required field"),
      email: string().email("Plz check your Email"),
      password: string()
        .min(8, "at least 8 Char")
        .max(20)
        .required("passward is required field"),
      image: string().required("image is required field"),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (err) {
      console.log("validation error", err.errors);
      setError(err.errors);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validate = await validateData();
    console.log(validate);
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData
      );
      setUser({
        userName: "",
        email: "",
        password: "",
        image: "",
      });
      if (data.message == "success") {
        toast.success("Your Account has been created successfully", {
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
      if (err.response.status === 409) {
        toast.error("This Email is Already Exist !", {
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
      console.log(err);
    }

    /* const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,{user});*/ //هاي عشان ابعث الداتا عن طريق البودي بحط البراميتر هو اليوزر
  };
  return (
    <>
      <div>Register</div>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <form onSubmit={handelSubmit}>
        <label>userName:</label>
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handelChange}
        />

        <label>email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handelChange}
        />
        <label>password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handelChange}
        />
        <label>image:</label>
        <input type="file" name="image" onChange={handelImageChange} />
        {/*ممنوع احط الفاليو لما يكون نوع الداتا فايل */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Signup;
