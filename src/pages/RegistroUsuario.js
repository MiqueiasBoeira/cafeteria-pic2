import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_SERVER } from '../config/config.js';
import { Link } from 'react-router-dom';
import './estilosGlobais.css';

const RegistroUsuario = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegistro = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL_SERVER}/api/usuarios`, { nome, email, password });

            if (response) {
                navigate('/');
            } else {
                setError('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="container">
        <div className='login-container'>

            <Link to="/login">
                <button>←</button>
            </Link>
            <h1>Registrar usuário</h1>



            <div>
                <form onSubmit={handleRegistro}>

                    <div className='form-group'>
                        <label htmlFor="nome">Nome</label>
                        <input name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p>{error}</p>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default RegistroUsuario;
