import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {indicadorListSlice} from "./indicadorListSlice.tsx";
import {IndicadorModel} from "../../../../../core/models/IndicadorModel.tsx";
import {IndicadorService} from "../../../../../core/services/IndicadorService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const indicadorService = new IndicadorService();

export function* findIndicadorListSaga() {
    try {
        const {data}: AxiosResponse<Array<IndicadorModel>> = yield indicadorService.find();
        yield put(indicadorListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(indicadorListSlice.actions.findError(e));
    }
}

export function* deleteIndicadorListSaga(action: PayloadAction<number>) {
    try {
        yield indicadorService.delete(action.payload);
        yield put(indicadorListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(indicadorListSlice.actions.deleteError(e));
    }
}

export function* watchIndicadorListAsync() {
    yield all([
        takeEvery(indicadorListSlice.actions.find, findIndicadorListSaga),
        takeEvery(indicadorListSlice.actions.delete, deleteIndicadorListSaga),
    ]);
}
