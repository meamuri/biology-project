import {PhylumTaxon} from './taxon';
import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export const getApiData = async () => {
    return await httpClient.get<PhylumTaxon[]>('')
};
