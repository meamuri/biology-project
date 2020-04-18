import axios, { AxiosInstance } from 'axios'
import { LoginResponse } from './authentication'
import { PhylumTaxon, SpeciesRecord } from '../taxon'
import { FREQUENCY } from '../frequency'
import { FloraApiException } from './exception'


const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

export class FloraApiClient {
    private token: string | null
    readonly axiosInstance: AxiosInstance

    constructor() {
        this.token = null
        this.axiosInstance = httpClient
    }

    async validateToken(token: string): Promise<Boolean> {
        try {
            await this.call('/health', 'post', { authorization: token }, )
            return true
        } catch (e) {
            return false
        }
    }

    setToken(token: string | null) {
        this.token = token
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        return await this.call('/auth/login', 'post', undefined, {username, password})
    }

    async getSpeciesTree(): Promise<PhylumTaxon[]> {
        return await this.call('/species/tree', 'get', )
    }

    async getSpecies(): Promise<SpeciesRecord[]> {
        return await this.call('/species', 'get', )
    }

    async updateSpecies(id: string, change:  {description: string, frequency: FREQUENCY}): Promise<number> {
        return await this.call(`/species/${id}`, 'put', { authorization: this.token }, change)
    }

    private async call<T>(url: string,
                          method: 'get' | 'post' | 'put',
                          headers?: {authorization: string | null},
                          data?: any): Promise<T> {
        try {
            let response = await this.axiosInstance.request({ url, method, data, headers })
            return response.data
        } catch (e) {
            throw new FloraApiException(e)
        }
    }
}
