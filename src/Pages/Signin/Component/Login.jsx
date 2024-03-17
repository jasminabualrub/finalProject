import { useContext, useState } from "react";
import { object, string} from 'yup';
import axios from "axios";
import { Zoom, toast } from "react-toastify";
import Loader from './../../../Components/Loader/Loader';
import 'bootstrap' 
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import '../../../Context/User'
import { UserContext } from "../../../Context/User";
function Login() {
  const {setUserToken}=useContext(UserContext);
  const navigate=useNavigate();
  const [errors,setError]=useState([]);
  const[loader,setLoader]=useState(false);
  const [user, setUser] = useState({
  
    email: "",
    password: "",
   
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
 
  const validateData=async()=>{
    const RegisterSchema=object({
            
             email:string().email('Plz check your Email'),
             password:string().min(8,'at least 8 Char').max(20).required('passward is required field'),
    });

try{
await RegisterSchema.validate(user,{abortEarly:false});
return true;}
catch(err){
  console.log("validation error",err.errors);
 setError(err.errors);
return false;}
              
  }
 
   
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate=await validateData();
    console.log(validate);
 
    try{
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,user
    );
    setUser({
      userName: "",
      email: "",
      password: "",
      image: "",
    });
    
    if (data.message == "success") {
      
      toast.success("you are success to login", {
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
      navigate('/')
    }
    console.log(data);
  } catch (err) {
    if (err.response.status === 400) {
      toast.error("plz confirm your email !", {
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
  finally{
    setLoader(false);
  }
  }
    
    
    /* const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,{user});*/ //هاي عشان ابعث الداتا عن طريق البودي بحط البراميتر هو اليوزر
 

  return (
    <>
      
 {errors.length > 0?errors.map(error=><p>{error}</p>):''}
 <div className='formStyle'>
  <h1>Login</h1>
 <form onSubmit={handelSubmit}>
      
<div className="email-container">
<label>Email:</label>
      <input className="form-control"
        type="email"
        name="email"
        value={user.email}
        onChange={handelChange}
      />
</div>
      <div className="passward-container"><label>Password:</label>
      <input className="form-control"
        type="password"
        name="password"
        value={user.password}
        onChange={handelChange}
      /></div>
      
      <div className="remember-forgot">
      <label><input type='checkbox'/>Remmember me</label>
      <Link to={`/forgetpassward`}><span>Forgot Passward ?</span></Link>
      
      </div>
      
    
      <button type="submit"  className= "btn btn-outline-success" disabled={loader?'disabled':null}>{!loader?'login':'Wait...'}</button>
      <div className="register-link">
      Dont have an acount?
      <Link to={`/signup`}>
      <span>Register?</span>
      </Link>
      
      </div>
    </form>
 </div>
      
    </>
  );
  }

export default Login;
