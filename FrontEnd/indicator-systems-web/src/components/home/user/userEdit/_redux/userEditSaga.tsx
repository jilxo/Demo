import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {UsuarioService} from "../../../../../core/services/UsuarioService.ts";
import {RolService} from "../../../../../core/services/RolService.ts";
import {UsuarioModel} from "../../../../../core/models/UsuarioModel.tsx";
import {userEditSlice} from "./userEditSlice.tsx";
import {UsuarioRolService} from "../../../../../core/services/UsuarioRolService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";
import {UsuarioRolModel} from "../../../../../core/models/UsuarioRolModel.tsx";


const usuarioService = new UsuarioService();

const rolService = new RolService();

const usuarioRolService = new UsuarioRolService();

export function* findUserEditSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<UsuarioModel> = yield usuarioService.findOne(action.payload);
        yield put(userEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(userEditSlice.actions.findError(e));
    }
}

export function* findRolesUserEditSaga() {
    try {
        const {data}: AxiosResponse<UsuarioModel> = yield rolService.find();
        yield put(userEditSlice.actions.findRolesSuccess(data));
    } catch (e) {
        yield put(userEditSlice.actions.findRolesError(e));
    }
}

export function* findUserRolesUserEditSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<UsuarioModel> = yield usuarioRolService.find(action.payload);
        yield put(userEditSlice.actions.findUserRolesSuccess(data));
    } catch (e) {
        yield put(userEditSlice.actions.findUserRolesError(e));
    }
}

export function* deleteUserEditSaga(action: PayloadAction<string>) {
    try {
        yield usuarioService.delete(action.payload);
        yield put(userEditSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(userEditSlice.actions.deleteError(e));
    }
}

export function* updateUserEditSaga(action: PayloadAction<UsuarioModel>) {
    try {
        const {data}: AxiosResponse<UsuarioModel> = yield usuarioService.save(action.payload);
        yield put(userEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(userEditSlice.actions.updateError(e));
    }
}

export function* saveRolUserEditSaga(action: PayloadAction<UsuarioRolModel>) {
    try {
        yield usuarioRolService.save(action.payload?.email, action.payload?.rolId);
        yield put(userEditSlice.actions.saveRolSuccess(action.payload?.rolId));
    } catch (e) {
        yield put(userEditSlice.actions.saveRolError(e));
    }
}

export function* watchUserEditAsync() {
    yield all([
        takeEvery(userEditSlice.actions.find, findUserEditSaga),
        takeEvery(userEditSlice.actions.findRoles, findRolesUserEditSaga),
        takeEvery(userEditSlice.actions.findUserRoles, findUserRolesUserEditSaga),
        takeEvery(userEditSlice.actions.delete, deleteUserEditSaga),
        takeEvery(userEditSlice.actions.update, updateUserEditSaga),
        takeEvery(userEditSlice.actions.saveRol, saveRolUserEditSaga),
    ]);
}
