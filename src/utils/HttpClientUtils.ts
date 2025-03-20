import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClientUtils {

    static async post<T>(url: string, data: any, headers?: Record<string, string>, withCredentials: boolean = false): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                headers: headers || {},
                withCredentials: withCredentials,
            };

            const response: AxiosResponse<T> = await axios.post(url, data, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`HTTP POST request failed: ${error.message}`);
        }
    }

    static async put<T>(url: string, data: any, headers?: Record<string, string>, withCredentials: boolean = false): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                headers: headers || {},
                withCredentials: withCredentials,
            };

            const response: AxiosResponse<T> = await axios.put(url, data, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`HTTP PUT request failed: ${error.message}`);
        }
    }

    static async delete<T>(url: string, headers?: Record<string, string>, withCredentials: boolean = false): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                headers: headers || {},
                withCredentials: withCredentials,
            };

            const response: AxiosResponse<T> = await axios.delete(url, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`HTTP DELETE request failed: ${error.message}`);
        }
    }

    static async findOne<T>(url: string, headers?: Record<string, string>, withCredentials: boolean = false): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                headers: headers || {},
                withCredentials: withCredentials,
            };

            const response: AxiosResponse<T> = await axios.get(url, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`HTTP GET (findOne) request failed: ${error.message}`);
        }
    }

    static async findAll<T>(url: string, headers?: Record<string, string>, withCredentials: boolean = false): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                headers: headers || {},
                withCredentials: withCredentials,
            };

            const response: AxiosResponse<T> = await axios.get(url, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`HTTP GET (findAll) request failed: ${error.message}`);
        }
    }
}