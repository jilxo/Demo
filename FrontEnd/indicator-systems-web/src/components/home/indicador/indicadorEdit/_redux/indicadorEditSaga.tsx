import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {IndicadorService} from "../../../../../core/services/IndicadorService.ts";
import {IndicadorModel} from "../../../../../core/models/IndicadorModel.tsx";
import {indicadorEditSlice} from "./indicadorEditSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";
import {TipoIndicadorService} from "../../../../../core/services/TipoIndicadorService.ts";
import {UnidadMedicionService} from "../../../../../core/services/UnidadMedicionService.ts";
import {SentidoService} from "../../../../../core/services/SentidoService.ts";
import {FrecuenciaService} from "../../../../../core/services/FrecuenciaService.ts";
import {ArticuloService} from "../../../../../core/services/ArticuloService.ts";
import {LiteralService} from "../../../../../core/services/LiteralService.ts";
import {NumeralService} from "../../../../../core/services/NumeralService.ts";
import {ParagrafoService} from "../../../../../core/services/ParagrafoService.ts";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {ActorService} from "../../../../../core/services/ActorService.ts";
import {FuenteService} from "../../../../../core/services/FuenteService.ts";
import {FuenteModel} from "../../../../../core/models/FuenteModel.tsx";
import {RepresenVisualService} from "../../../../../core/services/RepresenVisualService.ts";
import {RepresenVisualModel} from "../../../../../core/models/RepresenVisualModel.tsx";
import {VariablePorIndicadorModel} from "../../../../../core/models/VariablePorIndicadorModel.tsx";
import {VariableModel} from "../../../../../core/models/VariableModel.tsx";
import {VariableService} from "../../../../../core/services/VariableService.ts";
import {ResultadoPorIndicadorModel} from "../../../../../core/models/ResultadoPorIndicadorModel.tsx";


const tipoIndicadorService = new TipoIndicadorService();

const unidadMedicionService = new UnidadMedicionService();

const sentidoService = new SentidoService();

const frecuenciaService = new FrecuenciaService();

const articuloService = new ArticuloService();

const literalService = new LiteralService();

const numeralService = new NumeralService();

const paragrafoService = new ParagrafoService();

const indicadorService = new IndicadorService();

const actorService = new ActorService();

const fuenteService = new FuenteService();

const represenVisualService = new RepresenVisualService();

const variableService = new VariableService();

export function* findIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<IndicadorModel> = yield indicadorService.findOne(action.payload);
        yield put(indicadorEditSlice.actions.findSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findError(e));
    }
}

export function* findTiposIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<TipoIndicadorModel> = yield tipoIndicadorService.find();
        yield put(indicadorEditSlice.actions.findTiposSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findTiposError(e));
    }
}

export function* findUnidadesMedicionIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<UnidadMedicionModel> = yield unidadMedicionService.find();
        yield put(indicadorEditSlice.actions.findUnidadesMedicionSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findUnidadesMedicionError(e));
    }
}

export function* findSentidosIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<SentidoModel> = yield sentidoService.find();
        yield put(indicadorEditSlice.actions.findSentidosSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findSentidosError(e));
    }
}

export function* findFrecuenciasIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<FrecuenciaModel> = yield frecuenciaService.find();
        yield put(indicadorEditSlice.actions.findFrecuenciasSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findFrecuenciasError(e));
    }
}

export function* findArticulosIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<ActorModel> = yield articuloService.find();
        yield put(indicadorEditSlice.actions.findArticulosSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findArticulosError(e));
    }
}

export function* findLiteralesIndicadorEditSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield literalService.find({articuloId: action.payload});
        yield put(indicadorEditSlice.actions.findLiteralesSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findLiteralesError(e));
    }
}

export function* findNumeralesIndicadorEditSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield numeralService.find({literalId: action.payload});
        yield put(indicadorEditSlice.actions.findNumeralesSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findNumeralesError(e));
    }
}

export function* findParagrafosIndicadorEditSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield paragrafoService.find({articuloId: action.payload});
        yield put(indicadorEditSlice.actions.findParagrafosSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findParagrafosError(e));
    }
}

export function* findActoresIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<ActorModel> = yield actorService.find();
        yield put(indicadorEditSlice.actions.findActoresSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findActoresError(e));
    }
}

export function* findIXActoresIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield indicadorService.findResponsable(action.payload);
        yield put(indicadorEditSlice.actions.findIXActoresSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findIXActoresError(e));
    }
}

export function* deleteIXActoresIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        yield indicadorService.deleteResponsable(action.payload);
        yield put(indicadorEditSlice.actions.deleteIXActoresSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.deleteIXActoresError(e));
    }
}

export function* saveIXActoresIndicadorEditSaga(action: PayloadAction<{ id: number, actorId: string }>) {
    try {
        yield indicadorService.saveResponsable(action.payload?.id, action.payload?.actorId);
        yield put(indicadorEditSlice.actions.saveIXActoresSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.saveIXActoresError(e));
    }
}

export function* findFuentesIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<FuenteModel> = yield fuenteService.find();
        yield put(indicadorEditSlice.actions.findFuentesSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findFuentesError(e));
    }
}

export function* findIXFuentesIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<FuenteModel> = yield indicadorService.findFuente(action.payload);
        yield put(indicadorEditSlice.actions.findIXFuentesSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findIXFuentesError(e));
    }
}

export function* deleteIXFuentesIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        yield indicadorService.deleteFuente(action.payload);
        yield put(indicadorEditSlice.actions.deleteIXFuentesSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.deleteIXFuentesError(e));
    }
}

export function* saveIXFuentesIndicadorEditSaga(action: PayloadAction<{ id: number, fuenteId: string }>) {
    try {
        yield indicadorService.saveFuente(action.payload?.id, action.payload?.fuenteId);
        yield put(indicadorEditSlice.actions.saveIXFuentesSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.saveIXFuentesError(e));
    }
}

export function* findRepresenVisualsIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<RepresenVisualModel> = yield represenVisualService.find();
        yield put(indicadorEditSlice.actions.findRepresenVisualsSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findRepresenVisualsError(e));
    }
}

export function* findIXRepresenVisualsIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<RepresenVisualModel> = yield indicadorService.findRepresenVisual(action.payload);
        yield put(indicadorEditSlice.actions.findIXRepresenVisualsSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findIXRepresenVisualsError(e));
    }
}

export function* deleteIXRepresenVisualsIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        yield indicadorService.deleteRepresenVisual(action.payload);
        yield put(indicadorEditSlice.actions.deleteIXRepresenVisualsSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.deleteIXRepresenVisualsError(e));
    }
}

export function* saveIXRepresenVisualsIndicadorEditSaga(action: PayloadAction<{ id: number, represenVisualId: string }>) {
    try {
        yield indicadorService.saveRepresenVisual(action.payload?.id, action.payload?.represenVisualId);
        yield put(indicadorEditSlice.actions.saveIXRepresenVisualsSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.saveIXRepresenVisualsError(e));
    }
}

export function* findVariablesIndicadorEditSaga() {
    try {
        const {data}: AxiosResponse<VariableModel> = yield variableService.find();
        yield put(indicadorEditSlice.actions.findVariablesSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findVariablesError(e));
    }
}

export function* findIXVariablesIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<VariablePorIndicadorModel> = yield indicadorService.findVariable(action.payload);
        yield put(indicadorEditSlice.actions.findIXVariablesSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findIXVariablesError(e));
    }
}

export function* deleteIXVariablesIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        yield indicadorService.deleteVariable(action.payload);
        yield put(indicadorEditSlice.actions.deleteIXVariablesSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.deleteIXVariablesError(e));
    }
}

export function* saveIXVariablesIndicadorEditSaga(action: PayloadAction<{ id: number, variableId: string, dato: number }>) {
    try {
        yield indicadorService.saveVariable(action.payload?.id, action.payload?.variableId, action.payload?.dato);
        yield put(indicadorEditSlice.actions.saveIXVariablesSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.saveIXVariablesError(e));
    }
}

export function* findIXResultadosIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        const {data}: AxiosResponse<ResultadoPorIndicadorModel> = yield indicadorService.findResultado(action.payload);
        yield put(indicadorEditSlice.actions.findIXResultadosSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.findIXResultadosError(e));
    }
}

export function* deleteIXResultadosIndicadorEditSaga(action: PayloadAction<number>) {
    try {
        yield indicadorService.deleteResultado(action.payload);
        yield put(indicadorEditSlice.actions.deleteIXResultadosSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.deleteIXResultadosError(e));
    }
}

export function* saveIXResultadosIndicadorEditSaga(action: PayloadAction<{ id: number, resultado: number }>) {
    try {
        yield indicadorService.saveResultado(action.payload?.id, action.payload?.resultado);
        yield put(indicadorEditSlice.actions.saveIXResultadosSuccess());
    } catch (e) {
        yield put(indicadorEditSlice.actions.saveIXResultadosError(e));
    }
}

export function* updateIndicadorEditSaga(action: PayloadAction<IndicadorModel>) {
    try {
        const {data}: AxiosResponse<IndicadorModel> = yield indicadorService.update(action.payload);
        yield put(indicadorEditSlice.actions.updateSuccess(data));
    } catch (e) {
        yield put(indicadorEditSlice.actions.updateError(e));
    }
}

export function* watchIndicadorEditAsync() {
    yield all([
        takeEvery(indicadorEditSlice.actions.find, findIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findTipos, findTiposIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findUnidadesMedicion, findUnidadesMedicionIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findSentidos, findSentidosIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findFrecuencias, findFrecuenciasIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findArticulos, findArticulosIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findLiterales, findLiteralesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findNumerales, findNumeralesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findParagrafos, findParagrafosIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findActores, findActoresIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findIXActores, findIXActoresIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.deleteIXActores, deleteIXActoresIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.saveIXActores, saveIXActoresIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findFuentes, findFuentesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findIXFuentes, findIXFuentesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.deleteIXFuentes, deleteIXFuentesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.saveIXFuentes, saveIXFuentesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findRepresenVisuals, findRepresenVisualsIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findIXRepresenVisuals, findIXRepresenVisualsIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.deleteIXRepresenVisuals, deleteIXRepresenVisualsIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.saveIXRepresenVisuals, saveIXRepresenVisualsIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findVariables, findVariablesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findIXVariables, findIXVariablesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.deleteIXVariables, deleteIXVariablesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.saveIXVariables, saveIXVariablesIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.findIXResultados, findIXResultadosIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.deleteIXResultados, deleteIXResultadosIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.saveIXResultados, saveIXResultadosIndicadorEditSaga),
        takeEvery(indicadorEditSlice.actions.update, updateIndicadorEditSaga),
    ]);
}
