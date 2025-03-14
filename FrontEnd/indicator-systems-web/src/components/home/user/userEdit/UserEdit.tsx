import {CSSProperties, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userEditSlice, UserEditStateModel} from "./_redux/userEditSlice.tsx";
import {Autocomplete, Button, Chip, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import LateralDialog from "../../../../lib/dialog/LateralDialog.tsx";
import TitleLateralDialog from "../../../../lib/dialog/TitleLateralDialog.tsx";
import ContentLateralDialog from "../../../../lib/dialog/ContentLateralDialog.tsx";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";
import {RolModel} from "../../../../core/models/RolModel.tsx";


export default function UserEdit() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {id} = useParams();

    const {
        usuario,
        usuarioRoles,
        roles,
        result
    } = useSelector((s: StoreModel) => s[userEditSlice.name]) as UserEditStateModel;

    const userFrm = useFormik({
        initialValues: {
            email: "",
            contrasena: "",
            roles: [],
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required("El correo es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
            contrasena: yup
                .string()
                .required("La contraseña es un campo obligatorio")
                .max(255, "El nombre permite maximo 255 caracteres"),
            roles: yup.mixed()
                .required('El rol es un campo obligatorio')
        }),
        validateOnChange: false,
        onSubmit: ({email, contrasena}) => {
            dispatch(userEditSlice.actions.delete(id));
        },
    });

    const handleAddItem = (rol: RolModel | null) => {
        if (!rol) return;

        userFrm.setFieldValue('roles', [...userFrm.values.roles, rol]);
    }

    const handleDeleteItem = (i: number) => {
        userFrm.setFieldValue(
            'roles',
            (userFrm.values.roles as Array<RolModel>).filter(({id}) => id !== i)
        );
    }

    useEffect(() => {
        if (id) {
            dispatch(userEditSlice.actions.find(id));
            dispatch(userEditSlice.actions.findUserRoles(id));
            dispatch(userEditSlice.actions.findRoles());
        }
    }, []);

    useEffect(() => () => {
        dispatch(userEditSlice.actions.clean());
    }, []);

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, userEditSlice.actions.findSuccess) && usuario) {
            userFrm.setFieldValue('email', usuario.email);
            userFrm.setFieldValue('contrasena', usuario.contrasena);
        }

        if (isActionOf(result.action, userEditSlice.actions.findUserRolesSuccess) && usuarioRoles) {
            userFrm.setFieldValue('roles', structuredClone(usuarioRoles));
            dispatch(userEditSlice.actions.cleanUserRoles());
        }

        if (isActionOf(result.action, userEditSlice.actions.deleteSuccess)) {
            dispatch(userEditSlice.actions.update({
                email: userFrm.values?.email,
                contrasena: userFrm.values?.contrasena
            }));
        }

        if (isActionOf(result.action, userEditSlice.actions.updateSuccess)) {
            if (userFrm.values.roles.length > 0) {
                userFrm.values.roles.forEach(({id}) => dispatch(userEditSlice.actions.saveRol({
                    email: userFrm.values?.email,
                    rolId: id
                })));
            } else {
                navigate(`../../${userFrm.values?.email}/edit`, {relative: "route"});
            }
        }

        if (isActionOf(result.action, userEditSlice.actions.saveRolSuccess) && userFrm.values.roles.length === usuarioRoles.length)
            navigate(`../../${userFrm.values?.email}/edit`, {relative: "route"});
    }, [result]);

    useEffect(() => {
        Object.entries(userFrm.errors).forEach(([, message]) => toast.error(message));
    }, [userFrm.errors]);

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Editar Usuario"/>

            <ContentLateralDialog style={styles.content}>

                <TextField
                    id="email"
                    type="email"
                    label="Correo *"
                    variant="filled"
                    placeholder="Ingrese el Correo"
                    error={!!userFrm.errors.email}
                    helperText={userFrm.errors.email || `${userFrm.values.email.length} / 255`}
                    value={userFrm.values.email}
                    onChange={({target}) => userFrm.setFieldValue("email", target.value)}
                />

                <TextField
                    id="contrasena"
                    type="password"
                    label="Contraseña *"
                    variant="filled"
                    placeholder="Ingrese la Contraseña"
                    error={!!userFrm.errors.contrasena}
                    helperText={userFrm.errors.contrasena || `${userFrm.values.contrasena.length} / 255`}
                    value={userFrm.values.contrasena}
                    onChange={({target}) => userFrm.setFieldValue("contrasena", target.value)}
                />

                <Autocomplete
                    id="roles"
                    options={roles}
                    autoHighlight
                    onChange={(_, newValue) => handleAddItem(newValue)}
                    getOptionLabel={({nombre}) => nombre}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.nombre}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Roles *"
                            inputProps={{...params.inputProps}}
                            error={!!userFrm.errors.roles}
                            helperText={userFrm.errors.roles}
                        />
                    )}
                />

                <Box
                    style={styles.chips}>
                    {userFrm.values.roles.map(({id, nombre}) => (
                        <Chip label={nombre}
                              onDelete={() => handleDeleteItem(id)}/>
                    ))}
                </Box>

                <Button variant="text" onClick={() => userFrm.handleSubmit()}>
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
    chips: {
        gap: '10px'
    } as CSSProperties,
};
