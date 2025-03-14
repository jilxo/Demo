import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fontEditSlice, FontEditStateModel} from "./_redux/fontEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {FuenteModel} from "../../../../core/models/FuenteModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";


export default function FontEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        fuente,
        result
    } = useSelector((s: StoreModel) => s[fontEditSlice.name]) as FontEditStateModel;

    const fontFrm = useFormik({
        initialValues: {
            id: 0,
            nombre: "",
        } as FuenteModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (fontModel) => {
            dispatch(fontEditSlice.actions.update(fontModel));
        },
    });

    useEffect(() => {
        if (id)
            dispatch(fontEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(fontEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, fontEditSlice.actions.findSuccess) && fuente)
            fontFrm.setValues(fuente);
    }, [result]);

    useEffect(() => {
        Object.entries(fontFrm.errors).forEach(([, message]) => toast.error(message));
    }, [fontFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar fuente"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!fontFrm.errors.nombre}
                    helperText={
                        fontFrm.errors.nombre || `${fontFrm.values.nombre.length} / 255`
                    }
                    value={fontFrm.values.nombre}
                    onChange={({target}) => fontFrm.setFieldValue("nombre", target.value)}
                />

                <Button variant="text" onClick={() => fontFrm.handleSubmit()}>
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
