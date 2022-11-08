import { Api } from '../helper/Api';

const PREFIX_URL = '/platos';

export const listarPlatoService = async () => {
    const response = await Api().get(PREFIX_URL+'/listar');
    return response;
};

export const guardarPlatoCategoriaService = async (datos) => {
    const response = await Api().post(PREFIX_URL+'/guardar', datos);
    return response;
};

export const mostrarPlatoService = async (id) => {
    const response = await Api().get(PREFIX_URL+'/detalle/'+id);
    return response;
};

export const editarPlatoService = async (datos) => {
    const response = await Api().put(PREFIX_URL+'/editar/'+datos.id, datos);
    return response;
};

export const eliminarPlatoService = async (id, img) => {
    const response = await Api().delete(PREFIX_URL+`/eliminar/${id}/${img}`);
    return response;
};