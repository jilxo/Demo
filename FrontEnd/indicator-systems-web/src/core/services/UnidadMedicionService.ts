import {BaseService} from "./base/BaseService.ts";
import {UnidadMedicionModel} from "../models/UnidadMedicionModel.tsx";


export class UnidadMedicionService
    extends BaseService<UnidadMedicionModel, number> {

  constructor() {
    super('/rest/api/v1/UnidadMedicion');
  }

}
