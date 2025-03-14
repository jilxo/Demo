import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {RolModel} from "../../../../../core/models/RolModel.tsx";
import {createSlice} from "@reduxjs/toolkit";


export interface RoleListStateModel extends StateModel {

    roles: Array<RolModel>;

}

export const roleListSlice = createSlice({
    name: "rolList",
    initialState: {
        roles: [] as Array<RolModel>,
        result: {},
    } as RoleListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            roles: [],
            result: {
                action: action,
            },
        } as RoleListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as RoleListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            roles: action.payload,
            result: {
                action: action,
            },
        } as RoleListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los roles",
                messageInternal: action.payload.message,
            },
        } as RoleListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as RoleListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            roles: state.roles.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "El rol se eliminó exitosamente",
            },
        } as RoleListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el rol",
                messageInternal: action.payload.message,
            },
        } as RoleListStateModel),
    },
});
