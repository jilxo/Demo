import {createSlice} from "@reduxjs/toolkit";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";


export interface SenseListStateModel extends StateModel {

    senses: Array<SentidoModel>;

}


export const senseListSlice = createSlice({
    name: "senseList",
    initialState: {
        senses: [] as Array<SentidoModel>,
        result: {},
    } as SenseListStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            senses: [],
            result: {
                action: action,
            },
        } as SenseListStateModel),
        find: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as SenseListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            senses: action.payload,
            result: {
                action: action,
            },
        } as SenseListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar los sentidos",
                messageInternal: action.payload.message,
            },
        } as SenseListStateModel),
        delete: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as SenseListStateModel),
        deleteSuccess: (state, action) => ({
            ...state,
            senses: state.senses.filter(({id}) => id !== action.payload),
            result: {
                action: action,
                messageUser: "El sentido se eliminó exitosamente",
            },
        } as SenseListStateModel),
        deleteError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar el sentido",
                messageInternal: action.payload.message,
            },
        } as SenseListStateModel),
    },
});
