import {CSSProperties, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ActorTypeListMenu from "./ActorTypeListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {actorTypeListSlice, ActorTypeListStateModel} from "./_redux/actorTypeListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {ActorTypeNewStateModel, actorTypeNewSlice} from '../actorTypeNew/_redux/actorTypeNewSlice.tsx';
import {ActorTypeEditStateModel, actorTypeEditSlice} from '../actorTypeEdit/_redux/actorTypeEditSlice.tsx';
import {toast} from "react-toastify";
import {homeSlice, HomeStateModel} from "../../_redux/homeSlice.tsx";
import {validEdit, validNew} from "../../../../lib/utils.tsx";


export default function ActorTypeList() {

    const dispatch = useDispatch();

    const {
        roles
    } = useSelector((s: StoreModel) => s[homeSlice.name]) as HomeStateModel;

    const {
        tipoActores,
        result
    } = useSelector((s: StoreModel) => s[actorTypeListSlice.name]) as ActorTypeListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[actorTypeNewSlice.name]) as ActorTypeNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[actorTypeEditSlice.name]) as ActorTypeEditStateModel;

    const displayedColumns = [
        {name: 'nombre', label: 'Nombre'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, actorTypeListSlice.actions.deleteSuccess)) {
            loadActorTypeList();
        }
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, actorTypeNewSlice.actions.saveSuccess))
            loadActorTypeList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, actorTypeEditSlice.actions.updateSuccess))
            loadActorTypeList();
    }, [resultEdit]);

    const loadActorTypeList = () => {
        if (isActionOf(result.action, actorTypeListSlice.actions.find))
            return;

        dispatch(actorTypeListSlice.actions.find())
    };

    useEffect(() => {
        loadActorTypeList()
    }, []);

    useEffect(() => () => {
        dispatch(actorTypeListSlice.actions.clean());
    }, []);

    return (
        <div style={styles.container}>

            <div style={styles.action}>
                {validNew(roles) && <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nuevo tipo de actor
                        </Button>
                    </Link>
                </div>}
            </div>



            <LoadDiv result={result}
                     loading={actorTypeListSlice.actions.find}
                     error={actorTypeListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={tipoActores?.map(actorType => (
                        <TableRow hover
                                  key={actorType.id}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{actorType.nombre}</span></TableCell>
                            <TableCell style={styles.cell}>{validEdit(roles) && <ActorTypeListMenu actorType={actorType}/>}</TableCell>
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
