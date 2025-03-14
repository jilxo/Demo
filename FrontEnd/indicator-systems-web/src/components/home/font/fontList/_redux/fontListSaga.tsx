import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {fontListSlice} from "./fontListSlice.tsx";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {FuenteService} from "../../../../../core/services/FuenteService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const fuenteService = new FuenteService();

export function* findFontListSaga() {
    try {
        const {data}: AxiosResponse<Array<FuenteModel>> = yield fuenteService.find();
        yield put(fontListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(fontListSlice.actions.findError(e));
    }
}

export function* deleteFontListSaga(action: PayloadAction<number>) {
    try {
        yield fuenteService.delete(action.payload);
        yield put(fontListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(fontListSlice.actions.deleteError(e));
    }
}

export function* watchFontListAsync() {
    yield all([
        takeEvery(fontListSlice.actions.find, findFontListSaga),
        takeEvery(fontListSlice.actions.delete, deleteFontListSaga),
    ]);
}
