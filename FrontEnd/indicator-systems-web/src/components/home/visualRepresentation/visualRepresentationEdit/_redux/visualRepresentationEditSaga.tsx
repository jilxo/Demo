import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {RepresenVisualService} from "../../../../../core/services/RepresenVisualService.ts";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {visualRepresentationEditSlice} from "./visualRepresentationEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const visualRepresentationService = new RepresenVisualService();

export function* findVisualRepresentationEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<RepresenVisualModel> = yield visualRepresentationService.findOne(action.payload);
        yield put(visualRepresentationEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(visualRepresentationEditSlice.actions.findError(e));
    }
}

export function* updateVisualRepresentationEditSaga(action: PayloadAction<RepresenVisualModel>) {
    try {
        const {data}: AxiosResponse<RepresenVisualModel> = yield visualRepresentationService.update(action.payload);
        yield put(visualRepresentationEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(visualRepresentationEditSlice.actions.updateError(e));
    }
}

export function* watchVisualRepresentationEditAsync() {
    yield all([
        takeEvery(visualRepresentationEditSlice.actions.find, findVisualRepresentationEditSaga),
        takeEvery(visualRepresentationEditSlice.actions.update, updateVisualRepresentationEditSaga),
    ]);
}
