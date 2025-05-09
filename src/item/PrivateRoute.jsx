import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
  return token
    ? <Outlet />                       // Alt rotaları (children) göster
    : <Navigate to="/login" replace />; // Yoksa login’e gönder
  };
  
  export default PrivateRoute;