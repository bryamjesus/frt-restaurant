import { Api } from "../helper/Api";

const PREFIX_URL = "/pedidos";

export const listarPedidoService = async () => {
  const response = await Api().get(PREFIX_URL + "/listar");
  return response;
};

export const guardarPedidoPlatoCategoriaService = async (datos) => {
  const response = await Api().post(PREFIX_URL + "/guardar", datos);
  return response;
};

export const mostrarPedidoService = async (id) => {
  const response = await Api().get(PREFIX_URL + "/detalle/" + id);
  return response;
};

export const editarPedidoService = async (datos) => {
	const response = await Api().put(PREFIX_URL+'/editar/'+datos._id, datos);
	return response;
};

