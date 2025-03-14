import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {TipoIndicadorService} from "../../../../../core/services/TipoIndicadorService.ts";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {indicatorTypeEditSlice} from "./indicatorTypeEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const tipoIndicadorService = new TipoIndicadorService();

export function* findIndicatorTypeEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<TipoIndicadorModel> = yield tipoIndicadorService.findOne(action.payload);
        yield put(indicatorTypeEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(indicatorTypeEditSlice.actions.findError(e));
    }
}

export function* updateIndicatorTypeEditSaga(action: PayloadAction<TipoIndicadorModel>) {
    try {
        const {data}: AxiosResponse<TipoIndicadorModel> = yield tipoIndicadorService.update(action.payload);
        yield put(indicatorTypeEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(indicatorTypeEditSlice.actions.updateError(e));
    }
}

export function* watchIndicatorTypeEditAsync() {
    yield all([
        takeEvery(indicatorTypeEditSlice.actions.find, findIndicatorTypeEditSaga),
        takeEvery(indicatorTypeEditSlice.actions.update, updateIndicatorTypeEditSaga),
    ]);
}
