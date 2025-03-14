import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";


export interface SenseEditStateModel extends StateModel {

    sense?: SentidoModel;

}

export const senseEditSlice = createSlice({
    name: "senseEdit",
    initialState: {
        result: {},
    } as SenseEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as SenseEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as SenseEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            sense: action.payload,
            result: {
                action: action,
            },
        } as SenseEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar el sentido",
                messageInternal: action.payload.message,
            },
        } as SenseEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as SenseEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            sense: action.payload,
            result: {
                action: action,
                messageUser: "El sentido se actualizo exitosamente",
            },
        } as SenseEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el sentido",
                messageInternal: action.payload.message,
            },
        } as SenseEditStateModel),
    },
});
