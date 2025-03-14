import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";


export interface VisualRepresentationNewStateModel extends StateModel {

    visualRepresentation?: RepresenVisualModel;

}

export const visualRepresentationNewSlice = createSlice({
    name: "visualRepresentationNew",
    initialState: {
        result: {},
    } as VisualRepresentationNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            result: {
                action: action,
            },
        } as VisualRepresentationNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VisualRepresentationNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            visualRepresentation: action.payload,
            result: {
                action: action,
                messageUser: "La representación visual se guardó exitosamente",
            },
        } as VisualRepresentationNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la representación visual",
                messageInternal: action.payload.message,
            },
        } as VisualRepresentationNewStateModel),
    },
});
