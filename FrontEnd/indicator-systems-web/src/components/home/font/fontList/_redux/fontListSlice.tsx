import {createSlice} from "@reduxjs/toolkit";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface FontListStateModel extends StateModel {

    fuentes: Array<FuenteModel>;

}

export const fontListSlice = createSlice({
    name: "fontList",
    initialState: {
        fuentes: [] as Array<FuenteModel>,
        result: {},
    } as FontListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            fuentes: [],
            result: {
                action: action,
            },
        } as FontListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as FontListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            fuentes: action.payload,
            result: {
                action: action,
            },
        } as FontListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar las fuentes",
                messageInternal: action.payload.message,
            },
        } as FontListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as FontListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            fuentes: state.fuentes.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "La fuente se eliminó exitosamente",
            },
        } as FontListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar la fuente",
                messageInternal: action.payload.message,
            },
        } as FontListStateModel),
    },
});
