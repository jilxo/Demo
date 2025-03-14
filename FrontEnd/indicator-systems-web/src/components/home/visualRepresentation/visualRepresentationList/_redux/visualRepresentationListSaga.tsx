import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {visualRepresentationListSlice} from "./visualRepresentationListSlice.tsx";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {RepresenVisualService} from "../../../../../core/services/RepresenVisualService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const visualRepresentationService = new RepresenVisualService();

export function* findVisualRepresentationListSaga() {
    try {
        const {data}: AxiosResponse<Array<RepresenVisualModel>> = yield visualRepresentationService.find();
        yield put(visualRepresentationListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(visualRepresentationListSlice.actions.findError(e));
    }
}

export function* deleteVisualRepresentationListSaga(action: PayloadAction<number>) {
    try {
        yield visualRepresentationService.delete(action.payload);
        yield put(visualRepresentationListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(visualRepresentationListSlice.actions.deleteError(e));
    }
}

export function* watchVisualRepresentationListAsync() {
    yield all([
        takeEvery(visualRepresentationListSlice.actions.find, findVisualRepresentationListSaga),
        takeEvery(visualRepresentationListSlice.actions.delete, deleteVisualRepresentationListSaga),
    ]);
}
