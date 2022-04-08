import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class AxiosWrapper {

    private axios: AxiosInstance;
    
    constructor(config: AxiosRequestConfig) {
        this.axios = axios.create(config);
    }

    public setAuthHeader(token: string) {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    public get instance(){
        return this.axios;
    }
}