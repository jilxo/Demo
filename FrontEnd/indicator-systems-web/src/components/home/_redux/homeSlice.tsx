import {createSlice} from "@reduxjs/toolkit";
import {StateModel} from "../../../redux/store.tsx";
import {UsuarioModel} from "../../../core/models/UsuarioModel.tsx";
import {RolModel} from "../../../core/models/RolModel.tsx";


export interface HomeStateModel
    extends StateModel {

    user?: UsuarioModel;

    roles?: Array<RolModel>;

}

/**
 * user new slice
 */
export const homeSlice = createSlice({
    name: "home",
    initialState: {
        result: {},
    } as HomeStateModel,
    reducers: {
        clean: (state, action) => ({
            result: {
                action: action,
            },
        } as HomeStateModel),
        setUser: (state, action) => ({
            ...state,
            user: action.payload,
            result: {
                action: action,
            },
        } as HomeStateModel),
        findRoles: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as HomeStateModel),
        findRolesSuccess: (state, action) => ({
            ...state,
            roles: action.payload.map(({nombre}) => nombre),
            result: {
                action: action,
            },
        } as HomeStateModel),
        findRolesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageInternal: action.payload.message,
                messageUser: "Error al buscar los roles",
            },
        } as HomeStateModel),
    },
});
