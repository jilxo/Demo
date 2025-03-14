import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";


export interface IndicatorTypeListStateModel extends StateModel {

    tipoIndicadores: Array<TipoIndicadorModel>;

}


export const indicatorTypeListSlice = createSlice({
    name: "tipoIndicadorList",
    initialState: {
        tipoIndicadores: [] as Array<TipoIndicadorModel>,
        result: {},
    } as IndicatorTypeListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            tipoIndicadores: [],
            result: {
                action: action,
            },
        } as IndicatorTypeListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicatorTypeListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            tipoIndicadores: action.payload,
            result: {
                action: action,
            },
        } as IndicatorTypeListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los tipos de indicadores",
                messageInternal: action.payload.message,
            },
        } as IndicatorTypeListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicatorTypeListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            tipoIndicadores: state.tipoIndicadores.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "El tipo de indicador se eliminó exitosamente",
            },
        } as IndicatorTypeListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el tipo de indicador",
                messageInternal: action.payload.message,
            },
        } as IndicatorTypeListStateModel),
    },
});
