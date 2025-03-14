import {createSlice} from "@reduxjs/toolkit";
import {StateModel} from "../../../../../redux/models/StateModel.tsx";


/**
 * decree list state model
 */
export interface DecreeListStateModel extends StateModel {

    /**
     * decrees
     */
    decrees: Array<any>;

}


/**
 * decree list slice
 */
export const decreeListSlice = createSlice({
    name: "decreeList",
    initialState: {
        decrees: [],
        result: {},
    } as DecreeListStateModel,
    reducers: {
        clean: (state, action) => ({
            decrees: [],
            result: {
                action: action,
            },
        } as DecreeListStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as DecreeListStateModel),
        findSuccess: (state, action) => ({
            ...state,
            decrees: action.payload,
            result: {
                action: action,
            },
        } as DecreeListStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageInternal: action.payload.message,
                messageUser: "Error al consultar los decretos",
            },
        } as DecreeListStateModel),
    },
});
