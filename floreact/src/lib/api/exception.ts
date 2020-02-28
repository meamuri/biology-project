import {AxiosError} from "axios";

export class FloraApiException extends Error {
    readonly responseStatus: number
    constructor(e: AxiosError) {
        super()
        this.responseStatus = e.response?.status || -1
    }
}
