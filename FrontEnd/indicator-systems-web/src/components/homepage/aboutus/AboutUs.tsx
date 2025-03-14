import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {SxProps} from "@mui/material";


export default function AboutUs() {

    const [company] = useState<{title: string, description: string}>({
        title: 'Company',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    });

    return (
        <Box sx={styles.container}>

            <Typography
                variant="h6"
                component="a"
            >
                {company.title}
            </Typography>

            <Typography
                variant="h6"
                component="a"
            >
                {company.description}
            </Typography>

        </Box>
    );

}

const styles = {
    container: {
        flexDirection: 'column',
        boxSizing: 'border-box',
        display: 'flex',
        gap: '10px',
    } as SxProps,
}
