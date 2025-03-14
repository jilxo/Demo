import React, {useEffect, useState} from 'react';
import {Button, Menu as MenuUi, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from "react-redux";
import {actorTypeListSlice} from "./_redux/actorTypeListSlice.tsx";
import {TipoActorModel} from "../../../../core/models/TipoActorModel.tsx";
import ConfirmDialog from "../../../../lib/confirm/ConfirmDialog.tsx";
import {StoreModel} from "../../../../redux/store.tsx";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validDelete} from "../../../../lib/utils.tsx";


interface ActorTypeListMenuProps {

    actorType: TipoActorModel;

}

export default function ActorTypeListMenu({actorType}: ActorTypeListMenuProps) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    useEffect(() => {
    }, []);

    const [menu, setMenu] = React.useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setMenu(event.currentTarget);

    const closeMenu = () => setMenu(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const afterCloseDialog = (response: boolean) => {
        if (response) {
            dispatch(actorTypeListSlice.actions.delete(actorType.id));
            closeMenu();
        }

        setOpenDialog(false);
    };

    const goToEdit = () => {
        navigate(`${actorType.id}/edit`, {relative: "route"});
        closeMenu();
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button variant="text"
                    onClick={goToEdit}>
                Editar
            </Button>

            {validDelete(roles) && <Button variant="text"
                                           color="warning"
                                           onClick={() => setOpenDialog(true)}>
                Eliminar
            </Button>}

            <ConfirmDialog
                event={openDialog}
                type={'delete'}
                onAfterCloseDialog={afterCloseDialog}/>
        </div>
    );
}
