import {BaseService} from "./base/BaseService.ts";
import {IndicadorModel} from "../models/IndicadorModel.tsx";
import axios, {AxiosResponse} from "axios";
import {ActorModel} from "../models/ActorModel.tsx";
import {FuenteModel} from "../models/FuenteModel.tsx";
import {RepresenVisualModel} from "../models/RepresenVisualModel.tsx";
import {VariablePorIndicadorModel} from "../models/VariablePorIndicadorModel.tsx";
import {ResultadoPorIndicadorModel} from "../models/ResultadoPorIndicadorModel.tsx";


export class IndicadorService
    extends BaseService<IndicadorModel, number> {

  constructor() {
    super('/rest/api/v1/Indicador');
  }

  saveResponsable(id?: number, actorId?: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${this.url}/${id}/actor/${actorId}`, null);
  }

  deleteResponsable(id?: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.url}/${id}/actor`);
  }

  findResponsable(id?: number): Promise<AxiosResponse<Array<ActorModel | undefined>>> {
    return axios.get<Array<ActorModel>>(`${this.url}/${id}/actor`);
  }

  saveFuente(id?: number, fuenteId?: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${this.url}/${id}/fuente/${fuenteId}`, null);
  }

  deleteFuente(id?: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.url}/${id}/fuente`);
  }

  findFuente(id?: number): Promise<AxiosResponse<Array<FuenteModel | undefined>>> {
    return axios.get<Array<FuenteModel>>(`${this.url}/${id}/fuente`);
  }

  saveRepresenVisual(id?: number, represenVisualId?: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${this.url}/${id}/represenVisual/${represenVisualId}`, null);
  }

  deleteRepresenVisual(id?: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.url}/${id}/represenVisual`);
  }

  findRepresenVisual(id?: number): Promise<AxiosResponse<Array<RepresenVisualModel | undefined>>> {
    return axios.get<Array<RepresenVisualModel>>(`${this.url}/${id}/represenVisual`);
  }

  saveVariable(id?: number, variableId?: string, dato?: number): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${this.url}/${id}/variable/${variableId}/${dato}`, null);
  }

  deleteVariable(id?: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.url}/${id}/variable`);
  }

  findVariable(id?: number): Promise<AxiosResponse<Array<VariablePorIndicadorModel | undefined>>> {
    return axios.get<Array<VariablePorIndicadorModel>>(`${this.url}/${id}/variable`);
  }

  saveResultado(id?: number, resultado?: number): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${this.url}/${id}/resultado/${resultado}`, null);
  }

  deleteResultado(id?: number): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.url}/${id}/resultado`);
  }

  findResultado(id?: number): Promise<AxiosResponse<Array<ResultadoPorIndicadorModel | undefined>>> {
    return axios.get<Array<ResultadoPorIndicadorModel>>(`${this.url}/${id}/resultado`);
  }

}
