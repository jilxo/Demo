import {BaseService} from "./base/BaseService.ts";
import {FuenteModel} from "../models/FuenteModel.tsx";


export class FuenteService
    extends BaseService<FuenteModel, number> {

  constructor() {
    super('/rest/api/v1/Fuente');
  }

}
