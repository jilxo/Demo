import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    senseNewSlice,
    SenseNewStateModel
} from "./_redux/senseNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {SentidoModel} from '../../../../core/models/SentidoModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function SenseNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        sense,
        result
    } = useSelector((s: StoreModel) => s[senseNewSlice.name]) as SenseNewStateModel;

    const senseFrm = useFormik({
        initialValues: {
            nombre: ''
        } as SentidoModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: senseModel => {
            dispatch(senseNewSlice.actions.save(senseModel))
        }
    });

    useEffect(() => () => {
        dispatch(senseNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, senseNewSlice.actions.saveSuccess))
            navigate(`../${sense?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(senseFrm.errors).forEach(([, message]) => toast.error(message));
    }, [senseFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nuevo Sentido"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el Nombre"
                           error={!!senseFrm.errors.nombre}
                           helperText={senseFrm.errors.nombre || `${senseFrm.values.nombre.length} / 255`}
                           value={senseFrm.values.nombre}
                           onChange={({target}) => senseFrm.setFieldValue('nombre', target.value)}/>

                <Button variant="text"
                        onClick={() => senseFrm.handleSubmit()}>
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
