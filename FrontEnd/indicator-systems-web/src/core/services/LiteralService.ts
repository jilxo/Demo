import {BaseService} from "./base/BaseService.ts";
import {LiteralModel} from "../models/LiteralModel.tsx";


export class LiteralService
    extends BaseService<LiteralModel, string> {

  constructor() {
    super('/rest/api/v1/Literal');
  }

}
