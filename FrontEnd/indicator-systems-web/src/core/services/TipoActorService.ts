import {BaseService} from "./base/BaseService.ts";
import {TipoActorModel} from "../models/TipoActorModel.tsx";


export class TipoActorService
    extends BaseService<TipoActorModel, number> {

  constructor() {
    super('/rest/api/v1/TipoActor');
  }

}
