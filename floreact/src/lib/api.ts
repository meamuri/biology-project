import axios from 'axios';
import { PhylumTaxon } from './taxon';
import { LoginResponse } from "./authentication";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export const login = async (username: string, password: string) => {
    let response = await httpClient.post<LoginResponse>('/auth/login', {
        username, password
    })
    if (response.status !== 200) {
        return null
    }
    return response.data
};

export const getApiData = async () => {
    return await httpClient.get<PhylumTaxon[]>('/species')
};
