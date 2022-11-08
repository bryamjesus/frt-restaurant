import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AuthGuard from './helper/AuthGuard';
import CabeceraComponent from './components/CabeceraComponent';
import LoginPage from "./pages/LoginPage";
import PrincipalPage from "./pages/PrincipalPage";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CabeceraComponent />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/principal' element={<AuthGuard component={PrincipalPage} />} />
          <Route path='*' element={<h4 className='mt-3 text-center'>Error 404 - Pagina no encontrada</h4>} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
