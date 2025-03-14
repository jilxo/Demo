import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {UsuarioService} from "../../../core/services/UsuarioService.ts";
import {UsuarioModel} from "../../../core/models/UsuarioModel.tsx";
import {signInSlice} from "./signInSlice.tsx";


const userService = new UsuarioService();

/**
 * auth a user saga
 *
 * @param action action
 */
export function* authUserNewSaga(action: any) {
    try {
        const response: AxiosResponse<UsuarioModel, any > = yield userService.auth(action.payload);
        yield put(signInSlice.actions.authSuccess(response.data));
    } catch (e) {
        yield put(signInSlice.actions.authError(e));
    }
}

/**
 * watch user new async
 */
export function* watchSignInAsync() {
    yield all([
        takeEvery(signInSlice.actions.auth, authUserNewSaga),
    ]);
}
