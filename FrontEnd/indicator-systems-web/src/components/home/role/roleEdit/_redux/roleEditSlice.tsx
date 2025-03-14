import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {RolModel} from "../../../../../core/models/RolModel.tsx";
import {createSlice} from "@reduxjs/toolkit";


export interface RoleEditStateModel extends StateModel {

    rol?: RolModel;

}

export const roleEditSlice = createSlice({
    name: "rolEdit",
    initialState: {
        result: {},
    } as RoleEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as RoleEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as RoleEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            rol: action.payload,
            result: {
                action: action,
            },
        } as RoleEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar el rol",
                messageInternal: action.payload.message,
            },
        } as RoleEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as RoleEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            rol: action.payload,
            result: {
                action: action,
                messageUser: "El rol se actualizo exitosamente",
            },
        } as RoleEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el rol",
                messageInternal: action.payload.message,
            },
        } as RoleEditStateModel),
    },
});
