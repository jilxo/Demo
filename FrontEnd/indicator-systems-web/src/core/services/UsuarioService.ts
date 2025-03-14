import {BaseService} from "./base/BaseService.ts";
import {UsuarioModel} from "../models/UsuarioModel.tsx";
import axios, {AxiosResponse} from "axios";


export class UsuarioService
    extends BaseService<UsuarioModel, string> {

    constructor() {
        super('/rest/api/v1/Usuario');
    }

    auth(user: UsuarioModel): Promise<AxiosResponse<UsuarioModel>> {
        return axios.post<UsuarioModel>(`${this.url}/auth`, user);
    }

}
