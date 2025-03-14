import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ActorListMenu from "./ActorListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {actorListSlice, ActorListStateModel} from "./_redux/actorListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {ActorNewStateModel, actorNewSlice} from '../actorNew/_redux/actorNewSlice.tsx';
import {ActorEditStateModel, actorEditSlice} from '../actorEdit/_redux/actorEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function ActorList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        actores,
        result
    } = useSelector((s: StoreModel) => s[actorListSlice.name]) as ActorListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[actorNewSlice.name]) as ActorNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[actorEditSlice.name]) as ActorEditStateModel;

    const displayedColumns = [
        {name: 'nombre', label: 'Nombre'},
        {name: 'fkidtipoactor', label: 'Tipo'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, actorListSlice.actions.deleteSuccess))
            loadActorList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, actorNewSlice.actions.saveSuccess))
            loadActorList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, actorEditSlice.actions.updateSuccess))
            loadActorList();
    }, [resultEdit]);

    const loadActorList = () => {
        if (isActionOf(result.action, actorListSlice.actions.find))
            return;

        dispatch(actorListSlice.actions.find())
    };

    useEffect(() => {
        loadActorList()
    }, []);

    useEffect(() => () => {
        dispatch(actorListSlice.actions.clean());
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nuevo Actor
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={actorListSlice.actions.find}
                     error={actorListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={actores?.map(actor => (
                        <TableRow hover
                                  key={actor.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{actor.nombre}</span></TableCell>
                            <TableCell style={styles.cell}><span>{actor.tipo.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <ActorListMenu actor={actor}/>}</TableCell>
                        </TableRow>
                    ))}
                    rowStyle={styles.row}
                    headStyle={styles.tableHead}/>
            </LoadDiv>
        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: 'auto auto',
    } as CSSProperties,
    action: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        margin: '10px 0 0',
        placeContent: 'center space-between',
        alignItems: 'center'
    } as CSSProperties,
    divider: {
        margin: '0 0 55px 0'
    } as CSSProperties,
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    } as CSSProperties,
    link: {
        textDecoration: 'none'
    } as CSSProperties,
    row: {
        display: 'grid',
        gridTemplateColumns: 'auto 50% 160px',
        alignItems: 'stretch',
    } as CSSProperties,
    cell: {
        display: 'grid',
        alignContent: 'center',
        padding: '4px 16px',
    } as CSSProperties,
    tableHead: {
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'auto 50% 160px',
        alignItems: 'stretch',
    }
};
