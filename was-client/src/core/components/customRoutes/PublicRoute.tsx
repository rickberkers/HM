import React from "react";
import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PublicRouteProps = {
    redirectPath: string;
} & RouteProps;

const PublicRoute = ({redirectPath, ...rest}: PublicRouteProps) => {
    const { isAuthenticated } = useAuth();

    if(isAuthenticated) {
      return <Redirect to={redirectPath} />
    }

    return (
      <Route
        {...rest}
      ></Route>
    );
}

export default PublicRoute;