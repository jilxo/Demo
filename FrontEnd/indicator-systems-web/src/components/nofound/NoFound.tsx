import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {SxProps} from "@mui/material";


export default function NoFound() {

    return (
        <Box sx={styles.container}>

            <Typography
                gutterBottom
                variant="h5"
                component="div">
                Page no found 404
            </Typography>

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
}
