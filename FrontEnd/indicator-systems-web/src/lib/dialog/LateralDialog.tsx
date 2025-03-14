import * as React from 'react';
import {CSSProperties} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';

interface LateralDialogProps {
    children: any;
    style?: CSSProperties;
    pathBack?: string;
}

export default function LateralDialog({children, style = {}, pathBack}: LateralDialogProps) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <div style={styles.container} >
            <div style={{...styles.modal}}
                 onClick={() => navigate(pathBack || "..", {relative: "route"})}/>
            <Box style={{...styles.dialog, ...style, backgroundColor: theme.palette.background.paper}}>
                {children}
            </Box>
        </div>
    );
}

const styles = {
    container: {
        position: 'absolute',
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    modal: {
        zIndex: 1202,
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    dialog: {
        maxWidth: "600px",
        width: "90%",
        maxHeight: "90%",
        padding: "16px",
        zIndex: 1203,
        boxShadow: "rgb(0 0 0 / 66%) 0px 25.6px 40px 0px, rgb(0 0 0 / 54%) 0px 4.8px 14.4px 0px",
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px'
    } as CSSProperties
}
