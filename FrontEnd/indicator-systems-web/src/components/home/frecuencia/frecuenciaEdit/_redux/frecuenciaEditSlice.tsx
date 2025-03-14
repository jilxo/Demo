import {createSlice} from "@reduxjs/toolkit";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface FrecuenciaEditStateModel extends StateModel {

    frecuencia?: FrecuenciaModel;

}

export const frecuenciaEditSlice = createSlice({
    name: "frecuenciaEdit",
    initialState: {
        result: {},
    } as FrecuenciaEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as FrecuenciaEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FrecuenciaEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            frecuencia: action.payload,
            result: {
                action: action,
            },
        } as FrecuenciaEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar la frecuencia",
                messageInternal: action.payload.message,
            },
        } as FrecuenciaEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FrecuenciaEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            frecuencia: action.payload,
            result: {
                action: action,
                messageUser: "La frecuencia se actualizo exitosamente",
            },
        } as FrecuenciaEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar la frecuencia",
                messageInternal: action.payload.message,
            },
        } as FrecuenciaEditStateModel),
    },
});
