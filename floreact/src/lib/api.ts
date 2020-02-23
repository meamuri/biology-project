import {PhylumTaxon} from './taxon';
import axios from 'axios';
import {LoginResponse} from "./authentication";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export const login = async () => {
    let response = await httpClient.post<LoginResponse[]>('/auth/login')
    if (response.status !== 200) {
        return null
    }
    return response.data
};

export const getApiData = async () => {
    return await httpClient.get<PhylumTaxon[]>('/species')
};
