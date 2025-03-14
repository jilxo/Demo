import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {TipoIndicadorService} from "../../../../../core/services/TipoIndicadorService.ts";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {indicatorTypeNewSlice} from "./indicatorTypeNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const tipoIndicadorService = new TipoIndicadorService();

export function* saveIndicatorTypeNewSaga(action: PayloadAction<TipoIndicadorModel>) {
    try {
        const {data}: AxiosResponse<TipoIndicadorModel> = yield tipoIndicadorService.save(action.payload);
        yield put(indicatorTypeNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(indicatorTypeNewSlice.actions.saveError(e));
    }
}

export function* watchIndicatorTypeNewAsync() {
    yield all([
        takeEvery(indicatorTypeNewSlice.actions.save, saveIndicatorTypeNewSaga),
    ]);
}
