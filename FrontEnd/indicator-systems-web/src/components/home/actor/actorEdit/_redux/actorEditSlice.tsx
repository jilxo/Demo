import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";


export interface ActorEditStateModel extends StateModel {

    actor?: ActorModel;

    types: Array<TipoActorModel>;

}

export const actorEditSlice = createSlice({
    name: "actorEdit",
    initialState: {
        types: [] as Array<TipoActorModel>,
        result: {},
    } as ActorEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            types: [],
            result: {
                action: action,
            },
        } as ActorEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            actor: action.payload,
            result: {
                action: action,
            },
        } as ActorEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar el actor",
                messageInternal: action.payload.message,
            },
        } as ActorEditStateModel),
        findTypes: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorEditStateModel),
        findTypesSuccess: (state, action) => ({
            ...state,
            types: action.payload,
            result: {
                action: action,
            },
        } as ActorEditStateModel),
        findTypesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los tipos de actores",
                messageInternal: action.payload.message,
            },
        } as ActorEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            actor: action.payload,
            result: {
                action: action,
                messageUser: "El actor se actualizo exitosamente",
            },
        } as ActorEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el actor",
                messageInternal: action.payload.message,
            },
        } as ActorEditStateModel),
    },
});
