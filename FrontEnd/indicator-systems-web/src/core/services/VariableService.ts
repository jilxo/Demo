import {BaseService} from "./base/BaseService.ts";
import {VariableModel} from "../models/VariableModel.tsx";


export class VariableService
    extends BaseService<VariableModel, number> {

  constructor() {
    super('/rest/api/v1/Variable');
  }

}
