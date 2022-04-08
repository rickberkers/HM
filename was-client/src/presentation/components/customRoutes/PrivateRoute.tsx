import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";
import { useAuth } from "../../../core/contexts/AuthContext";

type PrivateRouteProps = {
    authenticationPath: string;
    component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute = ({authenticationPath, component: Component, ...rest}: PrivateRouteProps) => {
    const { user } = useAuth();
    return (
      <Route
        {...rest}
        render={(props) => {
          return user ? (
            <Component {...props} />
          ) : (
            <Redirect to={authenticationPath} />
          );
        }}
      ></Route>
    );
}

export default PrivateRoute;