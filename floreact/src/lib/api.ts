import axios from 'axios'
import { PhylumTaxon, SpeciesRecord, SpeciesTaxon } from './taxon'
import { LoginResponse } from './authentication'
import { FREQUENCY } from './frequency'

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

type LoginAction = (username: string, password: string) => Promise<LoginResponse | null>
export const login: LoginAction = async (username, password) => {
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

type GetSpeciesAction = () => Promise<SpeciesRecord[] | null>
export const getSpecies: GetSpeciesAction = async () => {
    try {
        let res = await httpClient.get<SpeciesRecord[]>('/species/all')
        return res.data
    } catch (e) {
        return null
    }
};

type ModifySpeciesAction = (token: string, id: string, dto: {
    frequency: FREQUENCY,
    description: string,
}) => Promise<SpeciesTaxon | null>
export const modifySpeciesAction: ModifySpeciesAction = async (token, id, dto) => {
    try {
        let res = await httpClient.put<SpeciesTaxon>(
            `/species/${id}`,
            dto,
            {
                headers: {
                    'Authorization': token,
                }
            }
        )
        return res.data
    } catch (e) {
        return null
    }
};
