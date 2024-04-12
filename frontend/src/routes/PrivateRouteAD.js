import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
function PrivateRouteAD({ children }) {
  

  const x = useSelector((state) => state.userReducer.isAuth);

  /*   const y = useSelector((state) => state.userReducer.isAuth);
   */
  return x ? children : <Navigate to="/authentificate/login" replace />;;
}
export default PrivateRouteAD;
