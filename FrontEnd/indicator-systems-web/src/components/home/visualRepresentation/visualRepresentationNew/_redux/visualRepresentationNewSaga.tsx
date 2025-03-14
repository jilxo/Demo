import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {RepresenVisualService} from "../../../../../core/services/RepresenVisualService.ts";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {visualRepresentationNewSlice} from "./visualRepresentationNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const represenVisualService = new RepresenVisualService();

export function* saveVisualRepresentationNewSaga(action: PayloadAction<RepresenVisualModel>) {
    try {
        const {data}: AxiosResponse<RepresenVisualModel> = yield represenVisualService.save(action.payload);
        yield put(visualRepresentationNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(visualRepresentationNewSlice.actions.saveError(e));
    }
}

export function* watchVisualRepresentationNewAsync() {
    yield all([
        takeEvery(visualRepresentationNewSlice.actions.save, saveVisualRepresentationNewSaga),
    ]);
}
