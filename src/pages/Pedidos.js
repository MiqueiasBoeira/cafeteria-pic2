// src/pages/Pedidos.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './estilosGlobais.css';


import { BASE_URL_SERVER } from '../config/config.js';
import { useSelector } from 'react-redux';



const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const userID = useSelector((state) => state.user.usernameId);
    const [produtos, setProdutos] = useState([]);




    useEffect(() => {
        // Realize uma solicitação GET ao servidor para buscar produtos
        axios.get(`http://3.133.96.51:8000/api/pedidos`)
            .then((response) => {
                
                setPedidos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // Realize uma solicitação GET ao servidor para buscar produtos
        axios.get(`http://3.133.96.51:8000/api/produtos`)
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    const pedidosUsuario = pedidos.filter((pedido) => String(pedido.userId) === String(userID));

    
    const obterDetalhesProduto = (produtoId) => {
        return produtos.find((produto) => produto._id === produtoId);
    };

    return (
        <div className="container">
            
            <Link to="/menu">
                <button>←</button>
            </Link>

            <Link to="/carrinho">
                <button> Carrinho</button>
            </Link>

            <h1>Histórico de pedidos</h1>
            <ul>
                {pedidosUsuario.map((pedido) => (
                    <li key={pedido._id}>
                    
                        <ul>
                            {pedido.produtos.map((produtoDoPedido, index) => {
                                const detalhesProduto = obterDetalhesProduto(produtoDoPedido.produtoId);
                                return detalhesProduto ? (
                                    <li key={index}>
                                        <div className="product-info">
                                            <h3>{detalhesProduto.nome}</h3>
                                            <p>Preço: {detalhesProduto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            <p>Quantidade: {produtoDoPedido.quantidade}</p>
                                            <p>Total: {(detalhesProduto.preco * produtoDoPedido.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            <p>Pedido em {pedido.dataFormatada}</p>
                                            <h1></h1>
                                            <img src={detalhesProduto.imagem} />
                                        </div>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                        
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Pedidos;
