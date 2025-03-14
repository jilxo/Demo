import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {RolService} from "../../../../../core/services/RolService.ts";
import {RolModel} from "../../../../../core/models/RolModel.tsx";
import {roleEditSlice} from "./roleEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const rolService = new RolService();

export function* findRolEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<RolModel> = yield rolService.findOne(action.payload);
        yield put(roleEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(roleEditSlice.actions.findError(e));
    }
}

export function* updateRolEditSaga(action: PayloadAction<RolModel>) {
    try {
        const {data}: AxiosResponse<RolModel> = yield rolService.update(action.payload);
        yield put(roleEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(roleEditSlice.actions.updateError(e));
    }
}

export function* watchRoleEditAsync() {
    yield all([
        takeEvery(roleEditSlice.actions.find, findRolEditSaga),
        takeEvery(roleEditSlice.actions.update, updateRolEditSaga),
    ]);
}
