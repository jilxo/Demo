import {createSlice} from "@reduxjs/toolkit";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface FrecuenciaListStateModel extends StateModel {

    frecuencias: Array<FrecuenciaModel>;

}

export const frecuenciaListSlice = createSlice({
    name: "frecuenciaList",
    initialState: {
        frecuencias: [] as Array<FrecuenciaModel>,
        result: {},
    } as FrecuenciaListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            frecuencias: [],
            result: {
                action: action,
            },
        } as FrecuenciaListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as FrecuenciaListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            frecuencias: action.payload,
            result: {
                action: action,
            },
        } as FrecuenciaListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar las frecuencias",
                messageInternal: action.payload.message,
            },
        } as FrecuenciaListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FrecuenciaListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            frecuencias: state.frecuencias.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "La frecuencia se eliminó exitosamente",
            },
        } as FrecuenciaListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar la frecuencia",
                messageInternal: action.payload.message,
            },
        } as FrecuenciaListStateModel),
    },
});
