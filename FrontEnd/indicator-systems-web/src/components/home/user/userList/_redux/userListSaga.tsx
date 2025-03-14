import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {userListSlice} from "./userListSlice.tsx";
import {UsuarioModel} from "../../../../../core/models/UsuarioModel.tsx";
import {UsuarioService} from "../../../../../core/services/UsuarioService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const userService = new UsuarioService();

export function* findUserListSaga() {
    try {
        const {data}: AxiosResponse<Array<UsuarioModel>> = yield userService.find();
        yield put(userListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(userListSlice.actions.findError(e));
    }
}

export function* deleteUserListSaga(action: PayloadAction<string>) {
    try {
        yield userService.delete(action.payload);
        yield put(userListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(userListSlice.actions.deleteError(e));
    }
}

export function* watchUserListAsync() {
    yield all([
        takeEvery(userListSlice.actions.find, findUserListSaga),
        takeEvery(userListSlice.actions.delete, deleteUserListSaga),
    ]);
}
