import {Outlet} from "react-router-dom";
import {ReactComponentElement} from "react";

interface RouterWithDialogProps {

    component: ReactComponentElement<any>;

}

export default function RouterWithDialog({component}: RouterWithDialogProps) {
    return (
        <>
            {component}

            <Outlet/>
        </>
    );
}