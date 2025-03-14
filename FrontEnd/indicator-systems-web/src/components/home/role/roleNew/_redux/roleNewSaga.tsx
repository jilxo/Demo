import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {RolService} from "../../../../../core/services/RolService.ts";
import {RolModel} from "../../../../../core/models/RolModel.tsx";
import {roleNewSlice} from "./roleNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const rolService = new RolService();

export function* saveRoleNewSaga(action: PayloadAction<RolModel>) {
    try {
        const {data}: AxiosResponse<RolModel> = yield rolService.save(action.payload);
        yield put(roleNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(roleNewSlice.actions.saveError(e));
    }
}

export function* watchRoleNewAsync() {
    yield all([
        takeEvery(roleNewSlice.actions.save, saveRoleNewSaga),
    ]);
}
