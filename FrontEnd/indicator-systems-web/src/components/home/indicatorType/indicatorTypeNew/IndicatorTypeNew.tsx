import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    indicatorTypeNewSlice,
    TipoIndicadorNewStateModel
} from "./_redux/indicatorTypeNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {TipoIndicadorModel} from '../../../../core/models/TipoIndicadorModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function IndicatorTypeNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        tipoIndicador,
        result
    } = useSelector((s: StoreModel) => s[indicatorTypeNewSlice.name]) as TipoIndicadorNewStateModel;

    const indicatorTypeFrm = useFormik({
        initialValues: {
            nombre: ''
        } as TipoIndicadorModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: indicatorTypeModel => {
            dispatch(indicatorTypeNewSlice.actions.save(indicatorTypeModel))
        }
    });

    useEffect(() => () => {
        dispatch(indicatorTypeNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, indicatorTypeNewSlice.actions.saveSuccess)) {
            navigate(`../${tipoIndicador?.id}/edit`, {relative: "route"});
        }
    }, [result])

    useEffect(() => {
        Object.entries(indicatorTypeFrm.errors).forEach(([, message]) => toast.error(message));
    }, [indicatorTypeFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nuevo tipo de indicador"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el Nombre"
                           error={!!indicatorTypeFrm.errors.nombre}
                           helperText={indicatorTypeFrm.errors.nombre || `${indicatorTypeFrm.values.nombre.length} / 255`}
                           value={indicatorTypeFrm.values.nombre}
                           onChange={({target}) => indicatorTypeFrm.setFieldValue('nombre', target.value)}/>

                <Button variant="text"
                        onClick={() => indicatorTypeFrm.handleSubmit()}>
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
