import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {variableListSlice} from "./variableListSlice.tsx";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {VariableService} from "../../../../../core/services/VariableService.ts";
import {PayloadAction} from "../../../../../redux/store.tsx";


const variableService = new VariableService();

export function* findVariableListSaga() {
    try {
        const {data}: AxiosResponse<Array<VariableModel>> = yield variableService.find();
        yield put(variableListSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(variableListSlice.actions.findError(e));
    }
}

export function* deleteVariableListSaga(action: PayloadAction<number>) {
    try {
        yield variableService.delete(action.payload);
        yield put(variableListSlice.actions.deleteSuccess(action.payload));
    } catch (e) {
        yield put(variableListSlice.actions.deleteError(e));
    }
}

export function* watchVariableListAsync() {
    yield all([
        takeEvery(variableListSlice.actions.find, findVariableListSaga),
        takeEvery(variableListSlice.actions.delete, deleteVariableListSaga),
    ]);
}
