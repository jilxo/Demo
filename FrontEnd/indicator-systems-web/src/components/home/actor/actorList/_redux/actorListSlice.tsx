import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {createSlice} from "@reduxjs/toolkit";


export interface ActorListStateModel extends StateModel {

    actores: Array<ActorModel>;

}

export const actorListSlice = createSlice({
    name: "actorList",
    initialState: {
        actores: [] as Array<ActorModel>,
        result: {},
    } as ActorListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            actores: [],
            result: {
                action: action,
            },
        } as ActorListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            actores: action.payload,
            result: {
                action: action,
            },
        } as ActorListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los actors",
                messageInternal: action.payload.message,
            },
        } as ActorListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            actores: state.actores.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "El actor se eliminó exitosamente",
            },
        } as ActorListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el rol",
                messageInternal: action.payload.message,
            },
        } as ActorListStateModel),
    },
});
