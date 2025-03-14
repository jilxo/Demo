import {BaseService} from "./base/BaseService.ts";
import {FrecuenciaModel} from "../models/FrecuenciaModel.tsx";


export class FrecuenciaService
    extends BaseService<FrecuenciaModel, number> {

  constructor() {
    super('/rest/api/v1/Frecuencia');
  }

}
