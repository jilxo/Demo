import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {variableNewSlice, VariableNewStateModel} from "./_redux/variableNewSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {VariableModel} from '../../../../core/models/VariableModel.tsx';
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import {toast} from "react-toastify";


export default function VariableNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        variable,
        result
    } = useSelector((s: StoreModel) => s[variableNewSlice.name]) as VariableNewStateModel;

    const variableFrm = useFormik({
        initialValues: {
            nombre: ''
        } as VariableModel,
        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: variableModel => {
            dispatch(variableNewSlice.actions.save({
                ...variableModel,
                fechacreacion: new Date(),
                fkemailusuario: 'admin@empresa.com'
            }))
        }
    });

    useEffect(() => () => {
        dispatch(variableNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, variableNewSlice.actions.saveSuccess))
            navigate(`../${variable?.id}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(variableFrm.errors).forEach(([, message]) => toast.error(message));
    }, [variableFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nueva Variable"/>

            <ContentLateralDialog style={styles.content}>

                <TextField id="nombre"
                           label="Nombre *"
                           variant="filled"
                           placeholder="Ingrese el Nombre"
                           error={!!variableFrm.errors.nombre}
                           helperText={variableFrm.errors.nombre || `${variableFrm.values.nombre.length} / 255`}
                           value={variableFrm.values.nombre}
                           onChange={({target}) => variableFrm.setFieldValue('nombre', target.value)}/>

                <Button variant="text"
                        onClick={() => variableFrm.handleSubmit()}>
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
