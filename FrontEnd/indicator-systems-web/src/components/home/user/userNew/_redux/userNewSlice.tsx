import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {UsuarioModel} from "../../../../../core/models/UsuarioModel.tsx";
import {RolModel} from "../../../../../core/models/RolModel.tsx";


export interface UserNewStateModel extends StateModel {

    usuario?: UsuarioModel;

    rolIds: Array<number>;

    roles: Array<RolModel>;

}

export const userNewSlice = createSlice({
    name: "userNew",
    initialState: {
        rolIds: [] as Array<number>,
        roles: [] as Array<RolModel>,
        result: {},
    } as UserNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            rolIds: [],
            roles: [],
            result: {
                action: action,
            },
        } as UserNewStateModel),
        findRoles: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserNewStateModel),
        findRolesSuccess: (state, action) => ({
            ...state,
            roles: action.payload,
            result: {
                action: action,
            },
        } as UserNewStateModel),
        findRolesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los roles",
                messageInternal: action.payload.message,
            },
        } as UserNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            usuario: action.payload,
            result: {
                action: action,
                messageUser: "El usuario se guardó exitosamente",
            },
        } as UserNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el usuario",
                messageInternal: action.payload.message,
            },
        } as UserNewStateModel),
        saveRol: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserNewStateModel),
        saveRolSuccess: (state, action) => ({
            ...state,
            rolIds: [...state.rolIds, action.payload],
            result: {
                action: action,
            },
        } as UserNewStateModel),
        saveRolError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el rol",
                messageInternal: action.payload.message,
            },
        } as UserNewStateModel),
    },
});
