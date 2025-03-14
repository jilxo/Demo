import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";


export interface MeasuringUnitListStateModel extends StateModel {

    measuringUnits: Array<UnidadMedicionModel>;

}

export const measuringUnitListSlice = createSlice({
    name: "measuringUnitList",
    initialState: {
        measuringUnits: [] as Array<UnidadMedicionModel>,
        result: {},
    } as MeasuringUnitListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            measuringUnits: [],
            result: {
                action: action,
            },
        } as MeasuringUnitListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as MeasuringUnitListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            measuringUnits: action.payload,
            result: {
                action: action,
            },
        } as MeasuringUnitListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar las unidades de medidas",
                messageInternal: action.payload.message,
            },
        } as MeasuringUnitListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as MeasuringUnitListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            measuringUnits: state.measuringUnits.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "La unidad de medida se eliminó exitosamente",
            },
        } as MeasuringUnitListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar la unidad de medida",
                messageInternal: action.payload.message,
            },
        } as MeasuringUnitListStateModel),
    },
});
