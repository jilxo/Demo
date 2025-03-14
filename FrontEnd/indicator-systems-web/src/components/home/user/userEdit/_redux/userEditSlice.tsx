import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {UsuarioModel} from "../../../../../core/models/UsuarioModel.tsx";
import {RolModel} from "../../../../../core/models/RolModel.tsx";


export interface UserEditStateModel extends StateModel {

    usuario?: UsuarioModel;

    usuarioRoles: Array<RolModel>;

    roles: Array<RolModel>;

}

/**
 * user edit slice
 */
export const userEditSlice = createSlice({
    name: "userEdit",
    initialState: {
        usuarioRoles: [] as Array<RolModel>,
        roles: [] as Array<RolModel>,
        result: {},
    } as UserEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            usuarioRoles: [],
            roles: [],
            result: {
                action: action,
            },
        } as UserEditStateModel),
        cleanUserRoles: (state, action: PayloadAction) => ({
            ...state,
            usuarioRoles: [],
            result: {
                action: action,
            },
        } as UserEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            usuario: action.payload,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar el usuario",
                messageInternal: action.payload.message,
            },
        } as UserEditStateModel),
        findRoles: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        findRolesSuccess: (state, action) => ({
            ...state,
            roles: action.payload,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        findRolesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los roles",
                messageInternal: action.payload.message,
            },
        } as UserEditStateModel),
        findUserRoles: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        findUserRolesSuccess: (state, action) => ({
            ...state,
            usuarioRoles: action.payload,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        findUserRolesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los roles pertenecientes al usuario",
                messageInternal: action.payload.message,
            },
        } as UserEditStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            usuario: undefined,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el usuario",
                messageInternal: action.payload.message,
            },
        } as UserEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            usuario: action.payload,
            result: {
                action: action,
                messageUser: "El usuario se actualizo exitosamente",
            },
        } as UserEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el usuario",
                messageInternal: action.payload.message,
            },
        } as UserEditStateModel),
        saveRol: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserEditStateModel),
        saveRolSuccess: (state, action) => ({
            ...state,
            usuarioRoles: [...state.usuarioRoles, action.payload],
            result: {
                action: action,
            },
        } as UserEditStateModel),
        saveRolError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el rol del usuario",
                messageInternal: action.payload.message,
            },
        } as UserEditStateModel),
    },
});
