import axios from 'axios';
import { PhylumTaxon } from './taxon';
import { LoginResponse } from "./authentication";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export const login = async (username: string, password: string) => {
    try {
        let response = await httpClient.post<LoginResponse>('/auth/login', {
            username, password
        })
        return response.data
    }
    catch (Error) {
        return null
    }
};

export const getApiData = async () => {
    return await httpClient.get<PhylumTaxon[]>('/species')
};
