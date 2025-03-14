import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";


export interface FrecuenciaNewStateModel extends StateModel {

    frecuencia?: FrecuenciaModel;

}

export const frecuenciaNewSlice = createSlice({
    name: "frecuenciaNew",
    initialState: {
        result: {},
    } as FrecuenciaNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as FrecuenciaNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FrecuenciaNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            frecuencia: action.payload,
            result: {
                action: action,
                messageUser: "La frecuencia se guardó exitosamente",
            },
        } as FrecuenciaNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la frecuencia",
                messageInternal: action.payload.message,
            },
        } as FrecuenciaNewStateModel),
    },
});
