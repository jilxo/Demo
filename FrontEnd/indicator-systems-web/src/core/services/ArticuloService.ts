import {BaseService} from "./base/BaseService.ts";
import {ArticuloModel} from "../models/ArticuloModel.tsx";


export class ArticuloService
    extends BaseService<ArticuloModel, string> {

  constructor() {
    super('/rest/api/v1/Articulo');
  }

}
