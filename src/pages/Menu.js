import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './estilosGlobais.css';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../userActions.js';



const Menu = () => {
  const [produtos, setProdutos] = useState([]);
  const [mostrarBotoes, setMostrarBotoes] = useState(false);
  const userID = useSelector((state) => state.user.usernameId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = process.env.BASE_URL_SERVER;
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    axios.get(`http://3.133.96.51:8000/api/produtos`)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      {/* Botão para mostrar/ocultar os botões */}
      <div className='botoes-menu'>
      <button onClick={() => setMostrarBotoes(!mostrarBotoes)}>
        {mostrarBotoes ? '✖' : '〓'}
      </button>

      {/* Renderiza os botões apenas se mostrarBotoes for true */}
      {mostrarBotoes && (
        <>
          <Link to="/carrinho">
            <button> Carrinho</button>
          </Link>

          <Link to="/historicopedidos">
            <button>Histórico de pedidos</button>
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </>
        
      )}
      </div>

      <h1>Cardápio</h1>

      <ul>
        {produtos.map((product) => (
          <li key={product._id}>
            <Link to={`/produto/${product._id}`}>
              <div className="product-info-menu">
                <img src={`${product.imagem}`} />
                <div className='info'>
                  <h2> {product.nome} </h2>
                  <h2 className='price'>| {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
