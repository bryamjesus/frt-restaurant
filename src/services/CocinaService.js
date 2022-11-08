import { Api } from '../helper/Api';

const PREFIX_URL = '/cocina';

export const listarCocinaService = async () => {
    const response = await Api().get(PREFIX_URL+'/listar');
    return response;
};

export const editarCocinaService = async (id) => {
    const response = await Api().put(PREFIX_URL+'/editar/'+id);
    return response;
};
