import axios, {AxiosResponse} from "axios";


/**
 * base de los servicios
 */
export class BaseService<M, I> {

    /**
     * constructor
     *
     * @param url url base para las peticiones a realizar
     */
    constructor(protected url: string) {
    }

    /**
     * sevicio de creacion de un nuevo elemento
     *
     * @param element elemento a guardar
     */
    save(element?: M): Promise<AxiosResponse<M | undefined>> {
        return axios.post<M>(this.url, element);
    }

    /**
     * sevicio de actualizacion de un elemento
     *
     * @param element elemento a actualizar
     */
    update(element?: M): Promise<AxiosResponse<M | undefined>> {
        return axios.put<M>(this.url, element);
    }

    /**
     * sevicio de eliminacion de un elemento
     *
     * @param id identificador del elemento
     */
    delete(id?: I): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${this.url}/${id}`);
    }

    /**
     * sevicio de busqueda de un solo elemento
     *
     * @param id identificador del elemento
     */
    findOne(id?: I): Promise<AxiosResponse<M | undefined>> {
        return axios.get<M>(`${this.url}/${id}`);
    }

    /**
     * sevicio de busqueda de los elementos
     */
    find(params: any = {}): Promise<AxiosResponse<Array<M | undefined>>> {
        return axios.get<Array<M>>(this.url, {params});
    }

}
