import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {FrecuenciaService} from "../../../../../core/services/FrecuenciaService.ts";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {frecuenciaNewSlice} from "./frecuenciaNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const frecuenciaService = new FrecuenciaService();

export function* saveFrecuenciaNewSaga(action: PayloadAction<FrecuenciaModel>) {
    try {
        const {data}: AxiosResponse<FrecuenciaModel> = yield frecuenciaService.save(action.payload);
        yield put(frecuenciaNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(frecuenciaNewSlice.actions.saveError(e));
    }
}

export function* watchFrecuenciaNewAsync() {
    yield all([
        takeEvery(frecuenciaNewSlice.actions.save, saveFrecuenciaNewSaga),
    ]);
}
