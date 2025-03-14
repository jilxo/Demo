import {BaseService} from "./base/BaseService.ts";
import {ParagrafoModel} from "../models/ParagrafoModel.tsx";


export class ParagrafoService
    extends BaseService<ParagrafoModel, string> {

  constructor() {
    super('/rest/api/v1/Paragrafo');
  }

}
