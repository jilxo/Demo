import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    visualRepresentationNewSlice,
    VisualRepresentationNewStateModel
} from "./_redux/visualRepresentationNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {RepresenVisualModel} from '../../../../core/models/RepresenVisualModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function VisualRepresentationNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        visualRepresentation,
        result
    } = useSelector((s: StoreModel) => s[visualRepresentationNewSlice.name]) as VisualRepresentationNewStateModel;

    const visualRepresentationFrm = useFormik({
        initialValues: {
            nombre: ''
        } as RepresenVisualModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: visualRepresentationModel => {
            dispatch(visualRepresentationNewSlice.actions.save(visualRepresentationModel))
        }
    });

    useEffect(() => () => {
        dispatch(visualRepresentationNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, visualRepresentationNewSlice.actions.saveSuccess))
            navigate(`../${visualRepresentation?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(visualRepresentationFrm.errors).forEach(([, message]) => toast.error(message));
    }, [visualRepresentationFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nueva Representación Visual"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el Nombre"
                           error={!!visualRepresentationFrm.errors.nombre}
                           helperText={visualRepresentationFrm.errors.nombre || `${visualRepresentationFrm.values.nombre.length} / 255`}
                           value={visualRepresentationFrm.values.nombre}
                           onChange={({target}) => visualRepresentationFrm.setFieldValue('nombre', target.value)}/>

                <Button variant="text"
                        onClick={() => visualRepresentationFrm.handleSubmit()}>
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
