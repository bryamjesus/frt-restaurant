import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  listarCocinaService,
  editarCocinaService,
} from "../services/CocinaService";

function CocinaPage() {
  const [lista, setLista] = useState([]);

  const listar = async () => {
    const result = await listarCocinaService();
    console.log(result);
    setLista(result.data);
  };

  const handleSubmit = async (detalle) => {
    console.log(detalle);
    Swal.fire({
      title: `Estás seguro de entregar ${detalle.plato} a la mesa ${detalle.mesa}?`,
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, entregar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await editarCocinaService(detalle._id);
        await listar();
        Swal.fire("Plato entregado!", "", "success");
      }
    });
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="container">
      <h1>Cocina</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Plato</th>
            <th>Estado</th>
            <th>Mesa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item._id}>
              <td>{item.plato}</td>
              <td>{item.estado}</td>
              <td>{item.mesa}</td>
              <td>
                <button
                  onClick={() => handleSubmit(item)}
                  className="btn btn-success btn-sm me-2"
                >
                  Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CocinaPage;
