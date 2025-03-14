import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {TipoActorService} from "../../../../../core/services/TipoActorService.ts";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {actorTypeNewSlice} from "./actorTypeNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const tipoActorService = new TipoActorService();

export function* saveActorTypeNewSaga(action: PayloadAction<TipoActorModel>) {
    try {
        const {data}: AxiosResponse<TipoActorModel> = yield tipoActorService.save(action.payload);
        yield put(actorTypeNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(actorTypeNewSlice.actions.saveError(e));
    }
}

export function* watchActorTypeNewAsync() {
    yield all([
        takeEvery(actorTypeNewSlice.actions.save, saveActorTypeNewSaga),
    ]);
}
