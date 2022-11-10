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

  const listarPlatos = async () => {
    const result = await listarPlatoService();
    setListaPlatos(result.data);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    setDatos(nDatos);
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setTituloModal("Nuevo Pedido");
    setShowModal(false);
  };

  const handleShowData = (id) => {
    setTituloModal("Editar Pedido");
    handleShowModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCloseModal();
  };

  useEffect(() => {
    listarPedidos();
    listarPlatos();
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

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{tituloModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-8">
                <div className="input-group">
                  <select ref={platoRef} className="form-select">
                    <option value="">Seleccionar un plato</option>
                    {listaPlatos.map((plato) => (
                      <option key={plato._id} value={platoRef._id}>
                        {plato.nombre} = S/{plato.precio}
                      </option>
                    ))}
                  </select>
                  <Button type="button" variant="secondary">
                    Agregar
                  </Button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Plato</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.detalle.map((item, index) => (
                      <tr key={index}>
                        <td>{item.plato}</td>
                        <td>{item.precio}</td>
                        <td>{item.estado}</td>
                        <td>
                          <Button variant="danger" size="sm">
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <h4 className="d-flex justify-content-between">
                  Total <span>S/ {datos.total}</span>
                </h4>
              </div>
            </div>
          </Modal.Body>
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
