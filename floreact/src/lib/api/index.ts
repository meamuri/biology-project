import axios, {AxiosError, AxiosInstance} from 'axios'
import { PhylumTaxon, SpeciesRecord, SpeciesTaxon } from '../taxon'
import { LoginResponse } from '../authentication'
import { FREQUENCY } from '../frequency'

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export default class FloraApiClient {
    token: string | null
    readonly axiosInstance: AxiosInstance

    constructor() {
        this.token = null
        this.axiosInstance = httpClient
    }

    async login(username: string, password: string): Promise<LoginResponse | number> {
        return await this.call('/auth/login', 'post', undefined, {username, password})
    }

    async getSpeciesTree(): Promise<PhylumTaxon[] | number> {
        return await this.call('/species/tree', 'get', )
    }

    async getSpecies(): Promise<SpeciesRecord[] | number> {
        return await this.call('/species', 'get', )
    }

    async updateSpecies(id: string, description: string, frequency: FREQUENCY): Promise<number> {
        return await this.call(`/species/${id}`, 'put', { authorization: this.token }, { description, frequency })
    }

    private async call<T>(url: string,
                          method: 'get' | 'post' | 'put',
                          headers?: {authorization: string | null},
                          data?: any): Promise<T | number> {
        return this.axiosInstance
            .request({ url, method, data, headers })
            .then(r => r.data)
            .catch((e: AxiosError) => e.response?.status)
    }
}

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
