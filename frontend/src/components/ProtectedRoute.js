import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ component: Component, ...props }) => {
  return props.isLoggedIn ? <Component {...props} /> : <Navigate to='/signin' replace/>;
}


export default ProtectedRouteElement