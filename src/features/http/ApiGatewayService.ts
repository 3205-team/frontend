import {injectable} from "inversify";
import axios, {AxiosInstance} from 'axios'
import 'reflect-metadata'

@injectable()
export class ApiGatewayService {
    public static diKey = Symbol.for('ApiGatewayService')
    private _http: AxiosInstance = axios.create({baseURL: 'http://localhost:38061'})
    constructor(
    ) {
    }

    get(url: string, params?: any) {
        return this._http.get(url, {params})
    }

    post<T>(url: string, data: T) {
        return this._http.post(url, data)
    }

    put<T>(url: string, data: T) {
        return this._http.put(url, data)
    }

    delete(url: string) {
        return this._http.delete(url)
    }
}

export default ApiGatewayService