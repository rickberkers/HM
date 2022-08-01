import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { NetworkError, UnauthenticatedError, UnknownError, ServerError, ForbiddenError } from "../../../core/errors";

export class AxiosWrapper {

    private axios: AxiosInstance;
    
    constructor(config: AxiosRequestConfig) {
        this.axios = axios.create(config);
        this.axios.interceptors.response.use(response => response, axiosErrorHandler);
    }

    public setAuthHeader(token: string) {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    public get instance(){
        return this.axios;
    }
}

const errorMap = new Map<number, Error>([
    [500, new ServerError()],
    [401, new UnauthenticatedError()],
    [403, new ForbiddenError()],
    [404, new UnknownError()]
]);

const axiosErrorHandler = (error: AxiosError) => {
    if (error.code === "ERR_NETWORK") {
        throw new NetworkError();
    }
    else if (error.response) {
        throw errorMap.get(error.response!.status) ?? new UnknownError();
    }
    else {
        // Something happened in setting up the request that triggered an Error
        throw new UnknownError();
    }
}