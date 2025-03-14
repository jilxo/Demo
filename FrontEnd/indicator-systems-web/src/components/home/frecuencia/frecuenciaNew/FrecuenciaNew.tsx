import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    frecuenciaNewSlice,
    FrecuenciaNewStateModel
} from "./_redux/frecuenciaNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {FrecuenciaModel} from '../../../../core/models/FrecuenciaModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function FrecuenciaNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        frecuencia,
        result
    } = useSelector((s: StoreModel) => s[frecuenciaNewSlice.name]) as FrecuenciaNewStateModel;

    const frecuenciaFrm = useFormik({
        initialValues: {
            nombre: ''
        } as FrecuenciaModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: frecuenciaModel => {
            dispatch(frecuenciaNewSlice.actions.save(frecuenciaModel))
        }
    });

    useEffect(() => () => {
        dispatch(frecuenciaNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, frecuenciaNewSlice.actions.saveSuccess))
            navigate(`../${frecuencia?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(frecuenciaFrm.errors).forEach(([, message]) => toast.error(message));
    }, [frecuenciaFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nueva frecuencia"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el Nombre"
                           error={!!frecuenciaFrm.errors.nombre}
                           helperText={frecuenciaFrm.errors.nombre || `${frecuenciaFrm.values.nombre.length} / 255`}
                           value={frecuenciaFrm.values.nombre}
                           onChange={({target}) => frecuenciaFrm.setFieldValue('nombre', target.value)}/>

                <Button variant="text"
                        onClick={() => frecuenciaFrm.handleSubmit()}>
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
