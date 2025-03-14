import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {createSlice} from "@reduxjs/toolkit";
import {IndicadorModel} from "../../../../../core/models/IndicadorModel.tsx";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {ArticuloModel} from "../../../../../core/models/ArticuloModel.tsx";
import {LiteralModel} from "../../../../../core/models/LiteralModel.tsx";
import {NumeralModel} from "../../../../../core/models/NumeralModel.tsx";
import {ParagrafoModel} from "../../../../../core/models/ParagrafoModel.tsx";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";


export interface IndicadorNewStateModel extends StateModel {

    indicador?: IndicadorModel;

    tipos: Array<TipoIndicadorModel>;

    unidadesMedicion: Array<UnidadMedicionModel>;

    sentidos: Array<SentidoModel>;

    frecuencias: Array<FrecuenciaModel>;

    articulos: Array<ArticuloModel>;

    literales: Array<LiteralModel>;

    numerales: Array<NumeralModel>;

    paragrafos: Array<ParagrafoModel>;

}

export const indicadorNewSlice = createSlice({
    name: "indicadorNew",
    initialState: {
        tipos: [] as Array<TipoActorModel>,
        unidadesMedicion: [] as Array<UnidadMedicionModel>,
        sentidos: [] as Array<SentidoModel>,
        frecuencias: [] as Array<FrecuenciaModel>,
        articulos: [] as Array<ArticuloModel>,
        literales: [] as Array<LiteralModel>,
        numerales: [] as Array<NumeralModel>,
        paragrafos: [] as Array<ParagrafoModel>,
        result: {},
    } as IndicadorNewStateModel,
    reducers: {
        clean: (_, action: PayloadAction) => ({
            tipos: [],
            unidadesMedicion: [],
            sentidos: [],
            frecuencias: [],
            articulos: [],
            literales: [],
            numerales: [],
            paragrafos: [],
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findTipos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findTiposSuccess: (state, action) => ({
            ...state,
            tipos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findTiposError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los tipos de indicadores",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findUnidadesMedicion: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findUnidadesMedicionSuccess: (state, action) => ({
            ...state,
            unidadesMedicion: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findUnidadesMedicionError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar las unidades de medicion",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findSentidos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findSentidosSuccess: (state, action) => ({
            ...state,
            sentidos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findSentidosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los sentidos",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findFrecuencias: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findFrecuenciasSuccess: (state, action) => ({
            ...state,
            frecuencias: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findFrecuenciasError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar las frecuencias",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findArticulos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findArticulosSuccess: (state, action) => ({
            ...state,
            articulos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findArticulosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los articulos",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findLiterales: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findLiteralesSuccess: (state, action) => ({
            ...state,
            literales: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findLiteralesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los literales",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findNumerales: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findNumeralesSuccess: (state, action) => ({
            ...state,
            numerales: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findNumeralesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los numerales",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        findParagrafos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findParagrafosSuccess: (state, action) => ({
            ...state,
            paragrafos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        findParagrafosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los paragrafos",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
        save: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorNewStateModel),
        saveSuccess: (state, action) => ({
            ...state,
            indicador: action.payload,
            result: {
                action: action,
                messageUser: "El indicador se guardó exitosamente",
            },
        } as IndicadorNewStateModel),
        saveError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorNewStateModel),
    },
});
