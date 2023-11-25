//Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL_SERVER } from '../config/config.js';
import { login, logout } from '../userActions.js';
import { useDispatch } from 'react-redux';
import './estilosGlobais.css'; // Importe o arquivo de estilos globais aqui

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL_SERVER}/api/verificarLogins123`, { username, password });

      if (response.data.success) {
        dispatch(login(response.data.userId, password));
        navigate('/menu');
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

      <div className='watermark-container'>
        <h1>CAFETERIA DY RICO</h1>

        <p>Bem-vindo(a) nossa Cafeteria Gourmet</p>

      </div>

        <div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className={emailFocused || username !== '' ? 'input-filled' : ''} htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Login</button>
          </form>

          <Link to='/registrousuario'>
            <button>Criar conta</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
