import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StoreModel} from "../../redux/store.tsx";
import {useEffect} from "react";
import {homeSlice, HomeStateModel} from "./_redux/homeSlice.tsx";
import {Button, MenuItem} from "@mui/material";
import MenuUI from '@mui/material/Menu';
import Typography from "@mui/material/Typography";


let menus = [];

const getMenus = (roles) => {
    if (!roles || roles?.length < 1)
        return [];

    if (roles.includes('admin'))
        return [{
            title: 'Inicio',
            url: '',
        }, {
            title: 'Indicadores',
            url: 'indicator',
        }, {
            title: 'Roles',
            url: 'role',
        }, {
            title: 'Usuarios',
            url: 'user',
        }, {
            title: 'Tipos de Actores',
            url: 'actorType',
        }, {
            title: 'Actores',
            url: 'actor',
        }, {
            title: 'Fuentes',
            url: 'font',
        }, {
            title: 'Frecuencia',
            url: 'frecuence',
        }, {
            title: 'Tipos de Indicadores',
            url: 'indicatorType',
        }, {
            title: 'Unidades de Medidas',
            url: 'measuringUnit',
        }, {
            title: 'Sentidos',
            url: 'sense',
        }, {
            title: 'Representaciones Visuales',
            url: 'visualRepresentation',
        }, {
            title: 'Variables',
            url: 'variable',
        }];

    if (roles.includes('Verificador') || roles.includes('Validador'))
        return [{
            title: 'Inicio',
            url: '',
        }, {
            title: 'Indicadores',
            url: 'indicator',
        },
            {
                title: 'Tipos de Actores',
                url: 'actorType',
            }, {
                title: 'Actores',
                url: 'actor',
            }, {
                title: 'Fuentes',
                url: 'font',
            }, {
                title: 'Frecuencia',
                url: 'frecuence',
            }, {
                title: 'Tipos de Indicadores',
                url: 'indicatorType',
            }, {
                title: 'Unidades de Medidas',
                url: 'measuringUnit',
            }, {
                title: 'Sentidos',
                url: 'sense',
            }, {
                title: 'Representaciones Visuales',
                url: 'visualRepresentation',
            }, {
                title: 'Variables',
                url: 'variable',
            }
        ];

    return [];
}

export default function Menu() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        user,
        roles,
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    useEffect(() => {
        menus = getMenus(roles);
    }, [roles])

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(homeSlice.actions.clean());
    };

    return (
        <>
            <Typography variant="h6" noWrap component="div"
                        style={{cursor: 'pointer', marginLeft: '20px'}}
                        onClick={handleClick}>
                Menu
            </Typography>

            <MenuUI
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menus.map((menu) => (
                    <Link to={menu.url} style={{textDecoration: 'none', color: 'black'}}>
                        <MenuItem onClick={handleClose}>{menu.title}</MenuItem>
                    </Link>
                ))}
                <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
            </MenuUI>
        </>
    );

}
