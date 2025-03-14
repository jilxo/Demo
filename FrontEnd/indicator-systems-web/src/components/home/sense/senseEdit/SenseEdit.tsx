import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {senseEditSlice, SenseEditStateModel} from "./_redux/senseEditSlice.tsx";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {SentidoModel} from "../../../../core/models/SentidoModel.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";


export default function SenseEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        sense,
        result
    } = useSelector((s: StoreModel) => s[senseEditSlice.name]) as SenseEditStateModel;

    const senseFrm = useFormik({
        initialValues: {
            id: 0,
            nombre: "",
        } as SentidoModel,
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: (senseModel) => {
            dispatch(senseEditSlice.actions.update(senseModel));
        },
    });

    useEffect(() => {
        if (id) {
            dispatch(senseEditSlice.actions.find(id));
        }
    }, []);

    useEffect(() => () => {
        dispatch(senseEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, senseEditSlice.actions.findSuccess) && sense)
            senseFrm.setValues(sense);
    }, [result]);

    useEffect(() => {
        Object.entries(senseFrm.errors).forEach(([, message]) => toast.error(message));
    }, [senseFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar Sentido"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!senseFrm.errors.nombre}
                    helperText={
                        senseFrm.errors.nombre || `${senseFrm.values.nombre.length} / 255`
                    }
                    value={senseFrm.values.nombre}
                    onChange={({target}) => senseFrm.setFieldValue("nombre", target.value)}
                />

                <Button variant="text" onClick={() => senseFrm.handleSubmit()}>
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
