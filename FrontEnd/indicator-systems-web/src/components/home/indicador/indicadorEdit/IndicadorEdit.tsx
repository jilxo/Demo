import * as React from "react";
import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {indicadorEditSlice, IndicadorEditStateModel} from "./_redux/indicadorEditSlice.tsx";
import {Autocomplete, Button, Chip, InputAdornment, Tab, Tabs, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {IndicadorModel} from "../../../../core/models/IndicadorModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";
import {ActorModel} from "../../../../core/models/ActorModel.tsx";
import {FuenteModel} from "../../../../core/models/FuenteModel.tsx";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {RepresenVisualModel} from "../../../../core/models/RepresenVisualModel.tsx";
import {VariablePorIndicadorModel} from "../../../../core/models/VariablePorIndicadorModel.tsx";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit} from "../../../../lib/utils.tsx";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function IndicadorEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
        actores,
        ixactores,
        fuentes,
        ixfuentes,
        represenVisuals,
        ixrepresenVisuals,
        variables,
        ixvariables,
        ixresultados,
        result
    } = useSelector((s: StoreModel) => s[indicadorEditSlice.name]) as IndicadorEditStateModel;

    const indicadorFrm = useFormik({
        initialValues: {
            id: 0,
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
            numeral: null,
            actores: [],
            fuentes: [],
            represenVisuals: [],
            variables: [],
            variable: null,
            dato: null,
            resultados: [],
            resultado: null,
        } as IndicadorModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
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
        onSubmit: ({
                       id, codigo, nombre, objetivo,
                       alcance, formula,
                       tipo, unidad, meta, sentido, frecuencia, articulo, literal, numeral, paragrafo,
                   }) => {
            dispatch(indicadorEditSlice.actions.update({
                id, codigo, nombre, objetivo, alcance, formula,
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
            dispatch(indicadorEditSlice.actions.deleteIXActores(id));
            dispatch(indicadorEditSlice.actions.deleteIXFuentes(id));
            dispatch(indicadorEditSlice.actions.deleteIXRepresenVisuals(id));
            dispatch(indicadorEditSlice.actions.deleteIXVariables(id));
            dispatch(indicadorEditSlice.actions.deleteIXResultados(id));
        },
    });

    useEffect(() => {
        dispatch(indicadorEditSlice.actions.findTipos());
        dispatch(indicadorEditSlice.actions.findUnidadesMedicion());
        dispatch(indicadorEditSlice.actions.findSentidos());
        dispatch(indicadorEditSlice.actions.findFrecuencias());
        dispatch(indicadorEditSlice.actions.findArticulos());
        dispatch(indicadorEditSlice.actions.findActores());
        dispatch(indicadorEditSlice.actions.findFuentes());
        dispatch(indicadorEditSlice.actions.findRepresenVisuals());
        dispatch(indicadorEditSlice.actions.findVariables());
        if (id) {
            dispatch(indicadorEditSlice.actions.find(id));
            dispatch(indicadorEditSlice.actions.findIXActores(id));
            dispatch(indicadorEditSlice.actions.findIXFuentes(id));
            dispatch(indicadorEditSlice.actions.findIXRepresenVisuals(id));
            dispatch(indicadorEditSlice.actions.findIXVariables(id));
            dispatch(indicadorEditSlice.actions.findIXResultados(id));
        }
    }, []);

    useEffect(() => () => {
        dispatch(indicadorEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, indicadorEditSlice.actions.findSuccess) && indicador)
            indicadorFrm.setValues({
                ...indicador,
                actores: [],
                fuentes: [],
                represenVisuals: [],
                variables: [],
                resultados: [],
            } as any);
        if (isActionOf(result.action, indicadorEditSlice.actions.findIXActoresSuccess) && ixactores)
            indicadorFrm.setFieldValue('actores', ixactores || []);
        if (isActionOf(result.action, indicadorEditSlice.actions.deleteIXActoresSuccess))
            indicadorFrm.values.actores.forEach((actor: ActorModel) => dispatch(indicadorEditSlice.actions.saveIXActores({
                id,
                actorId: actor.id
            })));
        if (isActionOf(result.action, indicadorEditSlice.actions.findIXFuentesSuccess) && ixfuentes)
            indicadorFrm.setFieldValue('fuentes', ixfuentes || []);
        if (isActionOf(result.action, indicadorEditSlice.actions.deleteIXFuentesSuccess))
            indicadorFrm.values.fuentes.forEach((fuente: FuenteModel) => dispatch(indicadorEditSlice.actions.saveIXFuentes({
                id,
                fuenteId: fuente.id
            })));
        if (isActionOf(result.action, indicadorEditSlice.actions.findIXRepresenVisualsSuccess) && ixrepresenVisuals)
            indicadorFrm.setFieldValue('represenVisuals', ixrepresenVisuals || []);
        if (isActionOf(result.action, indicadorEditSlice.actions.deleteIXRepresenVisualsSuccess))
            indicadorFrm.values.represenVisuals.forEach((represenVisual: RepresenVisualModel) => dispatch(indicadorEditSlice.actions.saveIXRepresenVisuals({
                id,
                represenVisualId: represenVisual.id
            })));
        if (isActionOf(result.action, indicadorEditSlice.actions.findIXVariablesSuccess) && ixvariables)
            indicadorFrm.setFieldValue('variables', ixvariables || []);
        if (isActionOf(result.action, indicadorEditSlice.actions.deleteIXVariablesSuccess))
            indicadorFrm.values.variables.forEach(({variable, dato}: VariablePorIndicadorModel) => dispatch(indicadorEditSlice.actions.saveIXVariables({
                id,
                variableId: variable.id,
                dato
            })));
        if (isActionOf(result.action, indicadorEditSlice.actions.findIXResultadosSuccess) && ixresultados)
            indicadorFrm.setFieldValue('resultados', ixresultados || []);
        if (isActionOf(result.action, indicadorEditSlice.actions.deleteIXResultadosSuccess))
            indicadorFrm.values.resultados.forEach(({resultado}: ResultadoPorIndicadorModel) => dispatch(indicadorEditSlice.actions.saveIXResultados({
                id,
                resultado
            })));
    }, [result]);

    useEffect(() => {
        Object.entries(indicadorFrm.errors).forEach(([, message]) => toast.error(message));
    }, [indicadorFrm.errors]);

    useEffect(() => {
        if (indicadorFrm.values?.articulo?.id) {
            dispatch(indicadorEditSlice.actions.findLiterales(indicadorFrm.values.articulo.id));
            dispatch(indicadorEditSlice.actions.findParagrafos(indicadorFrm.values.articulo.id));
        }
        if (indicadorFrm.values?.literal?.id)
            dispatch(indicadorEditSlice.actions.findNumerales(indicadorFrm.values.literal.id));
    }, [indicadorFrm.values]);

    const handleAddItem = (field: string, item: any) => {
        if (!item) return;

        indicadorFrm.setFieldValue(field, [...indicadorFrm.values[field], item]);
    }

    const handleDeleteItem = (field: string, i: number) => {
        indicadorFrm.setFieldValue(
            field,
            (indicadorFrm.values[field] as Array<any>).filter(({id}) => id !== i)
        );
    }

    const addVariable = () => {
        const v = {
            variable: indicadorFrm.values.variable,
            dato: indicadorFrm.values.dato
        };
        indicadorFrm.setFieldValue('variables', [...indicadorFrm.values.variables, v]);
        indicadorFrm.setFieldValue('variable', null);
        indicadorFrm.setFieldValue('dato', null);
    }

    const deleteVariable = (i: number) => {
        indicadorFrm.setFieldValue(
            'variables',
            (indicadorFrm.values.variables as Array<any>).filter(({variable}) => variable.id !== i)
        );
    }

    const addResultado = () => {
        const v = {
            resultado: indicadorFrm.values.resultado,
        };
        indicadorFrm.setFieldValue('resultados', [...indicadorFrm.values.resultados, v]);
        indicadorFrm.setFieldValue('resultado', null);
    }

    const deleteResultado = (i: number) => {
        indicadorFrm.setFieldValue(
            'resultados',
            (indicadorFrm.values.resultados as Array<any>).filter(({resultado}) => resultado !== i)
        );
    }

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar indicador"/>

            <ContentLateralDialog style={styles.content}>

                <Box sx={{width: '100%'}}>
                    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Datos basicos" {...a11yProps(0)} />
                            <Tab label="Actores" {...a11yProps(1)} />
                            <Tab label="Fuentes" {...a11yProps(2)} />
                            <Tab label="Represen Visual" {...a11yProps(3)} />
                            <Tab label="Variables" {...a11yProps(4)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>


                        <Box  style={{...styles.content, display: 'flex', flexDirection: 'column'}}>
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
                                value={indicadorFrm.values.tipo}
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
                                value={indicadorFrm.values.unidad}
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
                                value={indicadorFrm.values.sentido}
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
                                value={indicadorFrm.values.frecuencia}
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
                                getOptionLabel={({
                                                     seccion,
                                                     id,
                                                     nombre
                                                 }) => `SECCION ${seccion?.id}: ${seccion?.nombre} ARTICULO ${id}: ${nombre}`}
                                value={indicadorFrm.values.articulo}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        SECCION {option?.seccion?.id}: {option?.seccion?.nombre}
                                        <br/>
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
                                    value={indicadorFrm.values.literal}
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
                                    value={indicadorFrm.values.numeral}
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
                                    value={indicadorFrm.values.paragrafo}
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
                        </Box>


                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>


                        <Box  style={{...styles.content, display: 'flex', flexDirection: 'column'}}>

                            <Autocomplete
                                id="actores"
                                options={actores}
                                autoHighlight
                                onChange={(_, newValue) => handleAddItem('actores', newValue)}
                                getOptionLabel={({nombre}) => nombre}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.nombre}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Actores"
                                        inputProps={{...params.inputProps}}
                                        error={!!indicadorFrm.errors.actores}
                                        helperText={indicadorFrm.errors.actores}
                                    />
                                )}
                            />

                            <Box
                                style={styles.chips}>
                                {indicadorFrm.values?.actores?.map(({id, nombre}) => (
                                    <Chip label={nombre}
                                          onDelete={() => handleDeleteItem('actores', id)}/>
                                ))}
                            </Box>

                        </Box>


                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>


                        <Box  style={{...styles.content, display: 'flex', flexDirection: 'column'}}>

                            <Autocomplete
                                id="fuentes"
                                options={fuentes}
                                autoHighlight
                                onChange={(_, newValue) => handleAddItem('fuentes', newValue)}
                                getOptionLabel={({nombre}) => nombre}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.nombre}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Fuentes"
                                        inputProps={{...params.inputProps}}
                                        error={!!indicadorFrm.errors.fuentes}
                                        helperText={indicadorFrm.errors.fuentes}
                                    />
                                )}
                            />

                            <Box
                                style={styles.chips}>
                                {indicadorFrm.values?.fuentes?.map(({id, nombre}) => (
                                    <Chip label={nombre}
                                          onDelete={() => handleDeleteItem('fuentes', id)}/>
                                ))}
                            </Box>

                        </Box>


                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>


                        <Box  style={{...styles.content, display: 'flex', flexDirection: 'column'}}>

                            <Autocomplete
                                id="represenVisuals"
                                options={represenVisuals}
                                autoHighlight
                                onChange={(_, newValue) => handleAddItem('represenVisuals', newValue)}
                                getOptionLabel={({nombre}) => nombre}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.nombre}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Representaciones Visuales"
                                        inputProps={{...params.inputProps}}
                                        error={!!indicadorFrm.errors.represenVisuals}
                                        helperText={indicadorFrm.errors.represenVisuals}
                                    />
                                )}
                            />

                            <Box
                                style={styles.chips}>
                                {indicadorFrm.values?.represenVisuals?.map(({id, nombre}) => (
                                    <Chip label={nombre}
                                          onDelete={() => handleDeleteItem('represenVisuals', id)}/>
                                ))}
                            </Box>

                        </Box>


                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>


                        <Box  style={{...styles.content, display: 'flex', flexDirection: 'column'}}>

                            <Autocomplete
                                id="variable"
                                options={variables}
                                autoHighlight
                                onChange={(_, newValue) => indicadorFrm.setFieldValue('variable', newValue)}
                                getOptionLabel={({nombre}) => nombre}
                                value={indicadorFrm.values.variable}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.nombre}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Variable *"
                                        inputProps={{...params.inputProps}}
                                    />
                                )}
                            />

                            <TextField id="dato"
                                       label="dato *"
                                       variant="filled"
                                       placeholder="Ingrese el dato"
                                       value={indicadorFrm.values.dato}
                                       onChange={({target}) => indicadorFrm.setFieldValue('dato', target.value)}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="start">
                                                   <IconButton onClick={addVariable}>
                                                       <AddIcon />
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}/>

                            <Box
                                style={styles.chips}>
                                {indicadorFrm.values?.variables?.map(({variable, dato}) => (
                                    <Chip label={variable.nombre + ' - ' + dato}
                                          onDelete={() => deleteVariable(variable.id)}/>
                                ))}
                            </Box>

                        </Box>


                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>


                        <Box  style={{...styles.content, display: 'flex', flexDirection: 'column'}}>

                            <TextField id="resultado"
                                       label="resultado *"
                                       variant="filled"
                                       placeholder="Ingrese el resultado"
                                       value={indicadorFrm.values.resultado}
                                       onChange={({target}) => indicadorFrm.setFieldValue('resultado', target.value)}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="start">
                                                   <IconButton onClick={addResultado}>
                                                       <AddIcon />
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}/>

                            <Box
                                style={styles.chips}>
                                {indicadorFrm.values?.resultados?.map(({resultado}) => (
                                    <Chip label={resultado}
                                          onDelete={() => deleteResultado(resultado)}/>
                                ))}
                            </Box>

                        </Box>


                    </CustomTabPanel>
                </Box>

                {validEdit(roles) && <Button variant="text" onClick={() => indicadorFrm.handleSubmit()}>
                    {value === 0 ? 'Actualizar' : 'Guardar'}
                </Button>}
            </ContentLateralDialog>
        </LateralDialog>
    );
}

const styles = {
    content: {
        gap: "20px",
    } as CSSProperties,
    row: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: "10px",
    } as CSSProperties,
    chips: {
        gap: '10px'
    } as CSSProperties,
};
