export interface IndicadorModel {

    id?: number;

    codigo?: string;

    nombre?: string;

    objetivo?: string;

    alcance?: string;

    formula?: string;

    fkidtipoindicador?: number;

    fkidunidadmedicion?: number;

    meta?: string;

    fkidsentido?: number;

    fkidfrecuencia?: number;

    fkidarticulo?: string;

    fkidliteral?: string;

    fkidnumeral?: string;

    fkidparagrafo?: string;

}
