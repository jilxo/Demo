import {createSlice} from "@reduxjs/toolkit";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface ActorTypeNewStateModel extends StateModel {

    tipoActor?: TipoActorModel;

}

export const actorTypeNewSlice = createSlice({
    name: "actorTypeNew",
    initialState: {
        result: {},
    } as ActorTypeNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as ActorTypeNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as ActorTypeNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            tipoActor: action.payload,
            result: {
                action: action,
                messageUser: "El tipo de actor se guardó exitosamente",
            },
        } as ActorTypeNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el tipo de actor",
                messageInternal: action.payload.message,
            },
        } as ActorTypeNewStateModel),
    },
});
