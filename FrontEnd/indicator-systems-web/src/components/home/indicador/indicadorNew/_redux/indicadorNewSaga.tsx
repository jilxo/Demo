import {put, takeEvery, all} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {IndicadorService} from "../../../../../core/services/IndicadorService.ts";
import {IndicadorModel} from "../../../../../core/models/IndicadorModel.tsx";
import {indicadorNewSlice} from "./indicadorNewSlice.tsx";
import {PayloadAction} from "../../../../../redux/store.tsx";
import {ActorModel} from "../../../../../core/models/ActorModel.tsx";
import {TipoIndicadorService} from "../../../../../core/services/TipoIndicadorService.ts";
import {UnidadMedicionService} from "../../../../../core/services/UnidadMedicionService.ts";
import {SentidoService} from "../../../../../core/services/SentidoService.ts";
import {ArticuloService} from "../../../../../core/services/ArticuloService.ts";
import {LiteralService} from "../../../../../core/services/LiteralService.ts";
import {NumeralService} from "../../../../../core/services/NumeralService.ts";
import {ParagrafoService} from "../../../../../core/services/ParagrafoService.ts";
import {TipoIndicadorModel} from "../../../../../core/models/TipoIndicadorModel.tsx";
import {UnidadMedicionModel} from "../../../../../core/models/UnidadMedicionModel.tsx";
import {SentidoModel} from "../../../../../core/models/SentidoModel.tsx";
import {FrecuenciaService} from "../../../../../core/services/FrecuenciaService.ts";
import {FrecuenciaModel} from "../../../../../core/models/FrecuenciaModel.tsx";


const tipoIndicadorService = new TipoIndicadorService();

const unidadMedicionService = new UnidadMedicionService();

const sentidoService = new SentidoService();

const frecuenciaService = new FrecuenciaService();

const articuloService = new ArticuloService();

const literalService = new LiteralService();

const numeralService = new NumeralService();

const paragrafoService = new ParagrafoService();

const indicadorService = new IndicadorService();

export function* findTiposIndicadorNewSaga() {
    try {
        const {data}: AxiosResponse<TipoIndicadorModel> = yield tipoIndicadorService.find();
        yield put(indicadorNewSlice.actions.findTiposSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findTiposError(e));
    }
}

export function* findUnidadesMedicionIndicadorNewSaga() {
    try {
        const {data}: AxiosResponse<UnidadMedicionModel> = yield unidadMedicionService.find();
        yield put(indicadorNewSlice.actions.findUnidadesMedicionSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findUnidadesMedicionError(e));
    }
}

export function* findSentidosIndicadorNewSaga() {
    try {
        const {data}: AxiosResponse<SentidoModel> = yield sentidoService.find();
        yield put(indicadorNewSlice.actions.findSentidosSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findSentidosError(e));
    }
}

export function* findFrecuenciasIndicadorNewSaga() {
    try {
        const {data}: AxiosResponse<FrecuenciaModel> = yield frecuenciaService.find();
        yield put(indicadorNewSlice.actions.findFrecuenciasSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findFrecuenciasError(e));
    }
}

export function* findArticulosIndicadorNewSaga() {
    try {
        const {data}: AxiosResponse<ActorModel> = yield articuloService.find();
        yield put(indicadorNewSlice.actions.findArticulosSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findArticulosError(e));
    }
}

export function* findLiteralesIndicadorNewSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield literalService.find({articuloId: action.payload});
        yield put(indicadorNewSlice.actions.findLiteralesSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findLiteralesError(e));
    }
}

export function* findNumeralesIndicadorNewSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield numeralService.find({literalId: action.payload});
        yield put(indicadorNewSlice.actions.findNumeralesSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findNumeralesError(e));
    }
}

export function* findParagrafosIndicadorNewSaga(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<ActorModel> = yield paragrafoService.find({articuloId: action.payload});
        yield put(indicadorNewSlice.actions.findParagrafosSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.findParagrafosError(e));
    }
}

export function* saveIndicadorNewSaga(action: PayloadAction<IndicadorModel>) {
    try {
        const {data}: AxiosResponse<IndicadorModel> = yield indicadorService.save(action.payload);
        yield put(indicadorNewSlice.actions.saveSuccess(data));
    } catch (e) {
        yield put(indicadorNewSlice.actions.saveError(e));
    }
}

export function* watchIndicadorNewAsync() {
    yield all([
        takeEvery(indicadorNewSlice.actions.findTipos, findTiposIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findUnidadesMedicion, findUnidadesMedicionIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findSentidos, findSentidosIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findFrecuencias, findFrecuenciasIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findArticulos, findArticulosIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findLiterales, findLiteralesIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findNumerales, findNumeralesIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.findParagrafos, findParagrafosIndicadorNewSaga),
        takeEvery(indicadorNewSlice.actions.save, saveIndicadorNewSaga),
    ]);
}
