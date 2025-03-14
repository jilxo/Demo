export function validNew(roles?: Array<string | any>): boolean {
    if (!roles)
        return false;

    if (roles.includes('admin')) // todo
        return true;
    if (roles.includes('Validador')) // consultar y modificar
        return false;
    if (roles.includes('Verificador')) // consultar
        return false;

    return false;
}

export function validEdit(roles?: Array<string | any>): boolean {
    if (!roles)
        return false;

    if (roles.includes('admin')) // todo
        return true;
    if (roles.includes('Validador')) // consultar y modificar
        return true;
    if (roles.includes('Verificador')) // consultar
        return false;

    return false;
}

export function validDelete(roles?: Array<string | any>): boolean {
    if (!roles)
        return false;

    if (roles.includes('admin')) // todo
        return true;
    if (roles.includes('Validador')) // consultar y modificar
        return false;
    if (roles.includes('Verificador')) // consultar
        return false;

    return false;
}

export function validRead(roles?: Array<string | any>): boolean {
    if (!roles)
        return false;

    if (roles.includes('admin')) // todo
        return true;
    if (roles.includes('Validador')) // consultar y modificar
        return true;
    if (roles.includes('Verificador')) // consultar
        return true;

    return false;
}
