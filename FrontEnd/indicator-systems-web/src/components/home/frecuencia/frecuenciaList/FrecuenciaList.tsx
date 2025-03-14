import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FrecuenciaListMenu from "./FrecuenciaListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {frecuenciaListSlice, FrecuenciaListStateModel} from "./_redux/frecuenciaListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {FrecuenciaNewStateModel, frecuenciaNewSlice} from '../frecuenciaNew/_redux/frecuenciaNewSlice.tsx';
import {FrecuenciaEditStateModel, frecuenciaEditSlice} from '../frecuenciaEdit/_redux/frecuenciaEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function FrecuenciaList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        frecuencias,
        result
    } = useSelector((s: StoreModel) => s[frecuenciaListSlice.name]) as FrecuenciaListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[frecuenciaNewSlice.name]) as FrecuenciaNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[frecuenciaEditSlice.name]) as FrecuenciaEditStateModel;

    const displayedColumns = [
        {name: 'name', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, frecuenciaListSlice.actions.deleteSuccess))
            loadFrecuenciaList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, frecuenciaNewSlice.actions.saveSuccess))
            loadFrecuenciaList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, frecuenciaEditSlice.actions.updateSuccess))
            loadFrecuenciaList();
    }, [resultEdit]);

    const loadFrecuenciaList = () => {
        if (isActionOf(result.action, frecuenciaListSlice.actions.find))
            return;

        dispatch(frecuenciaListSlice.actions.find())
    };

    useEffect(() => {
        loadFrecuenciaList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nueva frecuencia
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={frecuenciaListSlice.actions.find}
                     error={frecuenciaListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={frecuencias?.map(frecuencia => (
                        <TableRow hover
                                  key={frecuencia.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{frecuencia.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <FrecuenciaListMenu frecuencia={frecuencia}/>}</TableCell>
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
        gridTemplateColumns: 'auto 160px',
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
        gridTemplateColumns: 'auto 160px',
        alignItems: 'stretch',
    }
};
