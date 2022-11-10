import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function AuthGuard({component: Component}){
    const token = localStorage.token;
    const accesoRutas = {
        'A': ['/principal', '/categorias', '/platos'],
        'M': ['/principal', '/pedidos'],
        'C': ['/principal', '/cocina'],
    };
    
    const validar = () => {
        const decoded = jwt_decode(token);
        const accesos = accesoRutas[decoded.role];
        console.log('accesos', accesos);
        const ruta = window.location.pathname;
        console.log('ruta', ruta);
        // indexOf encuentra la posición de la ruta en el arreglo accesos
        const acceso = accesos.indexOf(ruta)>-1 ? true :  false;
        return acceso;
    };
    
    return token ? (validar() ? <Component /> : <Navigate to='/principal' />) : (<Navigate to='/' />);
}

export default AuthGuard;