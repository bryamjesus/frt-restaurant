import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuarioService } from '../services/UsuarioService';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

const initValues = {
    email: "",
    password: ""
};

function LoginPage(){
    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const [crendenciales, setCredenciales] = useState(initValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nDato = {...crendenciales, [name]:value};
        setCredenciales(nDato);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUsuarioService(crendenciales);
            const data = result.data;
            login(data);
            navigate('/pricipal');
        } catch (error) {
            Swal.fire(
                'Error',
                error.response.data,
                'error'
            );
            console.log('ErrorLogin: ', error);
        }
    }

    return(
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                        </div>
                        <div className="card shadow-lg mt-5">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Email</label>
                                        <input id="email" type="email" onChange={handleChange} className="form-control" name="email" required autoFocus />
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="password">Contraseña</label>
                                            <a href="forgot.html" className="float-end">
                                                Recuperar contraseña?
                                            </a>
                                        </div>
                                        <input id="password" type="password" onChange={handleChange} className="form-control" name="password" required />
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                                            <label htmlFor="remember" className="form-check-label">Recuerdame</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-5 text-muted">
                            Copyright &copy; 2022 &mdash; CodiGo
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
