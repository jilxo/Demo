import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actorTypeNewSlice, ActorTypeNewStateModel} from "./_redux/actorTypeNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {TipoActorModel} from '../../../../core/models/TipoActorModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function ActorTypeNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        tipoActor,
        result
    } = useSelector((s: StoreModel) => s[actorTypeNewSlice.name]) as ActorTypeNewStateModel;

    const actorTypeFrm = useFormik({
        initialValues: {
            nombre: ''
        } as TipoActorModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: actorTypeModel => {
            dispatch(actorTypeNewSlice.actions.save(actorTypeModel))
        }
    });

    useEffect(() => () => {
        dispatch(actorTypeNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, actorTypeNewSlice.actions.saveSuccess))
            navigate(`../${tipoActor?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(actorTypeFrm.errors).forEach(([, message]) => toast.error(message));
    }, [actorTypeFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nuevo Tipo de Actor"/>

            <ContentLateralDialog style={styles.content}>

                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!actorTypeFrm.errors.nombre}
                    helperText={actorTypeFrm.errors.nombre || `${actorTypeFrm.values.nombre.length} / 255`}
                    value={actorTypeFrm.values.nombre}
                    onChange={({target}) => actorTypeFrm.setFieldValue('nombre', target.value)}/>

                <Button
                    variant="text"
                    onClick={() => actorTypeFrm.handleSubmit()}>
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
