import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import {all, spawn} from "redux-saga/effects";
import {signInSlice} from "../components/signin/_redux/signInSlice.tsx";
import {homeSlice} from "../components/home/_redux/homeSlice.tsx";
import {indicadorListSlice} from "../components/home/indicador/indicadorList/_redux/indicadorListSlice.tsx";
import {indicadorNewSlice} from "../components/home/indicador/indicadorNew/_redux/indicadorNewSlice.tsx";
import {indicadorEditSlice} from "../components/home/indicador/indicadorEdit/_redux/indicadorEditSlice.tsx";
import {decreeListSlice} from "../components/home/decree/actorTypeList/_redux/decreeListSlice.tsx";
import {roleListSlice} from "../components/home/role/roleList/_redux/roleListSlice.tsx";
import {roleNewSlice} from "../components/home/role/roleNew/_redux/roleNewSlice.tsx";
import {roleEditSlice} from "../components/home/role/roleEdit/_redux/roleEditSlice.tsx";
import {userListSlice} from "../components/home/user/userList/_redux/userListSlice.tsx";
import {userNewSlice} from "../components/home/user/userNew/_redux/userNewSlice.tsx";
import {userEditSlice} from "../components/home/user/userEdit/_redux/userEditSlice.tsx";
import {actorTypeListSlice} from "../components/home/actorType/actorTypeList/_redux/actorTypeListSlice.tsx";
import {actorTypeNewSlice} from "../components/home/actorType/actorTypeNew/_redux/actorTypeNewSlice.tsx";
import {actorTypeEditSlice} from "../components/home/actorType/actorTypeEdit/_redux/actorTypeEditSlice.tsx";
import {actorListSlice} from "../components/home/actor/actorList/_redux/actorListSlice.tsx";
import {actorNewSlice} from "../components/home/actor/actorNew/_redux/actorNewSlice.tsx";
import {actorEditSlice} from "../components/home/actor/actorEdit/_redux/actorEditSlice.tsx";
import {fontListSlice} from "../components/home/font/fontList/_redux/fontListSlice.tsx";
import {fontNewSlice} from "../components/home/font/fontNew/_redux/fontNewSlice.tsx";
import {fontEditSlice} from "../components/home/font/fontEdit/_redux/fontEditSlice.tsx";
import {frecuenciaListSlice} from "../components/home/frecuencia/frecuenciaList/_redux/frecuenciaListSlice.tsx";
import {frecuenciaNewSlice} from "../components/home/frecuencia/frecuenciaNew/_redux/frecuenciaNewSlice.tsx";
import {frecuenciaEditSlice} from "../components/home/frecuencia/frecuenciaEdit/_redux/frecuenciaEditSlice.tsx";
import {
    indicatorTypeListSlice
} from "../components/home/indicatorType/indicatorTypeList/_redux/indicatorTypeListSlice.tsx";
import {
    indicatorTypeNewSlice
} from "../components/home/indicatorType/indicatorTypeNew/_redux/indicatorTypeNewSlice.tsx";
import {
    indicatorTypeEditSlice
} from "../components/home/indicatorType/indicatorTypeEdit/_redux/indicatorTypeEditSlice.tsx";
import {
    measuringUnitListSlice
} from "../components/home/measuringUnit/measuringUnitList/_redux/measuringUnitListSlice.tsx";
import {
    measuringUnitNewSlice
} from "../components/home/measuringUnit/measuringUnitNew/_redux/measuringUnitNewSlice.tsx";
import {
    measuringUnitEditSlice
} from "../components/home/measuringUnit/measuringUnitEdit/_redux/measuringUnitEditSlice.tsx";
import {senseListSlice} from "../components/home/sense/senseList/_redux/senseListSlice.tsx";
import {senseNewSlice} from "../components/home/sense/senseNew/_redux/senseNewSlice.tsx";
import {senseEditSlice} from "../components/home/sense/senseEdit/_redux/senseEditSlice.tsx";
import {
    visualRepresentationListSlice
} from "../components/home/visualRepresentation/visualRepresentationList/_redux/visualRepresentationListSlice.tsx";
import {
    visualRepresentationNewSlice
} from "../components/home/visualRepresentation/visualRepresentationNew/_redux/visualRepresentationNewSlice.tsx";
import {
    visualRepresentationEditSlice
} from "../components/home/visualRepresentation/visualRepresentationEdit/_redux/visualRepresentationEditSlice.tsx";
import {variableListSlice} from "../components/home/variable/variableList/_redux/variableListSlice.tsx";
import {variableNewSlice} from "../components/home/variable/variableNew/_redux/variableNewSlice.tsx";
import {variableEditSlice} from "../components/home/variable/variableEdit/_redux/variableEditSlice.tsx";
import {watchSignInAsync} from "../components/signin/_redux/signInSaga.tsx";
import {watchHomeAsync} from "../components/home/_redux/homeSaga.tsx";
import {watchIndicadorListAsync} from "../components/home/indicador/indicadorList/_redux/indicadorListSaga.tsx";
import {watchIndicadorNewAsync} from "../components/home/indicador/indicadorNew/_redux/indicadorNewSaga.tsx";
import {watchIndicadorEditAsync} from "../components/home/indicador/indicadorEdit/_redux/indicadorEditSaga.tsx";
import {watchDecreeListAsync} from "../components/home/decree/actorTypeList/_redux/decreeListSaga.tsx";
import {watchRolListAsync} from "../components/home/role/roleList/_redux/roleListSaga.tsx";
import {watchRoleNewAsync} from "../components/home/role/roleNew/_redux/roleNewSaga.tsx";
import {watchRoleEditAsync} from "../components/home/role/roleEdit/_redux/roleEditSaga.tsx";
import {watchUserListAsync} from "../components/home/user/userList/_redux/userListSaga.tsx";
import {watchUserNewAsync} from "../components/home/user/userNew/_redux/userNewSaga.tsx";
import {watchUserEditAsync} from "../components/home/user/userEdit/_redux/userEditSaga.tsx";
import {watchActorTypeListAsync} from "../components/home/actorType/actorTypeList/_redux/actorTypeListSaga.tsx";
import {watchActorTypeNewAsync} from "../components/home/actorType/actorTypeNew/_redux/actorTypeNewSaga.tsx";
import {watchActorTypeEditAsync} from "../components/home/actorType/actorTypeEdit/_redux/actorTypeEditSaga.tsx";
import {watchActorListAsync} from "../components/home/actor/actorList/_redux/actorListSaga.tsx";
import {watchActorNewAsync} from "../components/home/actor/actorNew/_redux/actorNewSaga.tsx";
import {watchActorEditAsync} from "../components/home/actor/actorEdit/_redux/actorEditSaga.tsx";
import {watchFontListAsync} from "../components/home/font/fontList/_redux/fontListSaga.tsx";
import {watchFontNewAsync} from "../components/home/font/fontNew/_redux/fontNewSaga.tsx";
import {watchFontEditAsync} from "../components/home/font/fontEdit/_redux/fontEditSaga.tsx";
import {watchFrecuenciaListAsync} from "../components/home/frecuencia/frecuenciaList/_redux/frecuenciaListSaga.tsx";
import {watchFrecuenciaNewAsync} from "../components/home/frecuencia/frecuenciaNew/_redux/frecuenciaNewSaga.tsx";
import {watchFrecuenciaEditAsync} from "../components/home/frecuencia/frecuenciaEdit/_redux/frecuenciaEditSaga.tsx";
import {
    watchIndicatorTypeListAsync
} from "../components/home/indicatorType/indicatorTypeList/_redux/indicatorTypeListSaga.tsx";
import {
    watchIndicatorTypeNewAsync
} from "../components/home/indicatorType/indicatorTypeNew/_redux/indicatorTypeNewSaga.tsx";
import {
    watchIndicatorTypeEditAsync
} from "../components/home/indicatorType/indicatorTypeEdit/_redux/indicatorTypeEditSaga.tsx";
import {
    watchMeasuringUnitListAsync
} from "../components/home/measuringUnit/measuringUnitList/_redux/measuringUnitListSaga.tsx";
import {
    watchMeasuringUnitNewAsync
} from "../components/home/measuringUnit/measuringUnitNew/_redux/measuringUnitNewSaga.tsx";
import {
    watchMeasuringUnitEditAsync
} from "../components/home/measuringUnit/measuringUnitEdit/_redux/measuringUnitEditSaga.tsx";
import {watchSenseListAsync} from "../components/home/sense/senseList/_redux/senseListSaga.tsx";
import {watchSenseNewAsync} from "../components/home/sense/senseNew/_redux/senseNewSaga.tsx";
import {watchSenseEditAsync} from "../components/home/sense/senseEdit/_redux/senseEditSaga.tsx";
import {
    watchVisualRepresentationListAsync
} from "../components/home/visualRepresentation/visualRepresentationList/_redux/visualRepresentationListSaga.tsx";
import {
    watchVisualRepresentationNewAsync
} from "../components/home/visualRepresentation/visualRepresentationNew/_redux/visualRepresentationNewSaga.tsx";
import {
    watchVisualRepresentationEditAsync
} from "../components/home/visualRepresentation/visualRepresentationEdit/_redux/visualRepresentationEditSaga.tsx";
import {watchVariableListAsync} from "../components/home/variable/variableList/_redux/variableListSaga.tsx";
import {watchVariableNewAsync} from "../components/home/variable/variableNew/_redux/variableNewSaga.tsx";
import {watchVariableEditAsync} from "../components/home/variable/variableEdit/_redux/variableEditSaga.tsx";


/**
 * store model
 */
export interface StoreModel {

    [key: string]: any;

}

/**
 * payload action
 */
export interface PayloadAction<P = any, T extends string = string> {

    /**
     * payload
     */
    payload?: P;

    /**
     * type
     */
    type?: T;

}

/**
 * result model
 */
export interface ResultModel<M = any> {

    /**
     * action
     */
    action: PayloadAction<M>;

    /**
     * messageInternal
     */
    messageInternal?: string;

    /**
     * messageUser
     */
    messageUser?: string;

}

/**
 * state model
 */
export interface StateModel<M = any> {

    /**
     * result
     */
    result: ResultModel<M>;

}

export function isActionOf(action: PayloadAction<any>, reducer: any) {
    return action?.type === reducer?.type;
}

const reducer: any = {};

const slices = [
    signInSlice,
    homeSlice,
    indicadorListSlice,
    indicadorNewSlice,
    indicadorEditSlice,
    decreeListSlice,
    roleListSlice,
    roleNewSlice,
    roleEditSlice,
    userListSlice,
    userNewSlice,
    userEditSlice,
    actorTypeListSlice,
    actorTypeNewSlice,
    actorTypeEditSlice,
    actorListSlice,
    actorNewSlice,
    actorEditSlice,
    fontListSlice,
    fontNewSlice,
    fontEditSlice,
    frecuenciaListSlice,
    frecuenciaNewSlice,
    frecuenciaEditSlice,
    indicatorTypeListSlice,
    indicatorTypeNewSlice,
    indicatorTypeEditSlice,
    measuringUnitListSlice,
    measuringUnitNewSlice,
    measuringUnitEditSlice,
    senseListSlice,
    senseNewSlice,
    senseEditSlice,
    visualRepresentationListSlice,
    visualRepresentationNewSlice,
    visualRepresentationEditSlice,
    variableListSlice,
    variableNewSlice,
    variableEditSlice,
];

slices.map(slice => reducer[slice.name] = slice.reducer);

const watchAsync = [
    watchSignInAsync,
    watchHomeAsync,
    watchIndicadorListAsync,
    watchIndicadorNewAsync,
    watchIndicadorEditAsync,
    watchDecreeListAsync,
    watchRolListAsync,
    watchRoleNewAsync,
    watchRoleEditAsync,
    watchUserListAsync,
    watchUserNewAsync,
    watchUserEditAsync,
    watchActorTypeListAsync,
    watchActorTypeNewAsync,
    watchActorTypeEditAsync,
    watchActorListAsync,
    watchActorNewAsync,
    watchActorEditAsync,
    watchFontListAsync,
    watchFontNewAsync,
    watchFontEditAsync,
    watchFrecuenciaListAsync,
    watchFrecuenciaNewAsync,
    watchFrecuenciaEditAsync,
    watchIndicatorTypeListAsync,
    watchIndicatorTypeNewAsync,
    watchIndicatorTypeEditAsync,
    watchMeasuringUnitListAsync,
    watchMeasuringUnitNewAsync,
    watchMeasuringUnitEditAsync,
    watchSenseListAsync,
    watchSenseNewAsync,
    watchSenseEditAsync,
    watchVisualRepresentationListAsync,
    watchVisualRepresentationNewAsync,
    watchVisualRepresentationEditAsync,
    watchVariableListAsync,
    watchVariableNewAsync,
    watchVariableEditAsync,
];

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

export default function* rootSaga() {
    yield all(watchAsync.map((saga) => spawn(saga)));
}

sagaMiddleware.run(rootSaga);
