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
    const [nomeFocused, setNomeFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

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

                        <div className="form-group">
                            <label className={nomeFocused || nome !== '' ? 'input-filled' : ''} htmlFor="nome">
                                Nome
                            </label>
                            <input
                                type="nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                onFocus={() => setNomeFocused(true)}
                                onBlur={() => setNomeFocused(false)}
                            />
                        </div>

                        <div className="form-group">
                            <label className={emailFocused || email !== '' ? 'input-filled' : ''} htmlFor="email">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                            />
                        </div>
                        <div className="form-group">
                            <label className={passwordFocused || password !== '' ? 'input-filled' : ''} htmlFor="password">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                        </div>
                        <div className='msg-erro'>
                            <p>{error}</p>
                        </div>
                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistroUsuario;
