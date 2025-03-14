import {createSlice} from "@reduxjs/toolkit";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface MeasuringUnitNewStateModel extends StateModel {

    measuringUnit?: UnidadMedicionModel;

}

export const measuringUnitNewSlice = createSlice({
    name: "measuringUnitNew",
    initialState: {
        result: {},
    } as MeasuringUnitNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as MeasuringUnitNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as MeasuringUnitNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            measuringUnit: action.payload,
            result: {
                action: action,
                messageUser: "La unidad de medida se guardó exitosamente",
            },
        } as MeasuringUnitNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la unidad de medida",
                messageInternal: action.payload.message,
            },
        } as MeasuringUnitNewStateModel),
    },
});
