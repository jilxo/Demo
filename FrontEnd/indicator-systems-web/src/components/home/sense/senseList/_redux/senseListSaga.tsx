import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {senseListSlice} from "./senseListSlice.tsx";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {SentidoService} from "../../../../../core/services/SentidoService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const sentidoService = new SentidoService();

export function* findSenseListSaga() {
    try {
        const {data}: AxiosResponse<Array<SentidoModel>> = yield sentidoService.find();
        yield put(senseListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(senseListSlice.actions.findError(e));
    }
}

export function* deleteSenseListSaga(action: PayloadAction<number>) {
    try {
        yield sentidoService.delete(action.payload);
        yield put(senseListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(senseListSlice.actions.deleteError(e));
    }
}

export function* watchSenseListAsync() {
    yield all([
        takeEvery(senseListSlice.actions.find, findSenseListSaga),
        takeEvery(senseListSlice.actions.delete, deleteSenseListSaga),
    ]);
}
