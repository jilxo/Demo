import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {ActorService} from "../../../../../core/services/ActorService.ts";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {actorNewSlice} from "./actorNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";
import {TipoActorService} from "../../../../../core/services/TipoActorService.ts";


const tipoActorService = new TipoActorService();

const actorService = new ActorService();

export function* findTypesActorNewSaga() {
    try {
        const {data}: AxiosResponse<ActorModel> = yield tipoActorService.find();
        yield put(actorNewSlice.actions.findTypesSuccess(data));
    } catch (e) {
        yield put(actorNewSlice.actions.findTypesError(e));
    }
}

export function* saveActorNewSaga(action: PayloadAction<ActorModel>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield actorService.save(action.payload);
        yield put(actorNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(actorNewSlice.actions.saveError(e));
    }
}

export function* watchActorNewAsync() {
    yield all([
        takeEvery(actorNewSlice.actions.findTypes, findTypesActorNewSaga),
        takeEvery(actorNewSlice.actions.save, saveActorNewSaga),
    ]);
}
