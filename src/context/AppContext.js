import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AppContext = React.createContext();
const { Provider } = AppContext;

function AppProvider({ children }) {
  const [idUsuario, setIdUsuario] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [rol, setRol] = useState(null);
  const [token, setToken] = useState(localStorage.token);
  function login(data) {
    const token = data.token;
    const decoded = jwt_decode(token);
    console.log("decoded => ", decoded);
    setToken(token);
    setIdUsuario(decoded.userId);
    setNombre(decoded.user);
    setRol(decoded.role);
    localStorage.token = token;
  }
  function logout() {
    setIdUsuario(null);
    setNombre(null);
    setRol(null);
    localStorage.removeItem("token");
  }
  useEffect(() => {
    console.log("UserProvider useEffect");
    if (token) {
      console.log("Sí hay token");
      try {
        const decoded = jwt_decode(token);
        setIdUsuario(decoded.userId);
        setNombre(decoded.user);
        setRol(decoded.role);
      } catch (error) {
        console.log("Token inválido");
      }
    }
  }, []);
  return (
    <Provider value={{ token, idUsuario, nombre, rol, login, logout }}>
      {children}
    </Provider>
  );
}

export { AppProvider, AppContext };
