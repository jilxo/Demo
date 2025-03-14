import {CSSProperties, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actorEditSlice, ActorEditStateModel} from "./_redux/actorEditSlice.tsx";
import {Autocomplete, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";


export default function ActorEdit() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {
        actor,
        types,
        result
    } = useSelector((s: StoreModel) => s[actorEditSlice.name]) as ActorEditStateModel;

    const actorFrm = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            tipo: null,
        },
        validationSchema: yup.object({
            id: yup.string().required("Campo obligatorio"),
            nombre: yup
                .string()
                .required("El nombre es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
        }),
        validateOnChange: false,
        onSubmit: ({id, nombre, tipo}) => {
            dispatch(actorEditSlice.actions.update({id, nombre, fkidtipoactor: tipo?.id}));
        },
    });

    useEffect(() => {
        dispatch(actorEditSlice.actions.findTypes());
        if (id)
            dispatch(actorEditSlice.actions.find(id));
    }, []);

    useEffect(() => () => {
        dispatch(actorEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, actorEditSlice.actions.findSuccess) && actor)
            actorFrm.setValues(actor);
    }, [result]);

    useEffect(() => {
        Object.entries(actorFrm.errors).forEach(([, message]) => toast.error(message));
    }, [actorFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>
            <TitleLateralDialog title="Editar Actor"/>

            <ContentLateralDialog style={styles.content}>
                <TextField
                    id="nombre"
                    label="Nombre *"
                    variant="filled"
                    placeholder="Ingrese el Nombre"
                    error={!!actorFrm.errors.nombre}
                    helperText={actorFrm.errors.nombre || `${actorFrm.values.nombre.length} / 255`}
                    value={actorFrm.values.nombre}
                    onChange={({target}) => actorFrm.setFieldValue("nombre", target.value)}
                />

                <Autocomplete
                    id="tipo"
                    options={types}
                    autoHighlight
                    onChange={(_, newValue) => actorFrm.setFieldValue('tipo', newValue)}
                    getOptionLabel={({nombre}) => nombre}
                    value={actorFrm.values.tipo}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tipo *"
                            inputProps={{...params.inputProps}}
                            error={!!actorFrm.errors.tipo}
                            helperText={actorFrm.errors.tipo}
                        />
                    )}
                />

                <Button
                    variant="text"
                    onClick={() => actorFrm.handleSubmit()}>
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
