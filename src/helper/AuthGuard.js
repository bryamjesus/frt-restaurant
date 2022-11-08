import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function AuthGuard({component: Component}){
    const { token } = useContext(AppContext);
    return token ? (<Component />) : (<Navigate to='/' />);
}

export default AuthGuard;