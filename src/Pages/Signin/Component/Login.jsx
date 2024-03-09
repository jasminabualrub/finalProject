import { useState } from "react";
import { object, string} from 'yup';
import axios from "axios";

function Login() {
  const [errors,setError]=useState([]);
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
    const validate=await validateData();
    console.log(validate);
 
    try{
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,user
    );
    setUser({
     
      email: "",
      password: "",
    
    });
    console.log(data);}
    catch(err){console.log(err)}}
    
    
    /* const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,{user});*/ //هاي عشان ابعث الداتا عن طريق البودي بحط البراميتر هو اليوزر
  
  return (
    <>
      <div>Login</div>
 {errors.length > 0?errors.map(error=><p>{error}</p>):''}
      <form onSubmit={handelSubmit}>
      

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
      
        <button type="submit">Submit</button>
      </form>
    </>
  );
  }

export default Login;
