import {BaseService} from "./base/BaseService.ts";
import {ActorModel} from "../models/ActorModel.tsx";


export class ActorService
    extends BaseService<ActorModel, string> {

  constructor() {
    super('/rest/api/v1/Actor');
  }

}
