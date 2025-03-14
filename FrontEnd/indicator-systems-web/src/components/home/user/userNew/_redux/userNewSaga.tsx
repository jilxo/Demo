import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {UsuarioService} from "../../../../../core/services/UsuarioService.ts";
import {RolService} from "../../../../../core/services/RolService.ts";
import {UsuarioModel} from "../../../../../core/models/UsuarioModel.tsx";
import {userNewSlice} from "./userNewSlice.tsx";
import {UsuarioRolService} from "../../../../../core/services/UsuarioRolService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";
import {UsuarioRolModel} from "../../../../../core/models/UsuarioRolModel.tsx";


const usuarioService = new UsuarioService();

const rolService = new RolService();

const usuarioRolService = new UsuarioRolService();

export function* findRolesUserNewSaga() {
    try {
        const {data}: AxiosResponse<UsuarioModel> = yield rolService.find();
        yield put(userNewSlice.actions.findRolesSuccess(data));
    } catch (e) {
        yield put(userNewSlice.actions.findRolesError(e));
    }
}

export function* saveUserNewSaga(action: PayloadAction<UsuarioModel>) {
    try {
        const {data}: AxiosResponse<UsuarioModel> = yield usuarioService.save(action.payload);
        yield put(userNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(userNewSlice.actions.saveError(e));
    }
}

export function* saveRolUserNewSaga(action: PayloadAction<UsuarioRolModel>) {
    try {
        yield usuarioRolService.save(action.payload?.email, action.payload?.rolId);
        yield put(userNewSlice.actions.saveRolSuccess(action.payload?.rolId));
    } catch (e) {
        yield put(userNewSlice.actions.saveRolError(e));
    }
}

export function* watchUserNewAsync() {
    yield all([
        takeEvery(userNewSlice.actions.findRoles, findRolesUserNewSaga),
        takeEvery(userNewSlice.actions.save, saveUserNewSaga),
        takeEvery(userNewSlice.actions.saveRol, saveRolUserNewSaga),
    ]);
}
