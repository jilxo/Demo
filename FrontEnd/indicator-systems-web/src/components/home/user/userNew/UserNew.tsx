import {CSSProperties, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userNewSlice, UserNewStateModel} from "./_redux/userNewSlice.tsx";
import {Autocomplete, Button, Chip, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {isActionOf, StoreModel} from '../../../../redux/store.tsx';
import LateralDialog from '../../../../lib/dialog/LateralDialog.tsx';
import TitleLateralDialog from '../../../../lib/dialog/TitleLateralDialog.tsx';
import ContentLateralDialog from '../../../../lib/dialog/ContentLateralDialog.tsx';
import Box from "@mui/material/Box";
import {toast} from "react-toastify";
import {UsuarioModel} from "../../../../core/models/UsuarioModel.tsx";
import {RolModel} from "../../../../core/models/RolModel.tsx";


export default function UserNew() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        usuario,
        rolIds,
        roles,
        result
    } = useSelector((s: StoreModel) => s[userNewSlice.name]) as UserNewStateModel;

    const userFrm = useFormik({
        initialValues: {
            email: '',
            contrasena: '',
            roles: [],
        },
        validationSchema: yup.object({
            email: yup.string()
                .required('El correo es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres'),
            contrasena: yup.string()
                .required('La contraseña es un campo obligatorio')
                .max(255, 'El nombre permite maximo 255 caracteres'),
            roles: yup.mixed()
                .required('El rol es un campo obligatorio')
        }),
        validateOnChange: false,
        onSubmit: ({email, contrasena}) => {
            dispatch(userNewSlice.actions.save({email, contrasena} as UsuarioModel));
        }
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
        dispatch(userNewSlice.actions.findRoles());
    }, [])

    useEffect(() => () => {
        dispatch(userNewSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, userNewSlice.actions.saveSuccess)) {
            if (userFrm.values.roles.length > 0) {
                userFrm.values.roles.forEach(({id}) => dispatch(userNewSlice.actions.saveRol({
                    email: usuario?.email,
                    rolId: id
                })));
            } else {
                navigate(`../${usuario?.email}/edit`, {relative: "route"});
            }
        }

        if (isActionOf(result.action, userNewSlice.actions.saveRolSuccess) && userFrm.values.roles.length === rolIds.length)
            navigate(`../${usuario?.email}/edit`, {relative: "route"});
    }, [result])

    useEffect(() => {
        Object.entries(userFrm.errors).forEach(([, message]) => toast.error(message));
    }, [userFrm.errors])

    return (
        <LateralDialog style={{width: "600px"}}>

            <TitleLateralDialog title="Nuevo Usuario"/>

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
                    onChange={({target}) => userFrm.setFieldValue('email', target.value)}/>

                <TextField
                    id="contrasena"
                    type="password"
                    label="Contraseña *"
                    variant="filled"
                    placeholder="Ingrese la Contraseña"
                    error={!!userFrm.errors.contrasena}
                    helperText={userFrm.errors.contrasena || `${userFrm.values.contrasena.length} / 255`}
                    value={userFrm.values.contrasena}
                    onChange={({target}) => userFrm.setFieldValue('contrasena', target.value)}/>

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

                <Button
                    variant="text"
                    onClick={() => userFrm.handleSubmit()}>
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
    chips: {
        gap: '10px'
    } as CSSProperties,
}
