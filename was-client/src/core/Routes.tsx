import { Route, Redirect } from 'react-router';
import DayView from '../presentation/pages/DayView';
import HouseholdView from '../presentation/pages/HouseholdView';
import Overview from '../presentation/pages/Overview';
import SignIn from '../presentation/pages/SignIn';
import PrivateRoute from './components/customRoutes/PrivateRoute';

export enum ROUTE_NAMES {
    DAY = "/day",
    OVERVIEW = "/overview",
    SIGN_IN = "/sign-in",
    HOUSEHOLD = "/household"
}

const Routes = () => {

    const authPath = ROUTE_NAMES.SIGN_IN;

    return (
        <>
            <Route exact path={ROUTE_NAMES.SIGN_IN} component={SignIn} />
            <PrivateRoute exact path={ROUTE_NAMES.OVERVIEW} authenticationPath={authPath} component={Overview} />
            <PrivateRoute exact path={ROUTE_NAMES.DAY} authenticationPath={authPath} component={DayView} />
            <PrivateRoute exact path={ROUTE_NAMES.HOUSEHOLD} authenticationPath={authPath} component={HouseholdView} />
            <Route exact path="/">
                <Redirect to={ROUTE_NAMES.OVERVIEW} />
            </Route>
        </>
    );
}

export default Routes;