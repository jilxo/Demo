import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";


export interface ActorNewStateModel extends StateModel {

    actor?: ActorModel;

    types: Array<TipoActorModel>;

}

export const actorNewSlice = createSlice({
    name: "actorNew",
    initialState: {
        types: [] as Array<TipoActorModel>,
        result: {},
    } as ActorNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            types: [],
            result: {
                action: action,
            },
        } as ActorNewStateModel),
        findTypes: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorNewStateModel),
        findTypesSuccess: (state, action) => ({
            ...state,
            types: action.payload,
            result: {
                action: action,
            },
        } as ActorNewStateModel),
        findTypesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los tipos de actores",
                messageInternal: action.payload.message,
            },
        } as ActorNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            actor: action.payload,
            result: {
                action: action,
                messageUser: "El actor se guardó exitosamente",
            },
        } as ActorNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el actor",
                messageInternal: action.payload.message,
            },
        } as ActorNewStateModel),
    },
});
