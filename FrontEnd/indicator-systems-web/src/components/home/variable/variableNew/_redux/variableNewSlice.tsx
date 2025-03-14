import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";


export interface VariableNewStateModel extends StateModel {

    variable?: VariableModel;

}

export const variableNewSlice = createSlice({
    name: "variableNew",
    initialState: {
        result: {},
    } as VariableNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as VariableNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VariableNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            variable: action.payload,
            result: {
                action: action,
                messageUser: "La variable se guardó exitosamente",
            },
        } as VariableNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la variable",
                messageInternal: action.payload.message,
            },
        } as VariableNewStateModel),
    },
});
