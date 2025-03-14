import {CSSProperties} from 'react';
import TableUI from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import HeaderCell from "./HeaderCell.tsx";


/**
 * table props
 */
interface TableProps {

    /**
     * displayed columns
     */
    displayedColumns: Array<{ name: string, label: string, sortable?: boolean }>;

    /**
     * rows
     */
    rows: any;

    /**
     * table style
     */
    tableStyle?: CSSProperties;

    /**
     * table style
     */
    rowStyle?: CSSProperties;
    headStyle?: CSSProperties;

}

/**
 * table
 *
 * @description table component
 * @param props<TableProps> table props
 */
export default function Table({
                                  displayedColumns, rows,
                                  tableStyle = {}, rowStyle = {}, headStyle = {}
                              }: TableProps) {

    return (
        <>
            <TableContainer component={Paper} style={{...styles.table, ...tableStyle}}>
                <TableUI sx={{minWidth: 500}}>
                    <HeaderCell displayedColumns={displayedColumns}
                                style={{...rowStyle, ...headStyle}}
                    />
                    <TableBody>{rows}</TableBody>
                </TableUI>
            </TableContainer>
        </>
    );
}

const styles = {
    table: {
        boxShadow: 'none'
    } as CSSProperties
};
