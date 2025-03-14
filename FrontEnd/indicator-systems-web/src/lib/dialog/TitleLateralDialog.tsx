import React, {CSSProperties} from "react";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface TitleLateralDialogProps {
    title: string;
    pathBack?: string;
}

export default function TitleLateralDialog({title, pathBack}: TitleLateralDialogProps) {

    /**
     * navigate
     */
    const navigate = useNavigate();

    return (
        <Box style={styles.dialogTitle}>
            <Box component="h2">{title}</Box>

            <IconButton aria-label="close" onClick={() => navigate(pathBack || "..", {relative: "route"})}>
                <CloseIcon fontSize="inherit"/>
            </IconButton>
        </Box>
    );
}

const styles = {
    dialogTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        placeContent: "center space-between",
        marginBottom: "20px",
    } as CSSProperties,
};
