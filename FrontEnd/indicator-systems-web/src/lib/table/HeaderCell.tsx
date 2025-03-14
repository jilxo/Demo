import {CSSProperties} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from '@mui/material/TableCell';
import {TableHead} from "@mui/material";


/**
 * header cell props
 */
interface HeaderCellProps {

    /**
     * displayed columns
     */
    displayedColumns: Array<{ name: string, label: string }>;

    /**
     * style
     */
    style?: CSSProperties;

}

/**
 * header cell
 *
 * @description header cell component
 * @param props<HeaderCellProps> header cell props
 */
export default function HeaderCell({displayedColumns, style = {}}: HeaderCellProps) {

    return (
        <TableHead>
            <TableRow style={style}>
                {displayedColumns.map(({name, label}) => (
                    <TableCell
                        key={name}
                        style={{padding: 16}}
                        padding={name === 'opt' ? 'none' : 'normal'}>
                        {label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
