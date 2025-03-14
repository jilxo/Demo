import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {ActorService} from "../../../../../core/services/ActorService.ts";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {actorEditSlice} from "./actorEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";
import {TipoActorService} from "../../../../../core/services/TipoActorService.ts";


const tipoActorService = new TipoActorService();

const actorService = new ActorService();

export function* findActorEditSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield actorService.findOne(action.payload);
        yield put(actorEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(actorEditSlice.actions.findError(e));
    }
}

export function* findTypesActorEditSaga() {
    try {
        const {data}: AxiosResponse<ActorModel> = yield tipoActorService.find();
        yield put(actorEditSlice.actions.findTypesSuccess(data));
    } catch (e) {
        yield put(actorEditSlice.actions.findTypesError(e));
    }
}

export function* updateActorEditSaga(action: PayloadAction<ActorModel>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield actorService.update(action.payload);
        yield put(actorEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(actorEditSlice.actions.updateError(e));
    }
}

export function* watchActorEditAsync() {
    yield all([
        takeEvery(actorEditSlice.actions.find, findActorEditSaga),
        takeEvery(actorEditSlice.actions.findTypes, findTypesActorEditSaga),
        takeEvery(actorEditSlice.actions.update, updateActorEditSaga),
    ]);
}
