import {createSlice} from "@reduxjs/toolkit";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface VariableListStateModel extends StateModel {

    variables: Array<VariableModel>;

}

export const variableListSlice = createSlice({
    name: "variableList",
    initialState: {
        variables: [] as Array<VariableModel>,
        result: {},
    } as VariableListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            variables: [],
            result: {
                action: action,
            },
        } as VariableListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as VariableListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            variables: action.payload,
            result: {
                action: action,
            },
        } as VariableListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar las variables",
                messageInternal: action.payload.message,
            },
        } as VariableListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VariableListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            variables: state.variables.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "La variable se eliminó exitosamente",
            },
        } as VariableListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar la variable",
                messageInternal: action.payload.message,
            },
        } as VariableListStateModel),
    },
});
