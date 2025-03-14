import {createSlice} from "@reduxjs/toolkit";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface VisualRepresentationEditStateModel extends StateModel {

    visualRepresentation?: RepresenVisualModel;

}

export const visualRepresentationEditSlice = createSlice({
    name: "visualRepresentationEdit",
    initialState: {
        result: {},
    } as VisualRepresentationEditStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as VisualRepresentationEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VisualRepresentationEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            visualRepresentation: action.payload,
            result: {
                action: action,
            },
        } as VisualRepresentationEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar la representación visual",
                messageInternal: action.payload.message,
            },
        } as VisualRepresentationEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VisualRepresentationEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            visualRepresentation: action.payload,
            result: {
                action: action,
                messageUser: "La representación visual se actualizo exitosamente",
            },
        } as VisualRepresentationEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar la representación visual",
                messageInternal: action.payload.message,
            },
        } as VisualRepresentationEditStateModel),
    },
});
