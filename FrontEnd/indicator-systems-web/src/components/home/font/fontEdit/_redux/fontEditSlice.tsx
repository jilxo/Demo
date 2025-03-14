import {createSlice} from "@reduxjs/toolkit";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface FontEditStateModel extends StateModel {

    fuente?: FuenteModel;

}

export const fontEditSlice = createSlice({
    name: "fuenteEdit",
    initialState: {
        result: {},
    } as FontEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as FontEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FontEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            fuente: action.payload,
            result: {
                action: action,
            },
        } as FontEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar la fuente",
                messageInternal: action.payload.message,
            },
        } as FontEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FontEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            fuente: action.payload,
            result: {
                action: action,
                messageUser: "La fuente se actualizo exitosamente",
            },
        } as FontEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar la fuente",
                messageInternal: action.payload.message,
            },
        } as FontEditStateModel),
    },
});
