import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {roleListSlice} from "./roleListSlice.tsx";
import {RolModel} from "../../../../../core/models/RolModel.tsx";
import {RolService} from "../../../../../core/services/RolService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const rolService = new RolService();

export function* findRolListSaga() {
    try {
        const {data}: AxiosResponse<Array<RolModel>> = yield rolService.find();
        yield put(roleListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(roleListSlice.actions.findError(e));
    }
}

export function* deleteRolListSaga(action: PayloadAction<number>) {
    try {
        yield rolService.delete(action.payload);
        yield put(roleListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(roleListSlice.actions.deleteError(e));
    }
}

export function* watchRolListAsync() {
    yield all([
        takeEvery(roleListSlice.actions.find, findRolListSaga),
        takeEvery(roleListSlice.actions.delete, deleteRolListSaga),
    ]);
}
