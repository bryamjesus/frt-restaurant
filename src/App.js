import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AuthGuard from "./helper/AuthGuard";
import CabeceraComponent from "./components/CabeceraComponent";
import LoginPage from "./pages/LoginPage";
import PrincipalPage from "./pages/PrincipalPage";
import CategoriaPage from "./pages/CategoriaPage";
import PlatoPage from "./pages/PlatoPage";
import PedidoPage from "./pages/PedidoPage";
import CocinaPage from "./pages/CocinaPage";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CabeceraComponent />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/principal"
            element={<AuthGuard component={PrincipalPage} />}
          />
          <Route
            path="/categorias"
            element={<AuthGuard component={CategoriaPage} />}
          />
          <Route path="/platos" element={<AuthGuard component={PlatoPage} />} />
          <Route
            path="/pedidos"
            element={<AuthGuard component={PedidoPage} />}
          />
          <Route
            path="/cocina"
            element={<AuthGuard component={CocinaPage} />}
          />
          <Route
            path="*"
            element={
              <h4 className="mt-3 text-center">
                Error 404 - Pagina no encontrada
              </h4>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
