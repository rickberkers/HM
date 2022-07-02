import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PrivateRouteProps = {
    authenticationPath: string;
    component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute = ({authenticationPath, component: Component, ...rest}: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth();
    return (
      <Route
        {...rest}
        render={(props) => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={authenticationPath} />
          );
        }}
      ></Route>
    );
}

export default PrivateRoute;