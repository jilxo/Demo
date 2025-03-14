import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {VariableService} from "../../../../../core/services/VariableService.ts";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {variableNewSlice} from "./variableNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";


const variableService = new VariableService();

export function* saveVariableNewSaga(action: PayloadAction<VariableModel>) {
    try {
        const {data}: AxiosResponse<VariableModel> = yield variableService.save(action.payload);
        yield put(variableNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(variableNewSlice.actions.saveError(e));
    }
}

export function* watchVariableNewAsync() {
    yield all([
        takeEvery(variableNewSlice.actions.save, saveVariableNewSaga),
    ]);
}
