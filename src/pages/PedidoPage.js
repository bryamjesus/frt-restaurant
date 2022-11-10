import { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { listarPlatoService } from "../services/PlatoService";
import {
  listarPedidoService,
  guardarPedidoPlatoCategoriaService,
  mostrarPedidoService,
  editarPedidoService,
} from "../services/PedidoService";

const initValues = {
  _id: "",
  cliente: "",
  mesa: "",
  total: 0,
  detalle: [],
  estado: "A",
};

function PedidoPage() {
  const [tituloModal, setTituloModal] = useState("Nuevo Pedido");
  const [listaPedidos, setListaPedidos] = useState([]);
  const [listaPlatos, setListaPlatos] = useState([]);
  const [datos, setDatos] = useState(initValues);
  const [showModal, setShowModal] = useState(false);

  const platoRef = useRef();

  const listarPedidos = async () => {
    const result = await listarPedidoService();
    setListaPedidos(result.data);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowData = (id) => {
    handleShowModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCloseModal()
  };

  useEffect(() => {
    listarPedidos();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-3">
        <h1>Pedidos</h1>
        <span>
          <Button variant="primary" onClick={handleShowModal}>
            Nuevo
          </Button>
        </span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Mesa</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaPedidos.map((item) => (
            <tr key={item._id}>
              <td>{item.cliente}</td>
              <td>{item.mesa}</td>
              <td>{item.total}</td>
              <td>{item.estado}</td>
              <td>
                <Button
                  onClick={() => handleShowData(item._id)}
                  variant="info"
                  size="sm"
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{tituloModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default PedidoPage;
