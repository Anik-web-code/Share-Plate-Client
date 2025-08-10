import { use } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/Login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
