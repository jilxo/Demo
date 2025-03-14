import React, {useState} from 'react';
import {Button, Menu as MenuUi, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from "react-redux";
import {roleListSlice} from "./_redux/roleListSlice.tsx";
import {RolModel} from "../../../../core/models/RolModel.tsx";
import ConfirmDialog from "../../../../lib/confirm/ConfirmDialog.tsx";
import {validDelete} from "../../../../lib/utils.tsx";


interface RoleListMenuProps {

    role: RolModel;

}

export default function RoleListMenu({role}: RoleListMenuProps) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [menu, setMenu] = React.useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setMenu(event.currentTarget);

    const closeMenu = () => setMenu(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const afterCloseDialog = (response: boolean) => {
        if (response) {
            dispatch(roleListSlice.actions.delete(role.id));
            closeMenu();
        }

        setOpenDialog(false);
    };

    const goToEdit = () => {
        navigate(`${role.id}/edit`, {relative: "route"});
        closeMenu();
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button variant="text"
                    onClick={goToEdit}>
                Editar
            </Button>

            <Button variant="text"
                    color="warning"
                    onClick={() => setOpenDialog(true)}>
                Eliminar
            </Button>

            <ConfirmDialog
                event={openDialog}
                type={'delete'}
                onAfterCloseDialog={afterCloseDialog}/>
        </div>
    );
}
