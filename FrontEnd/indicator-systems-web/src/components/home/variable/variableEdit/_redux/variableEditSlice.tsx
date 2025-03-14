import {createSlice} from "@reduxjs/toolkit";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface VariableEditStateModel extends StateModel {

    variable?: VariableModel;

}

export const variableEditSlice = createSlice({
    name: "variableEdit",
    initialState: {
        result: {},
    } as VariableEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as VariableEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VariableEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            variable: action.payload,
            result: {
                action: action,
            },
        } as VariableEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar la variable",
                messageInternal: action.payload.message,
            },
        } as VariableEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VariableEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            variable: action.payload,
            result: {
                action: action,
                messageUser: "La variable se actualizo exitosamente",
            },
        } as VariableEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar la variable",
                messageInternal: action.payload.message,
            },
        } as VariableEditStateModel),
    },
});
