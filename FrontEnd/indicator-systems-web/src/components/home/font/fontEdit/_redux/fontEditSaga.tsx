import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {FuenteService} from "../../../../../core/services/FuenteService.ts";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {fontEditSlice} from "./fontEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const fuenteService = new FuenteService();

export function* findFontEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<FuenteModel> = yield fuenteService.findOne(action.payload);
        yield put(fontEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(fontEditSlice.actions.findError(e));
    }
}

export function* updateFontEditSaga(action: PayloadAction<FuenteModel>) {
    try {
        const {data}: AxiosResponse<FuenteModel> = yield fuenteService.update(action.payload);
        yield put(fontEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(fontEditSlice.actions.updateError(e));
    }
}

export function* watchFontEditAsync() {
    yield all([
        takeEvery(fontEditSlice.actions.find, findFontEditSaga),
        takeEvery(fontEditSlice.actions.update, updateFontEditSaga),
    ]);
}
