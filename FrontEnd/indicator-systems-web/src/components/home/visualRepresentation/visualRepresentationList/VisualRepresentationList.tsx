import {CSSProperties, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import VisualRepresentationListMenu from "./VisualRepresentationListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {
    visualRepresentationListSlice,
    VisualRepresentationListStateModel
} from "./_redux/visualRepresentationListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {
    VisualRepresentationNewStateModel,
    visualRepresentationNewSlice
} from '../visualRepresentationNew/_redux/visualRepresentationNewSlice.tsx';
import {
    VisualRepresentationEditStateModel,
    visualRepresentationEditSlice
} from '../visualRepresentationEdit/_redux/visualRepresentationEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function VisualRepresentationList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        visualRepresentations,
        result
    } = useSelector((s: StoreModel) => s[visualRepresentationListSlice.name]) as VisualRepresentationListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[visualRepresentationNewSlice.name]) as VisualRepresentationNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[visualRepresentationEditSlice.name]) as VisualRepresentationEditStateModel;

    const displayedColumns = [
        {name: 'name', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, visualRepresentationListSlice.actions.deleteSuccess))
            loadVisualRepresentationList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, visualRepresentationNewSlice.actions.saveSuccess))
            loadVisualRepresentationList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, visualRepresentationEditSlice.actions.updateSuccess))
            loadVisualRepresentationList();
    }, [resultEdit]);

    const loadVisualRepresentationList = () => {
        if (isActionOf(result.action, visualRepresentationListSlice.actions.find))
            return;

        dispatch(visualRepresentationListSlice.actions.find())
    };

    useEffect(() => {
        loadVisualRepresentationList()
    }, []);

    return (
        <div style={styles.container}>

            {validNew(roles) && <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nueva Representación Visual
                        </Button>
                    </Link>
                </div>
            </div>}



            <LoadDiv result={result}
                     loading={visualRepresentationListSlice.actions.find}
                     error={visualRepresentationListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={visualRepresentations?.map(visualRepresentation => (
                        <TableRow hover
                                  key={visualRepresentation.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{visualRepresentation.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <VisualRepresentationListMenu
                                visualRepresentation={visualRepresentation}/>}</TableCell>
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
