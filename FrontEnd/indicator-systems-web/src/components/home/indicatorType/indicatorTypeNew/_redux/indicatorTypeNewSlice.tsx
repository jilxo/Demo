import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";


export interface TipoIndicadorNewStateModel extends StateModel {

    tipoIndicador?: TipoIndicadorModel;

}

export const indicatorTypeNewSlice = createSlice({
    name: "tipoIndicadorNew",
    initialState: {
        result: {},
    } as TipoIndicadorNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as TipoIndicadorNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as TipoIndicadorNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            tipoIndicador: action.payload,
            result: {
                action: action,
                messageUser: "El tipo de indicador se guardó exitosamente",
            },
        } as TipoIndicadorNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el tipo de indicador",
                messageInternal: action.payload.message,
            },
        } as TipoIndicadorNewStateModel),
    },
});
