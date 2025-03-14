import {useEffect, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {ConfirmConfigModel} from "./ConfirmConfigModel.ts";


interface ConfirmDialogProps {
    event: boolean;
    config?: ConfirmConfigModel;
    type?: 'ask' | 'delete';
    onAfterCloseDialog: (response: boolean) => void;
}

export default function ConfirmDialog({event, config, type, onAfterCloseDialog}: ConfirmDialogProps) {

    const [configuration, setConfiguration] = useState<ConfirmConfigModel>();

    useEffect(() => {
        if (event) {
            openDialog();
        }
    }, [event]);

    useEffect(() => {
        switch (type) {
            case "delete":
                setConfiguration({
                    title: 'ELIMINAR',
                    message: '¿Esta Seguro que Desea Eliminar el Registro Seleccionado?',
                    textBtnConfirm: 'Eliminar',
                    iconBtnConfirm: 'remove',
                    colorBtnConfirm: 'warn',
                    textBtnClose: 'Cancelar',
                    iconBtnClose: 'close',
                    colorBtnClose: 'none',
                })
                break;
            case "ask":
                setConfiguration({
                    title: 'ADVERTENCIA',
                    message: '¿Desea Guardar los Cambios Realizados?',
                    textBtnConfirm: 'Si',
                    iconBtnConfirm: 'check',
                    colorBtnConfirm: 'accent',
                    textBtnClose: 'No',
                    iconBtnClose: 'close',
                    colorBtnClose: 'none',
                })
                break;
            default:
                setConfiguration({
                    title: config?.title ? config.title : 'ADVERTENCIA',
                    message: config?.message ? config.message : '¿Esta Seguro Que Desea Realizar Esta Accion?',
                    textBtnConfirm: config?.textBtnConfirm ? config.textBtnConfirm : 'Si',
                    iconBtnConfirm: config?.iconBtnConfirm ? config.iconBtnConfirm : 'check',
                    colorBtnConfirm: config?.colorBtnConfirm ? config.colorBtnConfirm : 'accent',
                    textBtnClose: config?.textBtnClose ? config.textBtnClose : 'No',
                    iconBtnClose: config?.iconBtnClose ? config.iconBtnClose : 'close',
                    colorBtnClose: config?.colorBtnClose ? config.colorBtnClose : 'none',
                })
        }
    }, [])

    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);

    const closeDialog = (response: boolean) => {
        onAfterCloseDialog(response);
        setOpen(false);
    };

    if (!configuration) {
        return (<div></div>);
    }

    return (
        <Dialog open={open}
                onClose={closeDialog}>

            <DialogTitle>{configuration.title}</DialogTitle>

            <DialogContent>

                <DialogContentText>{configuration.message}</DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button onClick={() => closeDialog(true)}>
                    {configuration.textBtnConfirm}
                </Button>

                <Button onClick={() => closeDialog(false)} autoFocus>
                    {configuration.textBtnClose}
                </Button>

            </DialogActions>

        </Dialog>
    );
}
