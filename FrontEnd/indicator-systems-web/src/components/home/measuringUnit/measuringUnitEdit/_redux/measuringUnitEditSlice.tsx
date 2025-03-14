import {createSlice} from "@reduxjs/toolkit";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface MeasuringUnitEditStateModel extends StateModel {

    measuringUnit?: UnidadMedicionModel;

}

export const measuringUnitEditSlice = createSlice({
    name: "measuringUnitEdit",
    initialState: {
        result: {},
    } as MeasuringUnitEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as MeasuringUnitEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as MeasuringUnitEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            measuringUnit: action.payload,
            result: {
                action: action,
            },
        } as MeasuringUnitEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar la unidad de medida",
                messageInternal: action.payload.message,
            },
        } as MeasuringUnitEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as MeasuringUnitEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            measuringUnit: action.payload,
            result: {
                action: action,
                messageUser: "La unidad de medida se actualizo exitosamente",
            },
        } as MeasuringUnitEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar la unidad de medida",
                messageInternal: action.payload.message,
            },
        } as MeasuringUnitEditStateModel),
    },
});
