import {
  IonApp,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../presentation/theme/variables.css';
import { AuthProvider } from './contexts/AuthContext';
import { DependencyProvider } from './contexts/DependencyContext';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import TabView from '../presentation/components/core/tabView/TabView';
import { SettingsProvider } from './contexts/SettingsContext';

setupIonicReact();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    },
  }
});

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

// TODO use error boundaries
// TODO use virtual scroll for better performance

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <DependencyProvider>
      <AuthProvider>
        <SettingsProvider>
          <IonApp>
            <IonReactRouter>
              <TabView/>
            </IonReactRouter>
          </IonApp>
        </SettingsProvider>
      </AuthProvider>
    </DependencyProvider>
  </QueryClientProvider>
  );
}

export default App;

