import Box from '@mui/material/Box';
import {Card, CardActions, CardContent, SxProps, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {UsuarioModel} from "../../core/models/UsuarioModel.tsx";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {isActionOf} from "../../redux/store.tsx";
import {signInSlice, SignInStateModel} from "./_redux/signInSlice.tsx";
import {toast} from "react-toastify";
import {homeSlice} from "../home/_redux/homeSlice.tsx";


export default function SignIn() {

    const dispatch = useDispatch();

    const {
        user,
        result
    } = useSelector(({signIn}) => signIn) as SignInStateModel;

    /**
     * navigate
     */
    const navigate = useNavigate();

    /**
     * user
     */
    const userFrm = useFormik({
        initialValues: {
            email: '',
            contrasena: ''
        } as UsuarioModel,
        validationSchema: yup.object({
            email: yup.string()
                .required('El Correo es un campo obligatorio')
                .max(255, 'El Correo permite maximo 255 caracteres'),
            contrasena: yup.string()
                .required('La contraseña es un campo obligatorio')
                .max(255, 'La contraseña permite maximo 255 caracteres')
        }),
        validateOnChange: false,
        onSubmit: userModel => {
            dispatch(signInSlice.actions.auth(userModel))
        }
    });

    useEffect(() => {
        dispatch(signInSlice.actions.clean());
    }, [])

    useEffect(() => () => {
        dispatch(signInSlice.actions.clean());
    }, [])

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, signInSlice.actions.authSuccess)) {
            dispatch(homeSlice.actions.setUser(user));
            setTimeout(() => navigate(`/app`, {relative: "route"}), 500);
        }
    }, [result])

    useEffect(() => {
        Object.entries(userFrm.errors)
            .forEach(([, message]) => toast.error(message));
    }, [userFrm.errors])

    return (
        <Box sx={styles.container}>

            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div">
                        Inicio de Sesion
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary">
                        Inicio de sesión exclusivo para usuarios del sistema.
                    </Typography>

                    <TextField id="email"
                               type="email"
                               label="Correo *"
                               variant="filled"
                               placeholder="Ingrese el Correo"
                               error={!!userFrm.errors.email}
                               helperText={' '}
                               value={userFrm.values.email}
                               onChange={({target}) => userFrm.setFieldValue('email', target.value)}/>

                    <TextField id="contrasena"
                               type="password"
                               label="Contraseña *"
                               variant="filled"
                               placeholder="Ingrese la Contraseña"
                               error={!!userFrm.errors.contrasena}
                               helperText={' '}
                               value={userFrm.values.contrasena}
                               onChange={({target}) => userFrm.setFieldValue('contrasena', target.value)}/>

                </CardContent>
                <CardActions sx={styles.cardContent}>

                    <Button variant="text"
                            onClick={() => userFrm.handleSubmit()}>
                        Iniciar Sesion
                    </Button>

                </CardActions>
            </Card>

        </Box>
    )

}

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
        boxSizing: 'border-box',
        display: 'flex',
        placeContent: 'center',
        alignItems: 'center',
    } as SxProps,
    card: {
        width: '400px',
    } as SxProps,
    cardContent: {
        flexDirection: 'column',
        boxSizing: 'border-box',
        display: 'flex',
    } as SxProps,
}
