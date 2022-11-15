import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import { listarPlatoService } from "../services/PlatoService";
import {
  listarPedidoService,
  guardarPedidoPlatoCategoriaService,
  mostrarPedidoService,
  editarPedidoService,
} from "../services/PedidoService";
import { io } from "socket.io-client";
import { API_URL } from "../helper/Config";
import Swal from "sweetalert2";

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

  const [socket, setSocket] = useState(null);

  const platoRef = useRef();

  const listarPedidos = async () => {
    const result = await listarPedidoService();
    setListaPedidos(result.data);
  };

  const listarPlatos = async () => {
    const result = await listarPlatoService();
    setListaPlatos(result.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    setDatos(nDatos);
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setDatos(initValues);
    setShowModal(false);
    setTituloModal("Nuevo Pedido");
  };

  const handleShowData = async (id) => {
    setTituloModal("Editar Pedido");
    const result = await mostrarPedidoService(id);
    setDatos(result.data);
    handleShowModal();
  };

  const handleAddDetail = (id) => {
    const detallePlato = listaPlatos.find((item) => item._id === id);
    console.log("detallePlato =>", detallePlato);
    const nuevoPlato = {
      plato: detallePlato.nombre,
      precio: detallePlato.precio,
      estado: "P",
    };
    const nuevoDetalle = [...datos.detalle, nuevoPlato];
    console.log("nuevoDetalle =>", nuevoDetalle);
    const total = datos.total + detallePlato.precio;
    const nDatos = { ...datos, total, detalle: nuevoDetalle };
    console.log("nDatos =>", nDatos);
    setDatos(nDatos);
  };

  const handleDeleteDetail = (index) => {
    const detallePlato = datos.detalle[index];
    console.log("detallePlato=> ", detallePlato);
    const nuevoDetalle = datos.detalle.filter(
      (item, indexItem) => indexItem !== index
    );
    console.log("nuevoDetalle=> ", nuevoDetalle);
    const total = datos.total - detallePlato.precio;
    const nDatos = { ...datos, total, detalle: nuevoDetalle };
    setDatos(nDatos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(datos);
    // codigo para enviar el pedido a traves del servicio
    if (datos._id) {
      console.log("Editando el pedido");
      await editarPedidoService(datos);
    } else {
      console.log("Ingresando un nuevo pedido");
      await guardarPedidoPlatoCategoriaService(datos);
    }
    socket.emit('channel-cocina-pedido','Listar de nuevo platos')
    await listarPedidos();
    handleCloseModal();
  };

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Escribe el nombre..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value ||
                child.props.children.toString().toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  useEffect(() => {
    listarPedidos();
    listarPlatos();
  }, []);

  useEffect(() => {
    const socket = io(API_URL)
    setSocket(socket)
    socket.on("channel-cocina-entrega", (mensaje) => {
      console.log("Mensaje desde el mozo", mensaje);
      Swal.fire(`Recoger ${mensaje.plato} para la mesa ${mensaje.mesa}`);
    });
  }, [])
  

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
                <Dropdown onSelect={(eventKey) => handleAddDetail(eventKey)}>
                  <Dropdown.Toggle variant="success">
                    Seleccionar un plato
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    {listaPlatos.map((plato) => (
                      <Dropdown.Item key={plato._id} eventKey={plato._id}>
                        {plato.nombre} = S/{plato.precio}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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
                          <Button
                            onClick={() => handleDeleteDetail(index)}
                            variant="danger"
                            size="sm"
                          >
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
                <div className="mb-3">
                  <label className="form-label">Mesa</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="mesa"
                    className="form-control"
                    value={datos.mesa}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="cliente"
                    className="form-control"
                    value={datos.cliente}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    onChange={handleChange}
                    className="form-select"
                    name="estado"
                    value={datos.estado}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="A">Activo</option>
                    <option value="T">Terminado</option>
                    <option value="N">Anulado</option>
                  </select>
                </div>
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
