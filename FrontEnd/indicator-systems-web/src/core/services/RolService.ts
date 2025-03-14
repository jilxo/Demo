import {BaseService} from "./base/BaseService.ts";
import {RolModel} from "../models/RolModel.tsx";


export class RolService
    extends BaseService<RolModel, number> {

  constructor() {
    super('/rest/api/v1/Rol');
  }

}
