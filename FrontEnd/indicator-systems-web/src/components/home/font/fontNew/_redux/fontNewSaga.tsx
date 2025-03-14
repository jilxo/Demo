import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {FuenteService} from "../../../../../core/services/FuenteService.ts";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {fontNewSlice} from "./fontNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const fuenteService = new FuenteService();

export function* saveFontNewSaga(action: PayloadAction<FuenteModel>) {
    try {
        const {data}: AxiosResponse<FuenteModel> = yield fuenteService.save(action.payload);
        yield put(fontNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(fontNewSlice.actions.saveError(e));
    }
}

export function* watchFontNewAsync() {
    yield all([
        takeEvery(fontNewSlice.actions.save, saveFontNewSaga),
    ]);
}
