import {createSlice} from "@reduxjs/toolkit";
import {IndicadorModel} from "../../../../../core/models/IndicadorModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface IndicadorListStateModel extends StateModel {

    indicadores: Array<IndicadorModel>;

}

export const indicadorListSlice = createSlice({
    name: "indicadorList",
    initialState: {
        indicadores: [] as Array<IndicadorModel>,
        result: {},
    } as IndicadorListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            indicadores: [],
            result: {
                action: action,
            },
        } as IndicadorListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            indicadores: action.payload,
            result: {
                action: action,
            },
        } as IndicadorListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los indicadores",
                messageInternal: action.payload.message,
            },
        } as IndicadorListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            indicadores: state.indicadores.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "El indicador se eliminó exitosamente",
            },
        } as IndicadorListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorListStateModel),
    },
});
