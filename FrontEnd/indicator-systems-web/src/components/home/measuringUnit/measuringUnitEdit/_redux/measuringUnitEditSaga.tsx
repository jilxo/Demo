import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {UnidadMedicionService} from "../../../../../core/services/UnidadMedicionService.ts";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {measuringUnitEditSlice} from "./measuringUnitEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const unidadMedicionService = new UnidadMedicionService();

export function* findMeasuringUnitEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<UnidadMedicionModel> = yield unidadMedicionService.findOne(action.payload);
        yield put(measuringUnitEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(measuringUnitEditSlice.actions.findError(e));
    }
}

export function* updateMeasuringUnitEditSaga(action: PayloadAction<UnidadMedicionModel>) {
    try {
        const {data}: AxiosResponse<UnidadMedicionModel> = yield unidadMedicionService.update(action.payload);
        yield put(measuringUnitEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(measuringUnitEditSlice.actions.updateError(e));
    }
}

export function* watchMeasuringUnitEditAsync() {
    yield all([
        takeEvery(measuringUnitEditSlice.actions.find, findMeasuringUnitEditSaga),
        takeEvery(measuringUnitEditSlice.actions.update, updateMeasuringUnitEditSaga),
    ]);
}
