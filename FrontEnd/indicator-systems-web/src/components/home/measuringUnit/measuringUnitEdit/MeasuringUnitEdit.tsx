import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {measuringUnitEditSlice, MeasuringUnitEditStateModel} from "./_redux/measuringUnitEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {UnidadMedicionModel} from "../../../../core/models/UnidadMedicionModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";

export default function MeasuringUnitEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        measuringUnit,
        result
    } = useSelector((s: StoreModel) => s[measuringUnitEditSlice.name]) as MeasuringUnitEditStateModel;

    const measuringUnitFrm = useFormik({
        initialValues: {
            id: 0,
            descripcion: "",
        } as UnidadMedicionModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            descripcion: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (measuringUnitModel) => {
            dispatch(measuringUnitEditSlice.actions.update(measuringUnitModel));
        },
    });

    useEffect(() => {
        if (id)
            dispatch(measuringUnitEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(measuringUnitEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, measuringUnitEditSlice.actions.findSuccess) && measuringUnit)
            measuringUnitFrm.setValues(measuringUnit);
    }, [result]);

    useEffect(() => {
        Object.entries(measuringUnitFrm.errors).forEach(([, message]) => toast.error(message));
    }, [measuringUnitFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar Unidad de Medida"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="descripcion"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!measuringUnitFrm.errors.descripcion}
                    helperText={
                        measuringUnitFrm.errors.descripcion || `${measuringUnitFrm.values.descripcion.length} / 255`
                    }
                    value={measuringUnitFrm.values.descripcion}
                    onChange={({target}) => measuringUnitFrm.setFieldValue("descripcion", target.value)}
                />

                <Button variant="text" onClick={() => measuringUnitFrm.handleSubmit()}>
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
