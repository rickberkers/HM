import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type PrivateRouteProps = {
    authenticationPath: string;
    component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute = ({authenticationPath, component: Component, ...rest}: PrivateRouteProps) => {
    const { currentUser } = useAuth();
    return (
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={authenticationPath} />
          );
        }}
      ></Route>
    );
}

export default PrivateRoute;