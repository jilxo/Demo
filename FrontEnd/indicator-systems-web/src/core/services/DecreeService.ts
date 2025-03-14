import {BaseService} from "./base/BaseService.ts";


export class DecreeService extends BaseService<any, number> {

  constructor() {
    super('/rest/api/v1/decrees');
  }

}
