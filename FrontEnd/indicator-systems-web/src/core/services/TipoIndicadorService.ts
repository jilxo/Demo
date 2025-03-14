import {BaseService} from "./base/BaseService.ts";
import {TipoIndicadorModel} from "../models/TipoIndicadorModel.tsx";


export class TipoIndicadorService
    extends BaseService<TipoIndicadorModel, number> {

  constructor() {
    super('/rest/api/v1/TipoIndicador');
  }

}
