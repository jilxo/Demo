import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {roleEditSlice, RoleEditStateModel} from "./_redux/roleEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {RolModel} from "../../../../core/models/RolModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";


export default function RoleEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        rol,
        result
    } = useSelector((s: StoreModel) => s[roleEditSlice.name]) as RoleEditStateModel;

    const roleFrm = useFormik({
        initialValues: {
            id: 0,
            nombre: "",
        } as RolModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (roleModel) => {
            dispatch(roleEditSlice.actions.update(roleModel));
        },
    });

    useEffect(() => {
        if (id)
            dispatch(roleEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(roleEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, roleEditSlice.actions.findSuccess) && rol)
            roleFrm.setValues(rol);
    }, [result]);

    useEffect(() => {
        Object.entries(roleFrm.errors).forEach(([, message]) => toast.error(message));
    }, [roleFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar Rol"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!roleFrm.errors.nombre}
                    helperText={roleFrm.errors.nombre || `${roleFrm.values.nombre.length} / 255`}
                    value={roleFrm.values.nombre}
                    onChange={({target}) => roleFrm.setFieldValue("nombre", target.value)}
                />

                <Button
                    variant="text"
                    onClick={() => roleFrm.handleSubmit()}>
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
