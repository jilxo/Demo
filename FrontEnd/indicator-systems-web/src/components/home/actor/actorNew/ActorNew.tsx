import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actorNewSlice, ActorNewStateModel} from "./_redux/actorNewSlice.tsx";
import {Autocomplete, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";
import Box from "@mui/material/Box";


export default function ActorNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        actor,
        types,
        result
    } = useSelector((s: StoreModel) => s[actorNewSlice.name]) as ActorNewStateModel;

    const actorFrm = useFormik({
        initialValues: {
            nombre: '',
            tipo: null,
        },
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres'),
        }),
        validateOnChange: false,
        onSubmit: ({nombre, tipo}) => {
            dispatch(actorNewSlice.actions.save({id: '', nombre, fkidtipoactor: tipo?.id}))
        }
    });

    useEffect(() => {
        dispatch(actorNewSlice.actions.findTypes());
    }, [])

    useEffect(() => () => {
        dispatch(actorNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, actorNewSlice.actions.saveSuccess))
            navigate(`../${actor?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(actorFrm.errors).forEach(([, message]) => toast.error(message));
    }, [actorFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nuevo Actor"/>

            <ContentLateralDialog style={styles.content}>

                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!actorFrm.errors.nombre}
                    helperText={actorFrm.errors.nombre || `${actorFrm.values.nombre.length} / 255`}
                    value={actorFrm.values.nombre}
                    onChange={({target}) => actorFrm.setFieldValue('nombre', target.value)}/>

                <Autocomplete
                    id="tipo"
                    options={types}
                    autoHighlight
                    onChange={(_, newValue) => actorFrm.setFieldValue('tipo', newValue)}
                    getOptionLabel={({nombre}) => nombre}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tipo *"
                            inputProps={{...params.inputProps}}
                            error={!!actorFrm.errors.tipo}
                            helperText={actorFrm.errors.tipo}
                        />
                    )}
                />

                <Button
                    variant="text"
                    onClick={() => actorFrm.handleSubmit()}>
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
