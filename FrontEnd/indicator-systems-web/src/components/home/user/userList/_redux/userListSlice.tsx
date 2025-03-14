import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {UsuarioModel} from "../../../../../core/models/UsuarioModel.tsx";


export interface UserListStateModel extends StateModel {

    usuarios: Array<UsuarioModel>;

}


export const userListSlice = createSlice({
    name: "userList",
    initialState: {
        usuarios: [] as Array<UsuarioModel>,
        result: {},
    } as UserListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            usuarios: [] as Array<UsuarioModel>,
            result: {
                action: action,
            },
        } as UserListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            usuarios: action.payload,
            result: {
                action: action,
            },
        } as UserListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los users",
                messageInternal: action.payload.message,
            },
        } as UserListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as UserListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            usuarios: state.usuarios.filter(({email}) => email !== action.payload),
            result: {
                action: action,
                messageUser: "El usuario se eliminó exitosamente",
            },
        } as UserListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el usuario",
                messageInternal: action.payload.message,
            },
        } as UserListStateModel),
    },
});
