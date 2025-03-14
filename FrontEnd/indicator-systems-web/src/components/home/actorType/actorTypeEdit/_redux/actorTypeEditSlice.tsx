import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";


export interface ActorTypeEditStateModel extends StateModel {

    tipoActor?: TipoActorModel;

}

export const actorTypeEditSlice = createSlice({
    name: "actorTypeEdit",
    initialState: {
        result: {},
    } as ActorTypeEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as ActorTypeEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorTypeEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            tipoActor: action.payload,
            result: {
                action: action,
            },
        } as ActorTypeEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar el tipo de actor",
                messageInternal: action.payload.message,
            },
        } as ActorTypeEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorTypeEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            tipoActor: action.payload,
            result: {
                action: action,
                messageUser: "El tipo de actor se actualizo exitosamente",
            },
        } as ActorTypeEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el tipo de actor",
                messageInternal: action.payload.message,
            },
        } as ActorTypeEditStateModel),
    },
});
