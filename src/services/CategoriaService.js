import { Api } from '../helper/Api';

const PREFIX_URL = '/categorias';

export const listarCategoriaService = async () => {
    const response = await Api().get(PREFIX_URL+'/listar');
    return response;
};

export const guardarCategoriaService = async (datos) => {
    const response = await Api().post(PREFIX_URL+'/guardar', datos);
    return response;
};

export const mostrarCategoriaService = async (id) => {
    const response = await Api().get(PREFIX_URL+'/detalle/'+id);
    return response;
};

export const editarCategoriaService = async (datos) => {
    const response = await Api().put(PREFIX_URL+'/editar/'+datos.id, datos);
    return response;
};

export const eliminarCategoriaService = async (id) => {
    const response = await Api().delete(PREFIX_URL+'/eliminar/'+id);
    return response;
};