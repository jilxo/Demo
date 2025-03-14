import {BaseService} from "./base/BaseService.ts";
import {NumeralModel} from "../models/NumeralModel.tsx";


export class NumeralService
    extends BaseService<NumeralModel, string> {

  constructor() {
    super('/rest/api/v1/Numeral');
  }

}
