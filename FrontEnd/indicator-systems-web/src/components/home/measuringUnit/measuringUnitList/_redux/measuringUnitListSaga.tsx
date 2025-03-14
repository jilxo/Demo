import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {measuringUnitListSlice} from "./measuringUnitListSlice.tsx";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {UnidadMedicionService} from "../../../../../core/services/UnidadMedicionService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const unidadMedicionService = new UnidadMedicionService();

export function* findMeasuringUnitListSaga() {
    try {
        const {data}: AxiosResponse<Array<UnidadMedicionModel>> = yield unidadMedicionService.find();
        yield put(measuringUnitListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(measuringUnitListSlice.actions.findError(e));
    }
}

export function* deleteMeasuringUnitListSaga(action: PayloadAction<number>) {
    try {
        yield unidadMedicionService.delete(action.payload);
        yield put(measuringUnitListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(measuringUnitListSlice.actions.deleteError(e));
    }
}

export function* watchMeasuringUnitListAsync() {
    yield all([
        takeEvery(measuringUnitListSlice.actions.find, findMeasuringUnitListSaga),
        takeEvery(measuringUnitListSlice.actions.delete, deleteMeasuringUnitListSaga),
    ]);
}
