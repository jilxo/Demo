import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FontListMenu from "./FontListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {fontListSlice, FontListStateModel} from "./_redux/fontListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {FontNewStateModel, fontNewSlice} from '../fontNew/_redux/fontNewSlice.tsx';
import {FontEditStateModel, fontEditSlice} from '../fontEdit/_redux/fontEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function FontList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        fuentes,
        result
    } = useSelector((s: StoreModel) => s[fontListSlice.name]) as FontListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[fontNewSlice.name]) as FontNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[fontEditSlice.name]) as FontEditStateModel;

    const displayedColumns = [
        {name: 'name', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, fontListSlice.actions.deleteSuccess))
            loadFontList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, fontNewSlice.actions.saveSuccess))
            loadFontList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, fontEditSlice.actions.updateSuccess))
            loadFontList();
    }, [resultEdit]);

    const loadFontList = () => {
        if (isActionOf(result.action, fontListSlice.actions.find))
            return;

        dispatch(fontListSlice.actions.find())
    };

    useEffect(() => {
        loadFontList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nueva fuente
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={fontListSlice.actions.find}
                     error={fontListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={fuentes?.map(font => (
                        <TableRow hover
                                  key={font.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{font.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <FontListMenu font={font}/>}</TableCell>
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
