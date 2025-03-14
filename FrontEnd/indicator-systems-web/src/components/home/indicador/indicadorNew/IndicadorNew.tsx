import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {indicadorNewSlice, IndicadorNewStateModel} from "./_redux/indicadorNewSlice.tsx";
import {Autocomplete, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {IndicadorModel} from '../../../../core/models/IndicadorModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";
import Box from "@mui/material/Box";


export default function IndicadorNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        indicador,
        tipos,
        unidadesMedicion,
        sentidos,
        frecuencias,
        articulos,
        literales,
        numerales,
        paragrafos,
        result
    } = useSelector((s: StoreModel) => s[indicadorNewSlice.name]) as IndicadorNewStateModel;

    const indicadorFrm = useFormik({
        initialValues: {
            codigo: '',
            nombre: '',
            objetivo: '',
            alcance: '',
            formula: '',
            tipo: null,
            unidad: null,
            meta: '',
            sentido: null,
            frecuencia: null,
            articulo: null,
            literal: null,
            numeral: null
        } as IndicadorModel,
        validationSchema: yup.object({
            codigo: yup.string()
                .required('El codigo es un campo obligatorio')
                .max(255, 'El codigo permite maximo 255 caracteres'),
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres'),
            objetivo: yup.string()
                .required('El codigo es un campo obligatorio')
                .max(255, 'El codigo permite maximo 255 caracteres'),
            alcance: yup.string()
                .required('El alcance es un campo obligatorio')
                .max(255, 'El alcance permite maximo 255 caracteres'),
            formula: yup.string()
                .required('La formula es un campo obligatorio')
                .max(255, 'La formula permite maximo 255 caracteres'),
            tipo: yup.object()
                .required('El tipo de indicador es un campo obligatorio'),
            unidad: yup.object()
                .required('La unidad de medicion es un campo obligatorio'),
            meta: yup.string()
                .required('La meta es un campo obligatorio')
                .max(255, 'La meta permite maximo 255 caracteres'),
            sentido: yup.object()
                .required('El sentido es un campo obligatorio'),
            frecuencia: yup.object()
                .required('La frecuencia es un campo obligatorio'),
        }),
        validateOnChange: false,
        onSubmit: ({codigo, nombre, objetivo,
                       alcance, formula,
                       tipo, unidad, meta, sentido, frecuencia, articulo, literal, numeral, paragrafo}) => {
            dispatch(indicadorNewSlice.actions.save({
                codigo, nombre, objetivo, alcance, formula,
                fkidtipoindicador: tipo.id,
                fkidunidadmedicion: unidad.id,
                meta,
                fkidsentido: sentido?.id,
                fkidfrecuencia: frecuencia?.id,
                fkidarticulo: articulo?.id,
                fkidliteral: literal?.id,
                fkidnumeral: numeral?.id,
                fkidparagrafo: paragrafo?.id,
            }));
        }
    });

    useEffect(() => {
        dispatch(indicadorNewSlice.actions.findTipos());
        dispatch(indicadorNewSlice.actions.findUnidadesMedicion());
        dispatch(indicadorNewSlice.actions.findSentidos());
        dispatch(indicadorNewSlice.actions.findFrecuencias());
        dispatch(indicadorNewSlice.actions.findArticulos());
    }, [])

    useEffect(() => () => {
        dispatch(indicadorNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, indicadorNewSlice.actions.saveSuccess))
            navigate(`../${indicador?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(indicadorFrm.errors).forEach(([, message]) => toast.error(message));
    }, [indicadorFrm.errors])

    useEffect(() => {
        if (indicadorFrm.values?.articulo?.id) {
            dispatch(indicadorNewSlice.actions.findLiterales(indicadorFrm.values.articulo.id));
            dispatch(indicadorNewSlice.actions.findParagrafos(indicadorFrm.values.articulo.id));
        }
        if (indicadorFrm.values?.literal?.id)
            dispatch(indicadorNewSlice.actions.findNumerales(indicadorFrm.values.literal.id));
    }, [indicadorFrm.values])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nuevo indicador"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="codigo"
                           label="Codigo *"
                           variant="filled"
                           placeholder="Ingrese el codigo"
                           error={!!indicadorFrm.errors.codigo}
                           helperText={indicadorFrm.errors.codigo || `${indicadorFrm.values.codigo?.length || 0} / 255`}
                           value={indicadorFrm.values.codigo}
                           onChange={({target}) => indicadorFrm.setFieldValue('codigo', target.value)}/>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el nombre"
                           error={!!indicadorFrm.errors.nombre}
                           helperText={indicadorFrm.errors.nombre || `${indicadorFrm.values.nombre?.length || 0} / 255`}
                           value={indicadorFrm.values.nombre}
                           onChange={({target}) => indicadorFrm.setFieldValue('nombre', target.value)}/>

                <TextField id="objetivo"
                           label="Objetivo *"
                           variant="filled"
                           placeholder="Ingrese el objetivo"
                           error={!!indicadorFrm.errors.objetivo}
                           helperText={indicadorFrm.errors.objetivo || `${indicadorFrm.values.objetivo?.length || 0} / 255`}
                           value={indicadorFrm.values.objetivo}
                           onChange={({target}) => indicadorFrm.setFieldValue('objetivo', target.value)}/>

                <TextField id="alcance"
                           label="Alcance *"
                           variant="filled"
                           placeholder="Ingrese el alcance"
                           error={!!indicadorFrm.errors.alcance}
                           helperText={indicadorFrm.errors.alcance || `${indicadorFrm.values.alcance?.length || 0} / 255`}
                           value={indicadorFrm.values.alcance}
                           onChange={({target}) => indicadorFrm.setFieldValue('alcance', target.value)}/>

                <TextField id="formula"
                           label="Formula *"
                           variant="filled"
                           placeholder="Ingrese la formula"
                           error={!!indicadorFrm.errors.formula}
                           helperText={indicadorFrm.errors.formula || `${indicadorFrm.values.formula?.length || 0} / 255`}
                           value={indicadorFrm.values.formula}
                           onChange={({target}) => indicadorFrm.setFieldValue('formula', target.value)}/>

                <Autocomplete
                    id="tipo"
                    options={tipos}
                    autoHighlight
                    onChange={(_, newValue) => indicadorFrm.setFieldValue('tipo', newValue)}
                    getOptionLabel={({nombre}) => nombre}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tipos de indicadores *"
                            inputProps={{...params.inputProps}}
                            error={!!indicadorFrm.errors.tipo}
                            helperText={indicadorFrm.errors.tipo}
                        />
                    )}
                />

                <Autocomplete
                    id="unidad"
                    options={unidadesMedicion}
                    autoHighlight
                    onChange={(_, newValue) => indicadorFrm.setFieldValue('unidad', newValue)}
                    getOptionLabel={({descripcion}) => descripcion}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.descripcion}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Unidades de medicion *"
                            inputProps={{...params.inputProps}}
                            error={!!indicadorFrm.errors.unidad}
                            helperText={indicadorFrm.errors.unidad}
                        />
                    )}
                />

                <TextField id="meta"
                           label="Meta *"
                           variant="filled"
                           placeholder="Ingrese la meta"
                           error={!!indicadorFrm.errors.meta}
                           helperText={indicadorFrm.errors.meta || `${indicadorFrm.values.meta?.length || 0} / 255`}
                           value={indicadorFrm.values.meta}
                           onChange={({target}) => indicadorFrm.setFieldValue('meta', target.value)}/>

                <Autocomplete
                    id="sentido"
                    options={sentidos}
                    autoHighlight
                    onChange={(_, newValue) => indicadorFrm.setFieldValue('sentido', newValue)}
                    getOptionLabel={({nombre}) => nombre}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Sentido *"
                            inputProps={{...params.inputProps}}
                            error={!!indicadorFrm.errors.sentido}
                            helperText={indicadorFrm.errors.sentido}
                        />
                    )}
                />

                <Autocomplete
                    id="frecuencia"
                    options={frecuencias}
                    autoHighlight
                    onChange={(_, newValue) => indicadorFrm.setFieldValue('frecuencia', newValue)}
                    getOptionLabel={({nombre}) => nombre}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Frecuencia *"
                            inputProps={{...params.inputProps}}
                            error={!!indicadorFrm.errors.frecuencia}
                            helperText={indicadorFrm.errors.frecuencia}
                        />
                    )}
                />

                <Autocomplete
                    id="articulo"
                    options={articulos}
                    autoHighlight
                    onChange={(_, newValue) => indicadorFrm.setFieldValue('articulo', newValue)}
                    getOptionLabel={({seccion, id, nombre}) => `SECCION ${seccion?.id}: ${seccion?.nombre} ARTICULO ${id}: ${nombre}`}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            SECCION {option?.seccion?.id}: {option?.seccion?.nombre}
                            <br />
                            ARTICULO {option.id}: {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Articulo *"
                            inputProps={{...params.inputProps}}
                            error={!!indicadorFrm.errors.articulo}
                            helperText={indicadorFrm.errors.articulo}
                        />
                    )}
                />

                {indicadorFrm.values?.articulo && (
                    <Autocomplete
                        id="literal"
                        options={literales}
                        autoHighlight
                        onChange={(_, newValue) => indicadorFrm.setFieldValue('literal', newValue)}
                        getOptionLabel={({id, descripcion}) => `${id}. ${descripcion}`}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {option.id}. {option.descripcion}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Literal"
                                inputProps={{...params.inputProps}}
                                error={!!indicadorFrm.errors.literal}
                                helperText={indicadorFrm.errors.literal}
                            />
                        )}
                    />
                )}

                {indicadorFrm.values?.literal && (
                    <Autocomplete
                        id="numeral"
                        options={numerales}
                        autoHighlight
                        onChange={(_, newValue) => indicadorFrm.setFieldValue('numeral', newValue)}
                        getOptionLabel={({id, descripcion}) => `${id}. ${descripcion}`}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {option.id}. {option.descripcion}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Numeral"
                                inputProps={{...params.inputProps}}
                                error={!!indicadorFrm.errors.numeral}
                                helperText={indicadorFrm.errors.numeral}
                            />
                        )}
                    />
                )}

                {indicadorFrm.values?.articulo && (
                    <Autocomplete
                        id="paragrafo"
                        options={paragrafos}
                        autoHighlight
                        onChange={(_, newValue) => indicadorFrm.setFieldValue('paragrafo', newValue)}
                        getOptionLabel={({id, descripcion}) => `${id}. ${descripcion}`}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {option.id}. {option.descripcion}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Paragrafo *"
                                inputProps={{...params.inputProps}}
                                error={!!indicadorFrm.errors.paragrafo}
                                helperText={indicadorFrm.errors.paragrafo}
                            />
                        )}
                    />
                )}

                <Button variant="text"
                        onClick={() => indicadorFrm.handleSubmit()}>
                    Guardar
                </Button>

            </ContentLateralDialog>

        </LateralDialog>
    );
}

const styles = {
    content: {
        gap: '20px'
    } as CSSProperties,
    row: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '10px'
    } as CSSProperties
}
