import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {SentidoService} from "../../../../../core/services/SentidoService.ts";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {senseNewSlice} from "./senseNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const senseService = new SentidoService();

export function* saveSenseNewSaga(action: PayloadAction<SentidoModel>) {
    try {
        const {data}: AxiosResponse<SentidoModel> = yield senseService.save(action.payload);
        yield put(senseNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(senseNewSlice.actions.saveError(e));
    }
}

export function* watchSenseNewAsync() {
    yield all([
        takeEvery(senseNewSlice.actions.save, saveSenseNewSaga),
    ]);
}
