import {createSlice} from "@reduxjs/toolkit";
import {IndicadorModel} from "../../../../../core/models/IndicadorModel.tsx";
import {PayloadAction, StateModel} from "../../../../../redux/store.tsx";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {ArticuloModel} from "../../../../../core/models/ArticuloModel.tsx";
import {LiteralModel} from "../../../../../core/models/LiteralModel.tsx";
import {NumeralModel} from "../../../../../core/models/NumeralModel.tsx";
import {ParagrafoModel} from "../../../../../core/models/ParagrafoModel.tsx";
import {TipoActorModel} from "../../../../../core/models/TipoActorModel.tsx";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {VariablePorIndicadorModel} from "../../../../../core/models/VariablePorIndicadorModel.tsx";
import {ResultadoPorIndicadorModel} from "../../../../../core/models/ResultadoPorIndicadorModel.tsx";


export interface IndicadorEditStateModel extends StateModel {

    indicador?: IndicadorModel;

    tipos: Array<TipoIndicadorModel>;

    unidadesMedicion: Array<UnidadMedicionModel>;

    sentidos: Array<SentidoModel>;

    frecuencias: Array<FrecuenciaModel>;

    articulos: Array<ArticuloModel>;

    literales: Array<LiteralModel>;

    numerales: Array<NumeralModel>;

    paragrafos: Array<ParagrafoModel>;

    // relacionales

    actores: Array<ActorModel>;

    ixactores: Array<ActorModel>;

    fuentes: Array<FuenteModel>;

    ixfuentes: Array<FuenteModel>;

    represenVisuals: Array<RepresenVisualModel>;

    ixrepresenVisuals: Array<RepresenVisualModel>;

    variables: Array<VariableModel>;

    ixvariables: Array<VariablePorIndicadorModel>;

    ixresultados: Array<ResultadoPorIndicadorModel>;

}

export const indicadorEditSlice = createSlice({
    name: "indicadorEdit",
    initialState: {
        tipos: [] as Array<TipoActorModel>,
        unidadesMedicion: [] as Array<UnidadMedicionModel>,
        sentidos: [] as Array<SentidoModel>,
        frecuencias: [] as Array<FrecuenciaModel>,
        articulos: [] as Array<ArticuloModel>,
        literales: [] as Array<LiteralModel>,
        numerales: [] as Array<NumeralModel>,
        paragrafos: [] as Array<ParagrafoModel>,
        actores: [] as Array<ActorModel>,
        ixactores: [] as Array<ActorModel>,
        fuentes: [] as Array<FuenteModel>,
        ixfuentes: [] as Array<FuenteModel>,
        represenVisuals: [] as Array<RepresenVisualModel>,
        ixrepresenVisuals: [] as Array<RepresenVisualModel>,
        variables: [] as Array<VariableModel>,
        ixvariables: [] as Array<VariablePorIndicadorModel>,
        ixresultados: [] as Array<ResultadoPorIndicadorModel>,
        result: {},
    } as IndicadorEditStateModel,
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
            actores: [],
            ixactores: [],
            fuentes: [],
            ixfuentes: [],
            represenVisuals: [],
            ixrepresenVisuals: [],
            variables: [],
            ixvariables: [],
            ixresultados: [],
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        find: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findSuccess: (state, action) => ({
            ...state,
            indicador: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al consultar la indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findTipos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findTiposSuccess: (state, action) => ({
            ...state,
            tipos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findTiposError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los tipos de indicadores",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findUnidadesMedicion: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findUnidadesMedicionSuccess: (state, action) => ({
            ...state,
            unidadesMedicion: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findUnidadesMedicionError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar las unidades de medicion",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findSentidos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findSentidosSuccess: (state, action) => ({
            ...state,
            sentidos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findSentidosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los sentidos",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findFrecuencias: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findFrecuenciasSuccess: (state, action) => ({
            ...state,
            frecuencias: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findFrecuenciasError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar las frecuencias",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findArticulos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findArticulosSuccess: (state, action) => ({
            ...state,
            articulos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findArticulosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los articulos",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findLiterales: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findLiteralesSuccess: (state, action) => ({
            ...state,
            literales: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findLiteralesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los literales",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findNumerales: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findNumeralesSuccess: (state, action) => ({
            ...state,
            numerales: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findNumeralesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los numerales",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findParagrafos: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findParagrafosSuccess: (state, action) => ({
            ...state,
            paragrafos: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findParagrafosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los paragrafos",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findActores: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findActoresSuccess: (state, action) => ({
            ...state,
            actores: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findActoresError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los actores",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findIXActores: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXActoresSuccess: (state, action) => ({
            ...state,
            ixactores: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXActoresError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los actores",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        deleteIXActores: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXActoresSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXActoresError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar los actores",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        saveIXActores: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXActoresSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXActoresError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar el actor",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findFuentes: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findFuentesSuccess: (state, action) => ({
            ...state,
            fuentes: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findFuentesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los fuentes",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findIXFuentes: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXFuentesSuccess: (state, action) => ({
            ...state,
            ixfuentes: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXFuentesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los fuentes",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        deleteIXFuentes: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXFuentesSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXFuentesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar los fuentes",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        saveIXFuentes: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXFuentesSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXFuentesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la fuente",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findRepresenVisuals: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findRepresenVisualsSuccess: (state, action) => ({
            ...state,
            represenVisuals: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findRepresenVisualsError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los represenVisuals",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findIXRepresenVisuals: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXRepresenVisualsSuccess: (state, action) => ({
            ...state,
            ixrepresenVisuals: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXRepresenVisualsError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los represenVisuals",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        deleteIXRepresenVisuals: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXRepresenVisualsSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXRepresenVisualsError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar los represenVisuals",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        saveIXRepresenVisuals: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXRepresenVisualsSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXRepresenVisualsError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la represenVisual",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findVariables: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findVariablesSuccess: (state, action) => ({
            ...state,
            variables: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findVariablesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar las variables",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findIXVariables: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXVariablesSuccess: (state, action) => ({
            ...state,
            ixvariables: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXVariablesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar las variables por indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        deleteIXVariables: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXVariablesSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXVariablesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar las variables por indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        saveIXVariables: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXVariablesSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXVariablesError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar la variables por indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        findIXResultados: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXResultadosSuccess: (state, action) => ({
            ...state,
            ixresultados: action.payload,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        findIXResultadosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al buscar los resultados por indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        deleteIXResultados: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXResultadosSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        deleteIXResultadosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al eliminar los resultados por indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        saveIXResultados: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXResultadosSuccess: (state, action: PayloadAction) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        saveIXResultadosError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al guardar los resultados por indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
        update: (state, action) => ({
            ...state,
            result: {
                action: action,
            },
        } as IndicadorEditStateModel),
        updateSuccess: (state, action) => ({
            ...state,
            indicador: action.payload,
            result: {
                action: action,
                messageUser: "El indicador se actualizo exitosamente",
            },
        } as IndicadorEditStateModel),
        updateError: (state, action) => ({
            ...state,
            result: {
                action: action,
                messageUser: "Error al actualizar el indicador",
                messageInternal: action.payload.message,
            },
        } as IndicadorEditStateModel),
    },
});
