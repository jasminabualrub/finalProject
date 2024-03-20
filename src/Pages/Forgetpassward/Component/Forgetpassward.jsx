import { useContext, useState } from "react";
import { object, string} from 'yup';
import axios from "axios";
import { Zoom, toast } from "react-toastify";

import 'bootstrap' 
import {  useNavigate } from "react-router-dom";

import '../../../Context/User'
import { UserContext } from "../../../Context/User";
function Forgetpassward() {
  const {setUserToken}=useContext(UserContext);
  const navigate=useNavigate();
  const [errors,setError]=useState([]);
  const[loader,setLoader]=useState(false);
  const [user, setUser] = useState({
  
    email: "",
    password: "",
    code:"",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
 
  const validateData=async()=>{
    const ForgetSchema=object({
            
             email:string().email('Plz check your Email'),
             password:string().min(8,'at least 8 Char').max(20).required('passward is required field'),
             code:string().min(4,'at least 4 Char').max(10).required('code is required field'),
    });

try{
await ForgetSchema.validate(user,{abortEarly:false});
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
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user
    );
    setUser({
      
      email: "",
      password: "",
      code:"",
      
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
  <h1>ForgetPassward</h1>
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
      
      <div className="passward-container"><label>Code:</label>
      <input className="form-control"
        type="text"
        name="code"
        value={user.code}
        onChange={handelChange}
      /></div>
      
    
      <button type="submit"  className= "btn btn-outline-success" disabled={loader?'disabled':null}>{!loader?'submit':'Wait...'}</button>
      
    </form>
 </div>
      
    </>
  );
  }

export default Forgetpassward;
