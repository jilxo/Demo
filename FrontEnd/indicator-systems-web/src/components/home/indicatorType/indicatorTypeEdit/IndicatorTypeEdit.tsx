import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {indicatorTypeEditSlice, IndicatorTypeEditStateModel} from "./_redux/indicatorTypeEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {TipoIndicadorModel} from "../../../../core/models/TipoIndicadorModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";


export default function IndicatorTypeEdit() {
    const dispatch = useDispatch();

    const {
        tipoIndicador,
        result
    } = useSelector((s: StoreModel) => s[indicatorTypeEditSlice.name]) as IndicatorTypeEditStateModel;

    const {id} = useParams();

    const indicatorTypeFrm = useFormik({
        initialValues: {
            id: 0,
            nombre: "",
        } as TipoIndicadorModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (indicatorTypeModel) => {
            dispatch(indicatorTypeEditSlice.actions.update(indicatorTypeModel));
        },
    });

    useEffect(() => {
        if (id)
            dispatch(indicatorTypeEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(indicatorTypeEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, indicatorTypeEditSlice.actions.findSuccess) && tipoIndicador)
            indicatorTypeFrm.setValues(tipoIndicador);
    }, [result]);

    useEffect(() => {
        Object.entries(indicatorTypeFrm.errors).forEach(([, message]) => toast.error(message));
    }, [indicatorTypeFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar el Tipo de indicador"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!indicatorTypeFrm.errors.nombre}
                    helperText={
                        indicatorTypeFrm.errors.nombre || `${indicatorTypeFrm.values.nombre.length} / 255`
                    }
                    value={indicatorTypeFrm.values.nombre}
                    onChange={({target}) => indicatorTypeFrm.setFieldValue("nombre", target.value)}
                />

                <Button variant="text" onClick={() => indicatorTypeFrm.handleSubmit()}>
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
