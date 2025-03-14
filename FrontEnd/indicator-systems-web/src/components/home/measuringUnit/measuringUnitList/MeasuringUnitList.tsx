import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MeasuringUnitListMenu from "./MeasuringUnitListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {measuringUnitListSlice, MeasuringUnitListStateModel} from "./_redux/measuringUnitListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import { MeasuringUnitNewStateModel, measuringUnitNewSlice } from '../measuringUnitNew/_redux/measuringUnitNewSlice.tsx';
import { MeasuringUnitEditStateModel, measuringUnitEditSlice } from '../measuringUnitEdit/_redux/measuringUnitEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function MeasuringUnitList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        measuringUnits,
        result
    } = useSelector((s: StoreModel) => s[measuringUnitListSlice.name]) as MeasuringUnitListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[measuringUnitNewSlice.name]) as MeasuringUnitNewStateModel;
    
    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[measuringUnitEditSlice.name]) as MeasuringUnitEditStateModel;

    const displayedColumns = [
        {name: 'name', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, measuringUnitListSlice.actions.deleteSuccess))
            loadMeasuringUnitList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, measuringUnitNewSlice.actions.saveSuccess))
            loadMeasuringUnitList();
    }, [resultNew]);
    
    useEffect(() => {
        if (isActionOf(resultEdit.action, measuringUnitEditSlice.actions.updateSuccess))
            loadMeasuringUnitList();
    }, [resultEdit]);

    const loadMeasuringUnitList = () => {
        if (isActionOf(result.action, measuringUnitListSlice.actions.find))
            return;

        dispatch(measuringUnitListSlice.actions.find())
    };

    useEffect(() => {
        loadMeasuringUnitList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nueva unidad de medida
                        </Button>
                    </Link>
                </div>
            </div>}

            <Divider style={styles.divider} variant="inset" />

            <LoadDiv result={result}
                     loading={measuringUnitListSlice.actions.find}
                     error={measuringUnitListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={measuringUnits?.map(measuringUnit => (
                        <TableRow hover
                                  key={measuringUnit.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{measuringUnit.descripcion}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <MeasuringUnitListMenu measuringUnit={measuringUnit}/>}</TableCell>
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
