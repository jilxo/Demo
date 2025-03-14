import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    fontNewSlice,
    FontNewStateModel
} from "./_redux/fontNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {FuenteModel} from '../../../../core/models/FuenteModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function FontNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        fuente,
        result
    } = useSelector((s: StoreModel) => s[fontNewSlice.name]) as FontNewStateModel;

    const fontFrm = useFormik({
        initialValues: {
            nombre: ''
        } as FuenteModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: fontModel => {
            dispatch(fontNewSlice.actions.save(fontModel))
        }
    });

    useEffect(() => () => {
        dispatch(fontNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, fontNewSlice.actions.saveSuccess))
            navigate(`../${fuente?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(fontFrm.errors).forEach(([, message]) => toast.error(message));
    }, [fontFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nueva fuente"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el Nombre"
                           error={!!fontFrm.errors.nombre}
                           helperText={fontFrm.errors.nombre || `${fontFrm.values.nombre.length} / 255`}
                           value={fontFrm.values.nombre}
                           onChange={({target}) => fontFrm.setFieldValue('nombre', target.value)}/>

                <Button variant="text"
                        onClick={() => fontFrm.handleSubmit()}>
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
