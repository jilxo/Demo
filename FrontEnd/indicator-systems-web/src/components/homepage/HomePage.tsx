import HomeHeader from "./HomeHeader.tsx";
import Box from '@mui/material/Box';
import {SxProps} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import HomeFooter from "./HomeFooter.tsx";
import {useEffect} from "react";


export default function HomePage() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/signin`, {relative: "route"});
    }, [])

    return (
        <Box sx={styles.container}>

            <HomeHeader/>

            <Outlet/>

            <HomeFooter/>

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
        gap: '10px',
    } as SxProps,
}
