
import { Navigate } from 'react-router-dom';

function ProductsRoutes({children}) {
   /* const navigate= useNavigate();*/
    const token=localStorage.getItem('userToken');
    if(!token){
/*navigate('/signin')*/
 return <Navigate to='/signin' replace/>
    }
  return children;
}

export default ProductsRoutes