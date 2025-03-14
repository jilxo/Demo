import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {variableEditSlice, VariableEditStateModel} from "./_redux/variableEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {VariableModel} from "../../../../core/models/VariableModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";


export default function VariableEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        variable,
        result
    } = useSelector((s: StoreModel) => s[variableEditSlice.name]) as VariableEditStateModel;

    const variableFrm = useFormik({
        initialValues: {
            id: 0,
            nombre: "",
            fechacreacion: new Date(),
            fkemailusuario: 'admin@empresa.com'
        } as VariableModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (variableModel) => {
            dispatch(variableEditSlice.actions.update(variableModel));
        },
    });

    useEffect(() => {
        if (id)
            dispatch(variableEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(variableEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, variableEditSlice.actions.findSuccess) && variable)
            variableFrm.setValues(variable);
    }, [result]);

    useEffect(() => {
        Object.entries(variableFrm.errors).forEach(([, message]) => toast.error(message));
    }, [variableFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar Variable"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!variableFrm.errors.nombre}
                    helperText={
                        variableFrm.errors.nombre || `${variableFrm.values.nombre.length} / 255`
                    }
                    value={variableFrm.values.nombre}
                    onChange={({target}) => variableFrm.setFieldValue("nombre", target.value)}
                />

                <Button variant="text" onClick={() => variableFrm.handleSubmit()}>
                    Actualizar
                </Button>
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
};
