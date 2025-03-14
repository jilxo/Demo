import axios, {AxiosResponse} from "axios";
import {RolModel} from "../models/RolModel.tsx";


export class UsuarioRolService {

  url = '/rest/api/v1/RolUsuario';

  save(email?: string, rolId?: number): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${this.url}/usuario/${email}/rol/${rolId}`, null);
  }

  delete(email?: string, rolId?: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.url}/usuario/${email}/rol/${rolId}`);
  }

  find(email?: string): Promise<AxiosResponse<Array<RolModel>>> {
    return axios.get<Array<RolModel>>(`${this.url}/usuario/${email}`);
  }

}
