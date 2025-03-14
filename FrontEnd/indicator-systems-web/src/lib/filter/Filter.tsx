import {CSSProperties, useState} from 'react';
import {FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {PaginationModel} from "../../core/models/base/PaginationModel.tsx";


/**
 * pagination props
 */
interface FilterProps {

  /**
   * page
   */
  pagination: PaginationModel;

  /**
   * load
   *
   * @param pagination
   */
  load: (pagination: PaginationModel) => void;

  /**
   *
   */
  options: Array<{ value: any, label: string }>

}

/**
 * pagination
 *
 * @description this component is used to show the pagination
 * @param props<PaginationProps> props
 */
export default function Filter({pagination, load, options}: FilterProps) {

  const [search, setSearch] = useState<string>('')

  const changeSearch = () => {
    const paginationModel = new PaginationModel();
    paginationModel.query = search || (pagination.query || '*');
    paginationModel.page = pagination.page
    paginationModel.size = pagination.size
    paginationModel.sort = pagination.sort
    paginationModel.sortColumn = pagination.sortColumn
    pagination.others.forEach(([key, value]) => paginationModel.addOther(key, value))

    load(paginationModel);
  }

  const changeStatus = (event: SelectChangeEvent) => {
    const paginationModel = new PaginationModel();
    paginationModel.query = search || pagination.query;
    paginationModel.page = pagination.page
    paginationModel.size = pagination.size
    paginationModel.sort = pagination.sort
    paginationModel.sortColumn = pagination.sortColumn
    pagination.others.forEach(([key, value]) => paginationModel.addOther(key, value))
    if (event.target.value) {
      paginationModel.addOther('status', event.target.value);
    }

    load(paginationModel);
  }

  return (
    <div style={styles.actionButtons}>

      <FormControl fullWidth>
        <InputLabel id="statusLabel">Estado</InputLabel>
        <Select labelId="statusLabel"
                onChange={event => changeStatus(event as SelectChangeEvent)}
                autoWidth
                label="Estado">
          {options.map(({value, label}) => (<MenuItem key={value} value={value}>{label}</MenuItem>))}
        </Select>
      </FormControl>

      <TextField id="Search"
                 variant="filled"
                 placeholder="Buscar"
                 value={search}
                 onChange={event => setSearch(event.target.value)}
                 onBlur={changeSearch}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <SearchIcon/>
                     </InputAdornment>
                   ),
                 }}/>

    </div>
  );
}

const styles = {
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  } as CSSProperties
};
