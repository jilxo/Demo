import {Outlet, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {StoreModel} from "../../redux/store.tsx";
import {useEffect} from "react";
import {homeSlice, HomeStateModel} from "./_redux/homeSlice.tsx";
import AppBar from "@mui/material/AppBar";
import Menu from "./Menu.tsx";

export default function Home() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        user,
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    useEffect(() => {
        if (user) {
            dispatch(homeSlice.actions.findRoles(user.email));
        } else {
            navigate(`/signin`, {relative: "route"});
        }
    }, [])

    useEffect(() => {
        if (!user)
            navigate(`/signin`, {relative: "route"});
    }, [user])

    return (
        <Box sx={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <CssBaseline/>
            <AppBar position="static" style={{'height': '70px'}}>
                <Toolbar>
                    <img src=""
                    style={{height: '60px', width: 'auto'}}/>

                    <Typography variant="h6" noWrap component="div">
                        Sistema de indicadores
                    </Typography>

                    <Menu />
                </Toolbar>
            </AppBar>
            <Box component="main" style={{'width': 'calc(100% - 70px)'}}
                 sx={{flexGrow: 1, p: 3}}>
                <Outlet/>
            </Box>
        </Box>
    );

}
