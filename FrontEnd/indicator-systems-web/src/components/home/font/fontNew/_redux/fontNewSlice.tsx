import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";


export interface FontNewStateModel extends StateModel {

    fuente?: FuenteModel;

}

export const fontNewSlice = createSlice({
    name: "fuenteNew",
    initialState: {
        result: {},
    } as FontNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as FontNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FontNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            fuente: action.payload,
            result: {
                action: action,
                messageUser: "La fuente se guardó exitosamente",
            },
        } as FontNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la fuente",
                messageInternal: action.payload.message,
            },
        } as FontNewStateModel),
    },
});
