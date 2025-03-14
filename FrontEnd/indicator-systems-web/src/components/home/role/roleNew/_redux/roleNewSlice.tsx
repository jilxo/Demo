import {createSlice} from "@reduxjs/toolkit";
import {RolModel} from "../../../../../core/models/RolModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface RolNewStateModel extends StateModel {

    rol?: RolModel;

}

export const roleNewSlice = createSlice({
    name: "rolNew",
    initialState: {
        result: {},
    } as RolNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as RolNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as RolNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            rol: action.payload,
            result: {
                action: action,
                messageUser: "El rol se guardó exitosamente",
            },
        } as RolNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el rol",
                messageInternal: action.payload.message,
            },
        } as RolNewStateModel),
    },
});
