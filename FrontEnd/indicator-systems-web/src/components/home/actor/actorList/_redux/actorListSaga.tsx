import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {actorListSlice} from "./actorListSlice.tsx";
import {ActorService} from "../../../../../core/services/ActorService.ts";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const actorService = new ActorService();

export function* findActorListSaga() {
    try {
        const {data}: AxiosResponse<Array<ActorModel>> = yield actorService.find();
        yield put(actorListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(actorListSlice.actions.findError(e));
    }
}

export function* deleteActorListSaga(action: PayloadAction<string>) {
    try {
        yield actorService.delete(action.payload);
        yield put(actorListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(actorListSlice.actions.deleteError(e));
    }
}

export function* watchActorListAsync() {
    yield all([
        takeEvery(actorListSlice.actions.find, findActorListSaga),
        takeEvery(actorListSlice.actions.delete, deleteActorListSaga),
    ]);
}
