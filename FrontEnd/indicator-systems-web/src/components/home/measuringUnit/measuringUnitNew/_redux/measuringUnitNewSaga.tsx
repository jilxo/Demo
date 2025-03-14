import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {UnidadMedicionService} from "../../../../../core/services/UnidadMedicionService.ts";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {measuringUnitNewSlice} from "./measuringUnitNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const unidadMedicionService = new UnidadMedicionService();

export function* saveMeasuringUnitNewSaga(action: PayloadAction<UnidadMedicionModel>) {
    try {
        const {data}: AxiosResponse<UnidadMedicionModel> = yield unidadMedicionService.save(action.payload);
        yield put(measuringUnitNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(measuringUnitNewSlice.actions.saveError(e));
    }
}

export function* watchMeasuringUnitNewAsync() {
    yield all([
        takeEvery(measuringUnitNewSlice.actions.save, saveMeasuringUnitNewSaga),
    ]);
}
