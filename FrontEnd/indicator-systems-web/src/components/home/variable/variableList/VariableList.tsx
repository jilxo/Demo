import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import VariableListMenu from "./VariableListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {variableListSlice, VariableListStateModel} from "./_redux/variableListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {VariableNewStateModel, variableNewSlice} from '../variableNew/_redux/variableNewSlice.tsx';
import {VariableEditStateModel, variableEditSlice} from '../variableEdit/_redux/variableEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function VariableList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        variables,
        result
    } = useSelector((s: StoreModel) => s[variableListSlice.name]) as VariableListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[variableNewSlice.name]) as VariableNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[variableEditSlice.name]) as VariableEditStateModel;

    const displayedColumns = [
        {name: 'nombre', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, variableListSlice.actions.deleteSuccess))
            loadVariableList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, variableNewSlice.actions.saveSuccess))
            loadVariableList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, variableEditSlice.actions.updateSuccess))
            loadVariableList();
    }, [resultEdit]);

    const loadVariableList = () => {
        if (isActionOf(result.action, variableListSlice.actions.find))
            return;

        dispatch(variableListSlice.actions.find())
    };

    useEffect(() => {
        loadVariableList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nueva Variable
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={variableListSlice.actions.find}
                     error={variableListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={variables?.map(variable => (
                        <TableRow hover
                                  key={variable.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{variable.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <VariableListMenu variable={variable}/>}</TableCell>
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
