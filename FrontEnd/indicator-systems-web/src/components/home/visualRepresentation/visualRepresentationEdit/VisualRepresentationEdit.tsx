import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    visualRepresentationEditSlice,
    VisualRepresentationEditStateModel
} from "./_redux/visualRepresentationEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {RepresenVisualModel} from "../../../../core/models/RepresenVisualModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";


export default function VisualRepresentationEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        visualRepresentation,
        result
    } = useSelector((s: StoreModel) => s[visualRepresentationEditSlice.name]) as VisualRepresentationEditStateModel;

    const visualRepresentationFrm = useFormik({
        initialValues: {
            id: 0,
            nombre: "",
        } as RepresenVisualModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (visualRepresentationModel) => {
            dispatch(visualRepresentationEditSlice.actions.update(visualRepresentationModel));
        },
    });

    useEffect(() => {
        if (id)
            dispatch(visualRepresentationEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(visualRepresentationEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, visualRepresentationEditSlice.actions.findSuccess) && visualRepresentation)
            visualRepresentationFrm.setValues(visualRepresentation);
    }, [result]);

    useEffect(() => {
        Object.entries(visualRepresentationFrm.errors).forEach(([, message]) => toast.error(message));
    }, [visualRepresentationFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar Representación Visual"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!visualRepresentationFrm.errors.nombre}
                    helperText={
                        visualRepresentationFrm.errors.nombre || `${visualRepresentationFrm.values.nombre.length} / 255`
                    }
                    value={visualRepresentationFrm.values.nombre}
                    onChange={({target}) => visualRepresentationFrm.setFieldValue("nombre", target.value)}
                />

                <Button variant="text" onClick={() => visualRepresentationFrm.handleSubmit()}>
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
