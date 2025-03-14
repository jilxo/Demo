import {CSSProperties} from "react";
import {Box} from "@mui/material";

interface ContentLateralDialogProps {
    children: any;

    style?: CSSProperties;
}

export default function ContentLateralDialog({
                                                 children,
                                                 style = {},
                                             }: ContentLateralDialogProps) {
    return <Box style={{...styles.dialogContent, ...style}}>{children}</Box>;
}

const styles = {
    dialogContent: {
        display: "flex",
        flexDirection: "column",
    } as CSSProperties,
};
