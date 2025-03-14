import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IndicatorTypeListMenu from "./IndicatorTypeListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {indicatorTypeListSlice, IndicatorTypeListStateModel} from "./_redux/indicatorTypeListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {TipoIndicadorNewStateModel, indicatorTypeNewSlice} from '../indicatorTypeNew/_redux/indicatorTypeNewSlice.tsx';
import {
    IndicatorTypeEditStateModel,
    indicatorTypeEditSlice
} from '../indicatorTypeEdit/_redux/indicatorTypeEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function IndicatorTypeList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        tipoIndicadores,
        result
    } = useSelector((s: StoreModel) => s[indicatorTypeListSlice.name]) as IndicatorTypeListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[indicatorTypeNewSlice.name]) as TipoIndicadorNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[indicatorTypeEditSlice.name]) as IndicatorTypeEditStateModel;

    const displayedColumns = [
        {name: 'name', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, indicatorTypeListSlice.actions.deleteSuccess))
            loadIndicatorTypeList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, indicatorTypeNewSlice.actions.saveSuccess))
            loadIndicatorTypeList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, indicatorTypeEditSlice.actions.updateSuccess))
            loadIndicatorTypeList();
    }, [resultEdit]);

    const loadIndicatorTypeList = () => {
        if (isActionOf(result.action, indicatorTypeListSlice.actions.find))
            return;

        dispatch(indicatorTypeListSlice.actions.find())
    };

    useEffect(() => {
        loadIndicatorTypeList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nuevo Tipo de Indicador
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={indicatorTypeListSlice.actions.find}
                     error={indicatorTypeListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={tipoIndicadores?.map(indicatorType => (
                        <TableRow hover
                                  key={indicatorType.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{indicatorType.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <IndicatorTypeListMenu indicatorType={indicatorType}/>}</TableCell>
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
