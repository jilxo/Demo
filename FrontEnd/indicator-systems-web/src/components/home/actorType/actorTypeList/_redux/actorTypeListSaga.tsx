import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {actorTypeListSlice} from "./actorTypeListSlice.tsx";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {TipoActorService} from "../../../../../core/services/TipoActorService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const tipoActorService = new TipoActorService();

export function* findActorTypeListSaga() {
    try {
        const {data}: AxiosResponse<Array<TipoActorModel>> = yield tipoActorService.find();
        yield put(actorTypeListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(actorTypeListSlice.actions.findError(e));
    }
}

export function* deleteActorTypeListSaga(action: PayloadAction<number>) {
    try {
        yield tipoActorService.delete(action.payload);
        yield put(actorTypeListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(actorTypeListSlice.actions.deleteError(e));
    }
}

export function* watchActorTypeListAsync() {
    yield all([
        takeEvery(actorTypeListSlice.actions.find, findActorTypeListSaga),
        takeEvery(actorTypeListSlice.actions.delete, deleteActorTypeListSaga),
    ]);
}
