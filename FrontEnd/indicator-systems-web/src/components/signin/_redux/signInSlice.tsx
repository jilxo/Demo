import {createSlice} from "@reduxjs/toolkit";
import {UsuarioModel} from "../../../core/models/UsuarioModel.tsx";
import {StateModel} from "../../../redux/store.tsx";


/**
 * user new state model
 */
export interface SignInStateModel
    extends StateModel {

    /**
     * user
     */
    user?: UsuarioModel;

}

/**
 * user new slice
 */
export const signInSlice = createSlice({
    name: "signIn",
    initialState: {
        result: {},
    } as SignInStateModel,
    reducers: {
        clean: (state, action) => ({
            result: {
                action: action,
            },
        } as SignInStateModel),
        auth: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as SignInStateModel),
        authSuccess: (state, action) => ({
            ...state,
            user: action.payload,
            result: {
                action: action,
                messageUser: `Bienvenido ${action.payload.email}`,
            },
        } as SignInStateModel),
        authError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageInternal: action.payload.message,
                messageUser: "Usuario o contraseña Incorrecto",
            },
        } as SignInStateModel),
    },
});
