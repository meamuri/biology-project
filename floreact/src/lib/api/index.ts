import axios, {AxiosError, AxiosInstance} from 'axios'
import { PhylumTaxon, SpeciesRecord } from '../taxon'
import { LoginResponse } from '../authentication'
import { FREQUENCY } from '../frequency'

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export default class FloraApiClient {
    private token: string | null
    readonly axiosInstance: AxiosInstance

    constructor() {
        this.token = null
        this.axiosInstance = httpClient
    }

    setToken(token: string | null) {
        this.token = token
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

    async updateSpecies(id: string, change:  {description: string, frequency: FREQUENCY}): Promise<number> {
        return await this.call(`/species/${id}`, 'put', { authorization: this.token }, change)
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
