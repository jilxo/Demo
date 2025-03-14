import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {TipoActorService} from "../../../../../core/services/TipoActorService.ts";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {actorTypeEditSlice} from "./actorTypeEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const tipoActorService = new TipoActorService();

export function* findActorTypeEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<TipoActorModel> = yield tipoActorService.findOne(action.payload);
        yield put(actorTypeEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(actorTypeEditSlice.actions.findError(e));
    }
}

export function* updateActorTypeEditSaga(action: PayloadAction<TipoActorModel>) {
    try {
        const {data}: AxiosResponse<TipoActorModel> = yield tipoActorService.update(action.payload);
        yield put(actorTypeEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(actorTypeEditSlice.actions.updateError(e));
    }
}

export function* watchActorTypeEditAsync() {
    yield all([
        takeEvery(actorTypeEditSlice.actions.find, findActorTypeEditSaga),
        takeEvery(actorTypeEditSlice.actions.update, updateActorTypeEditSaga),
    ]);
}
