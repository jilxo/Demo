import {createSlice} from "@reduxjs/toolkit";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface ActorTypeListStateModel extends StateModel {

    tipoActores: Array<TipoActorModel>;

}

export const actorTypeListSlice = createSlice({
    name: "actorTypeList",
    initialState: {
        tipoActores: [] as Array<TipoActorModel>,
        result: {},
    } as ActorTypeListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            tipoActores: [],
            result: {
                action: action,
            },
        } as ActorTypeListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorTypeListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            tipoActores: action.payload,
            result: {
                action: action,
            },
        } as ActorTypeListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los tipos de actores",
                messageInternal: action.payload.message,
            },
        } as ActorTypeListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorTypeListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            tipoActores: state.tipoActores.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "El tipo de actor se eliminó exitosamente",
            },
        } as ActorTypeListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el tipo de actor",
                messageInternal: action.payload.message,
            },
        } as ActorTypeListStateModel),
    },
});
