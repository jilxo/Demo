import {BaseService} from "./base/BaseService.ts";
import {RepresenVisualModel} from "../models/RepresenVisualModel.tsx";


export class RepresenVisualService
    extends BaseService<RepresenVisualModel, number> {

  constructor() {
    super('/rest/api/v1/Representacionvisual');
  }

}
