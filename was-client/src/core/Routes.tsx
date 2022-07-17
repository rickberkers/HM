import { Route, Redirect } from 'react-router';
import DayView from '../presentation/pages/day/dayView/DayView';
import TodayView from '../presentation/pages/day/todayView/TodayView';
import HouseholdView from '../presentation/pages/householdView/HouseholdView';
import Overview from '../presentation/pages/overview/Overview';
import SignIn from '../presentation/pages/signIn/SignIn';
import PrivateRoute from './components/customRoutes/PrivateRoute';

export enum ROUTE_NAMES {
    TODAY = "/today",
    DAY= "/day",
    OVERVIEW = "/overview",
    SIGN_IN = "/sign-in",
    HOUSEHOLD = "/household"
}

// Used these for reducing renders
// https://github.com/ionic-team/ionic-framework/issues/21635
// https://dev.to/ionic/how-to-reduce-the-number-of-renders-in-an-ionic-react-app-26mm

const Routes = () => {

    const authPath = ROUTE_NAMES.SIGN_IN;

    return (
        <>
            <Route exact path={ROUTE_NAMES.SIGN_IN}><SignIn/></Route>
            <PrivateRoute exact path={ROUTE_NAMES.OVERVIEW} authenticationPath={authPath}><Overview/></PrivateRoute>
            <PrivateRoute exact path={ROUTE_NAMES.TODAY} authenticationPath={authPath} ><TodayView/></PrivateRoute>
            <PrivateRoute exact path={`${ROUTE_NAMES.DAY}/:date`} authenticationPath={authPath} ><DayView/></PrivateRoute>
            <PrivateRoute exact path={ROUTE_NAMES.HOUSEHOLD} authenticationPath={authPath} ><HouseholdView/></PrivateRoute>
            <Route exact path="/">
                <Redirect to={ROUTE_NAMES.OVERVIEW} />
            </Route>
        </>
    );
}

export default Routes;