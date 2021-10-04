import { Route, Redirect } from 'react-router';
import DayView from '../pages/DayView';
import Overview from '../pages/Overview';
import SignIn from '../pages/SignIn';
import PrivateRoute from './customRoutes/PrivateRoute';

enum ROUTE_NAMES {
    DAY_VIEW = "/day",
    OVERVIEW = "/overview",
    SIGN_IN = "/sign-in",
}

const Routes = () => {

    const authPath = ROUTE_NAMES.SIGN_IN;

    return (
        <>
            <Route exact path={ROUTE_NAMES.SIGN_IN} component={SignIn} />
            <PrivateRoute exact path={ROUTE_NAMES.OVERVIEW} authenticationPath={authPath} component={Overview} />
            <PrivateRoute exact path={ROUTE_NAMES.DAY_VIEW} authenticationPath={authPath} component={DayView} />
            <Route exact path="/">
                <Redirect to={ROUTE_NAMES.OVERVIEW} />
            </Route>
        </>
    );
}

export default Routes;