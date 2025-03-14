import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {VariableService} from "../../../../../core/services/VariableService.ts";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {variableEditSlice} from "./variableEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const variableService = new VariableService();

export function* findVariableEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<VariableModel> = yield variableService.findOne(action.payload);
        yield put(variableEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(variableEditSlice.actions.findError(e));
    }
}

export function* updateVariableEditSaga(action: PayloadAction<VariableModel>) {
    try {
        const {data}: AxiosResponse<VariableModel> = yield variableService.update(action.payload);
        yield put(variableEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(variableEditSlice.actions.updateError(e));
    }
}

export function* watchVariableEditAsync() {
    yield all([
        takeEvery(variableEditSlice.actions.find, findVariableEditSaga),
        takeEvery(variableEditSlice.actions.update, updateVariableEditSaga),
    ]);
}
