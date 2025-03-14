import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";


export interface IndicatorTypeEditStateModel extends StateModel {

    tipoIndicador?: TipoIndicadorModel;

}

export const indicatorTypeEditSlice = createSlice({
    name: "tipoIndicadorEdit",
    initialState: {
        result: {},
    } as IndicatorTypeEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as IndicatorTypeEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicatorTypeEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            tipoIndicador: action.payload,
            result: {
                action: action,
            },
        } as IndicatorTypeEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar el tipo de indicador",
                messageInternal: action.payload.message,
            },
        } as IndicatorTypeEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicatorTypeEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            tipoIndicador: action.payload,
            result: {
                action: action,
                messageUser: "El tipo de indicador se actualizo exitosamente",
            },
        } as IndicatorTypeEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el tipo de indicador",
                messageInternal: action.payload.message,
            },
        } as IndicatorTypeEditStateModel),
    },
});
