import {CSSProperties, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Button, Divider, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import UserListMenu from "./UserListMenu.tsx";
import AddIcon from "@mui/icons-material/Add";
import {userListSlice, UserListStateModel} from "./_redux/userListSlice.tsx";
import LoadDiv from "../../../../lib/loading/LoadDiv.tsx";
import Table from "../../../../lib/table/Table.tsx";
import {isActionOf, StoreModel} from "../../../../redux/store.tsx";
import {UserNewStateModel, userNewSlice} from '../userNew/_redux/userNewSlice.tsx';
import {UserEditStateModel, userEditSlice} from '../userEdit/_redux/userEditSlice.tsx';
import {toast} from "react-toastify";


export default function UserList() {

    const dispatch = useDispatch();

    const {
        usuarios,
        result
    } = useSelector((s: StoreModel) => s[userListSlice.name]) as UserListStateModel;

    const {
        result: resultNew
    } = useSelector((s: StoreModel) => s[userNewSlice.name]) as UserNewStateModel;

    const {
        result: resultEdit
    } = useSelector((s: StoreModel) => s[userEditSlice.name]) as UserEditStateModel;

    const displayedColumns = [
        {name: 'email', label: 'Correo'},
        {name: 'opt', label: ''},
    ];

    useEffect(() => {
        if (result?.messageUser)
            toast[result?.messageInternal ? 'error' : 'success'](result.messageUser);

        if (isActionOf(result.action, userListSlice.actions.deleteSuccess))
            loadUserList();
    }, [result])

    useEffect(() => {
        if (isActionOf(resultNew.action, userNewSlice.actions.saveSuccess))
            loadUserList();
    }, [resultNew]);

    useEffect(() => {
        if (isActionOf(resultEdit.action, userEditSlice.actions.updateSuccess))
            loadUserList();
    }, [resultEdit]);

    const loadUserList = () => {
        if (isActionOf(result.action, userListSlice.actions.find))
            return;

        dispatch(userListSlice.actions.find())
    };

    useEffect(() => loadUserList(), []);

    useEffect(() => () => {
        dispatch(userListSlice.actions.clean());
    }, []);

    return (
        <div style={styles.container}>

            <div style={styles.action}>
                <div style={styles.actionButtons}>
                    <Link component={RouterLink} to="new" style={styles.link}>
                        <Button variant="text"
                                >
                            Nuevo Usuario
                        </Button>
                    </Link>
                </div>
            </div>



            <LoadDiv result={result}
                     loading={userListSlice.actions.find}
                     error={userListSlice.actions.findError}>
                <Table
                    displayedColumns={displayedColumns}
                    rows={usuarios?.map((user, index) => (
                        <TableRow hover
                                  key={index}
                                  style={styles.row}>
                            <TableCell style={styles.cell}><span>{user.email}</span></TableCell>
                            <TableCell style={styles.cell}><UserListMenu user={user}/></TableCell>
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
