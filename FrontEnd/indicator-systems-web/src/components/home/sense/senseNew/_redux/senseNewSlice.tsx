import {createSlice} from "@reduxjs/toolkit";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface SenseNewStateModel extends StateModel {

    sense?: SentidoModel;

}

export const senseNewSlice = createSlice({
    name: "senseNew",
    initialState: {
        result: {},
    } as SenseNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as SenseNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as SenseNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            sense: action.payload,
            result: {
                action: action,
                messageUser: "El sentido se guardó exitosamente",
            },
        } as SenseNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el sentido",
                messageInternal: action.payload.message,
            },
        } as SenseNewStateModel),
    },
});
