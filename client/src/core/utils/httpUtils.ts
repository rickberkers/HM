import devEnvironment from "../../environment";
import prodEnvironment from "../../environment.prod";

export const getBaseUrl = (node_env: string) => {
    switch(node_env) {
        case 'production':
            return prodEnvironment.REACT_APP_API_BASE_URL;
        default:
            return devEnvironment.REACT_APP_API_BASE_URL;
    }
}