import {CSSProperties, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link, TextField} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IndicadorListMenu from "./IndicadorListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {indicadorListSlice, IndicadorListStateModel} from "./_redux/indicadorListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {IndicadorNewStateModel, indicadorNewSlice} from '../indicadorNew/_redux/indicadorNewSlice.tsx';
import {IndicadorEditStateModel, indicadorEditSlice} from '../indicadorEdit/_redux/indicadorEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validNew, validRead} from "../../../../lib/utils.tsx";


export default function IndicadorList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        indicadores,
        result
    } = useSelector((s: StoreModel) => s[indicadorListSlice.name]) as IndicadorListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[indicadorNewSlice.name]) as IndicadorNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[indicadorEditSlice.name]) as IndicadorEditStateModel;

    const displayedColumns = [
        {name: 'codigo', label: 'Codigo'},
        {name: 'nomber', label: 'Nombre'},
        {name: 'objetivo', label: 'Objetivo'},
        {name: 'alcance', label: 'Alcance'},
        {name: 'formula', label: 'Formula'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, indicadorListSlice.actions.deleteSuccess))
            loadIndicadorList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, indicadorNewSlice.actions.saveSuccess))
            loadIndicadorList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, indicadorEditSlice.actions.updateSuccess))
            loadIndicadorList();
    }, [resultEdit]);

    const loadIndicadorList = () => {
        if (isActionOf(result.action, indicadorListSlice.actions.find))
            return;

        dispatch(indicadorListSlice.actions.find())
    };

    useEffect(() => {
        loadIndicadorList()
    }, []);

    const handlerFilter = () => {
        dispatch(indicadorListSlice.actions.find())
    };

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nueva indicador
                        </Button>
                    </Link>
                </div>
            </div>}

            <LoadDiv result={result}
                     loading={indicadorListSlice.actions.find}
                     error={indicadorListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={indicadores?.map(indicador => (
                        <TableRow hover
                                  key={indicador.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{indicador.codigo}</span></TableCell>
                            <TableCell style={styles.cell}><span>{indicador.nombre}</span></TableCell>
                            <TableCell style={styles.cell}><span>{indicador.objetivo}</span></TableCell>
                            <TableCell style={styles.cell}><span>{indicador.alcance}</span></TableCell>
                            <TableCell style={styles.cell}><span>{indicador.formula}</span></TableCell>
                            <TableCell style={styles.cell}>{validRead(roles) && <IndicadorListMenu indicador={indicador}/>}</TableCell>
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
        gridTemplateColumns: '10% 10% auto 20% 15% 160px',
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
        gridTemplateColumns: '10% 10% auto 20% 15% 160px',
        alignItems: 'stretch',
    }
};
