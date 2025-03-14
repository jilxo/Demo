import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {decreeListSlice} from "./decreeListSlice.tsx";
import {DecreeService} from "../../../../../core/services/DecreeService.ts";


const decreeService = new DecreeService();

/**
 * find decree list saga
 *
 * @param action action
 */
export function* findDecreeListSaga(action: any) {
    try {
        const {data}: AxiosResponse<Array<any>> = yield decreeService.find();
        yield put(decreeListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(decreeListSlice.actions.findError(e));
    }
}

/**
 * watch decree List async
 */
export function* watchDecreeListAsync() {
    yield all([
        takeEvery(decreeListSlice.actions.find, findDecreeListSaga),
    ]);
}
