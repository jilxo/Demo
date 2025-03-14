import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {indicatorTypeListSlice} from "./indicatorTypeListSlice.tsx";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {TipoIndicadorService} from "../../../../../core/services/TipoIndicadorService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const tipoIndicadorService = new TipoIndicadorService();

export function* findIndicatorTypeListSaga() {
    try {
        const {data}: AxiosResponse<Array<TipoIndicadorModel>> = yield tipoIndicadorService.find();
        yield put(indicatorTypeListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(indicatorTypeListSlice.actions.findError(e));
    }
}

export function* deleteIndicatorTypeListSaga(action: PayloadAction<number>) {
    try {
        yield tipoIndicadorService.delete(action.payload);
        yield put(indicatorTypeListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(indicatorTypeListSlice.actions.deleteError(e));
    }
}

export function* watchIndicatorTypeListAsync() {
    yield all([
        takeEvery(indicatorTypeListSlice.actions.find, findIndicatorTypeListSaga),
        takeEvery(indicatorTypeListSlice.actions.delete, deleteIndicatorTypeListSaga),
    ]);
}
