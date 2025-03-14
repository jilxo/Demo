import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SenseListMenu from "./SenseListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {senseListSlice, SenseListStateModel} from "./_redux/senseListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {SenseNewStateModel, senseNewSlice} from '../senseNew/_redux/senseNewSlice.tsx';
import {SenseEditStateModel, senseEditSlice} from '../senseEdit/_redux/senseEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function SenseList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        senses,
        result
    } = useSelector((s: StoreModel) => s[senseListSlice.name]) as SenseListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[senseNewSlice.name]) as SenseNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[senseEditSlice.name]) as SenseEditStateModel;

    const displayedColumns = [
        {name: 'name', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, senseListSlice.actions.deleteSuccess))
            loadSenseList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, senseNewSlice.actions.saveSuccess))
            loadSenseList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, senseEditSlice.actions.updateSuccess))
            loadSenseList();
    }, [resultEdit]);

    const loadSenseList = () => {
        if (isActionOf(result.action, senseListSlice.actions.find))
            return;

        dispatch(senseListSlice.actions.find())
    };

    useEffect(() => {
        loadSenseList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nuevo Sentido
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={senseListSlice.actions.find}
                     error={senseListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={senses?.map(sense => (
                        <TableRow hover
                                  key={sense.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{sense.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <SenseListMenu sense={sense}/>}</TableCell>
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
