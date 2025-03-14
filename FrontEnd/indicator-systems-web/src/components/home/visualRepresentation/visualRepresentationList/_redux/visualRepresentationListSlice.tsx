import {createSlice} from "@reduxjs/toolkit";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface VisualRepresentationListStateModel extends StateModel {

    visualRepresentations: Array<RepresenVisualModel>;

}

export const visualRepresentationListSlice = createSlice({
    name: "visualRepresentationList",
    initialState: {
        visualRepresentations: [] as Array<RepresenVisualModel>,
        result: {},
    } as VisualRepresentationListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            visualRepresentations: [],
            result: {
                action: action,
            },
        } as VisualRepresentationListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as VisualRepresentationListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            visualRepresentations: action.payload,
            result: {
                action: action,
            },
        } as VisualRepresentationListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar las representaciones visuales",
                messageInternal: action.payload.message,
            },
        } as VisualRepresentationListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as VisualRepresentationListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            visualRepresentations: state.visualRepresentations.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "La representación visual se eliminó exitosamente",
            },
        } as VisualRepresentationListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar la representación visual",
                messageInternal: action.payload.message,
            },
        } as VisualRepresentationListStateModel),
    },
});
