import prodEnvironment from '../../../environment';
import devEnvironment from '../../../environment';

export const getBaseUrl = (node_env: string) => {
    switch(node_env) {
        case 'production':
            return prodEnvironment.REACT_APP_API_BASE_URL;
        default:
            return devEnvironment.REACT_APP_API_BASE_URL;
    }
}