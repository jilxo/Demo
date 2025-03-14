import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {UsuarioModel} from "../../../core/models/UsuarioModel.tsx";
import {homeSlice} from "./homeSlice.tsx";
import {UsuarioRolService} from "../../../core/services/UsuarioRolService.ts";


const usuarioRolService = new UsuarioRolService();

/**
 * auth a user saga
 *
 * @param action action
 */
export function* findRolesHomeSaga(action: any) {
    try {
        const response: AxiosResponse<UsuarioModel, any > = yield usuarioRolService.find(action.payload);
        yield put(homeSlice.actions.findRolesSuccess(response.data));
    } catch (e) {
        yield put(homeSlice.actions.findRolesError(e));
    }
}

/**
 * watch user new async
 */
export function* watchHomeAsync() {
    yield all([
        takeEvery(homeSlice.actions.findRoles, findRolesHomeSaga),
    ]);
}
