import {BaseService} from "./base/BaseService.ts";
import {SentidoModel} from "../models/SentidoModel.tsx";


export class SentidoService
    extends BaseService<SentidoModel, number> {

  constructor() {
    super('/rest/api/v1/Sentido');
  }

}
