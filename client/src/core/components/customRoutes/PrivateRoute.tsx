import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PrivateRouteProps = {
    authenticationPath: string;
} & RouteProps;

const PrivateRoute = ({authenticationPath, ...rest}: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
      return <Redirect to={authenticationPath} />
    }

    return (
      <Route
        {...rest}
      ></Route>
    );
}

export default PrivateRoute;