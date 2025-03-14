import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {FrecuenciaService} from "../../../../../core/services/FrecuenciaService.ts";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {frecuenciaEditSlice} from "./frecuenciaEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const frecuenciaService = new FrecuenciaService();

export function* findFrecuenciaEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<FrecuenciaModel> = yield frecuenciaService.findOne(action.payload);
        yield put(frecuenciaEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(frecuenciaEditSlice.actions.findError(e));
    }
}

export function* updateFrecuenciaEditSaga(action: PayloadAction<FrecuenciaModel>) {
    try {
        const {data}: AxiosResponse<FrecuenciaModel> = yield frecuenciaService.update(action.payload);
        yield put(frecuenciaEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(frecuenciaEditSlice.actions.updateError(e));
    }
}

export function* watchFrecuenciaEditAsync() {
    yield all([
        takeEvery(frecuenciaEditSlice.actions.find, findFrecuenciaEditSaga),
        takeEvery(frecuenciaEditSlice.actions.update, updateFrecuenciaEditSaga),
    ]);
}
