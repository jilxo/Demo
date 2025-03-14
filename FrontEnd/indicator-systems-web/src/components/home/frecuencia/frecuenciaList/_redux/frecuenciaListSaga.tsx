import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {frecuenciaListSlice} from "./frecuenciaListSlice.tsx";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {FrecuenciaService} from "../../../../../core/services/FrecuenciaService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const frecuenciaService = new FrecuenciaService();

export function* findFrecuenciaListSaga() {
    try {
        const {data}: AxiosResponse<Array<FrecuenciaModel>> = yield frecuenciaService.find();
        yield put(frecuenciaListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(frecuenciaListSlice.actions.findError(e));
    }
}

export function* deleteFrecuenciaListSaga(action: PayloadAction<number>) {
    try {
        yield frecuenciaService.delete(action.payload);
        yield put(frecuenciaListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(frecuenciaListSlice.actions.deleteError(e));
    }
}

export function* watchFrecuenciaListAsync() {
    yield all([
        takeEvery(frecuenciaListSlice.actions.find, findFrecuenciaListSaga),
        takeEvery(frecuenciaListSlice.actions.delete, deleteFrecuenciaListSaga),
    ]);
}
