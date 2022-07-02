import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { calendar, list, logIn } from "ionicons/icons";
import { ReactNode } from "react";
import { useAuth } from "../../../../core/hooks/useAuth";
import Routes, { ROUTE_NAMES } from "../../../../core/Routes";

const TabView = () => {

    const { isAuthenticated } = useAuth();

    let tabs: ReactNode[] = [
        <IonTabButton key={ROUTE_NAMES.OVERVIEW} tab={ROUTE_NAMES.OVERVIEW} href={ROUTE_NAMES.OVERVIEW}>
            <IonIcon icon={list} />
            <IonLabel>Days</IonLabel>
        </IonTabButton>,
        <IonTabButton key={ROUTE_NAMES.DAY} tab={ROUTE_NAMES.DAY} href={ROUTE_NAMES.DAY}>
            <IonIcon icon={calendar} />
            <IonLabel>Today</IonLabel>
        </IonTabButton>,
        <IonTabButton key={ROUTE_NAMES.HOUSEHOLD} tab={ROUTE_NAMES.HOUSEHOLD} href={ROUTE_NAMES.HOUSEHOLD}>
            <IonIcon icon={calendar} />
            <IonLabel>Household</IonLabel>
        </IonTabButton>
    ];

    if (!isAuthenticated) {
        tabs = [
            <IonTabButton key={ROUTE_NAMES.SIGN_IN} tab={ROUTE_NAMES.SIGN_IN} href={ROUTE_NAMES.SIGN_IN}>
                <IonIcon icon={logIn} />
                <IonLabel>Sign in</IonLabel>
            </IonTabButton>
        ];
    }

    return (
        <IonTabs>
            <IonRouterOutlet>
              <Routes/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                {tabs}
            </IonTabBar>
        </IonTabs>
    );
};

export default TabView;
