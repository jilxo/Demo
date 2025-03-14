import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {SentidoService} from "../../../../../core/services/SentidoService.ts";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {senseEditSlice} from "./senseEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const sentidoService = new SentidoService();

export function* findSenseEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<SentidoModel> = yield sentidoService.findOne(action.payload);
        yield put(senseEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(senseEditSlice.actions.findError(e));
    }
}

export function* updateSenseEditSaga(action: PayloadAction<SentidoModel>) {
    try {
        const {data}: AxiosResponse<SentidoModel> = yield sentidoService.update(action.payload);
        yield put(senseEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(senseEditSlice.actions.updateError(e));
    }
}

export function* watchSenseEditAsync() {
    yield all([
        takeEvery(senseEditSlice.actions.find, findSenseEditSaga),
        takeEvery(senseEditSlice.actions.update, updateSenseEditSaga),
    ]);
}
