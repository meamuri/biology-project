import {PhylumTaxon} from './taxon';
import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const getApiData = async () => {
    return await httpClient.get<PhylumTaxon[]>('')
};
