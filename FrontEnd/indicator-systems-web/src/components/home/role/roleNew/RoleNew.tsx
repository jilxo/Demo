import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {roleNewSlice, RolNewStateModel} from "./_redux/roleNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {RolModel} from '../../../../core/models/RolModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function RoleNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        rol,
        result
    } = useSelector((s: StoreModel) => s[roleNewSlice.name]) as RolNewStateModel;

    const roleFrm = useFormik({
        initialValues: {
            nombre: ''
        } as RolModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: roleModel => {
            dispatch(roleNewSlice.actions.save(roleModel))
        }
    });

    useEffect(() => () => {
        dispatch(roleNewSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, roleNewSlice.actions.saveSuccess))
            navigate(`../${rol?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(roleFrm.errors).forEach(([, message]) => toast.error(message));
    }, [roleFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Nuevo Rol"/>

            <ContentLateralDialog style={styles.content}>

                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!roleFrm.errors.nombre}
                    helperText={roleFrm.errors.nombre || `${roleFrm.values.nombre.length} / 255`}
                    value={roleFrm.values.nombre}
                    onChange={({target}) => roleFrm.setFieldValue('nombre', target.value)}/>

                <Button
                    variant="text"
                    onClick={() => roleFrm.handleSubmit()}>
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
