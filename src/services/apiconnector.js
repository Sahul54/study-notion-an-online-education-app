import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, header, params) => {
    return axiosInstance({
        methond: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData: null,
        header: header ? header: null,
        params: params ? params: null,
    });
}

