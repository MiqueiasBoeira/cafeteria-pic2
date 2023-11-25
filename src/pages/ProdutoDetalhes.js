// ProdutoDetalhes.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { adicionarAoCarrinho, removerDoCarrinho } from '../actions.js';
import { Link, redirect, useParams } from 'react-router-dom';
import './estilosGlobais.css';
import { BASE_URL_SERVER } from '../config/config.js';

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carrinho = useSelector((state) => state.carrinho);
  const [produto, setProduto] = useState(null);
  const [quantidadeNoCarrinho, setQuantidadeNoCarrinho] = useState(carrinho[id] || 0);

  useEffect(() => {
    axios.get(`http://3.133.96.51:8000/api/produtos/${id}`)
      .then((response) => {
        setProduto(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const incrementarQuantidade = () => {
    setQuantidadeNoCarrinho((prevQuantidade) => {
      const novaQuantidade = prevQuantidade + 1;
      dispatch(adicionarAoCarrinho({ produtoId: id, quantidade: novaQuantidade }));
      return novaQuantidade;
    });
  };
  
  const decrementarQuantidade = () => {
    setQuantidadeNoCarrinho((prevQuantidade) => {
      const novaQuantidade = Math.max(prevQuantidade - 1, 0);
      dispatch(adicionarAoCarrinho({ produtoId: id, quantidade: novaQuantidade }));
      return novaQuantidade;
    });
  };
  
  const adicionarAoCarrinhoLocal = () => {
    dispatch(adicionarAoCarrinho({ produtoId: id, quantidade: 1 }));
    setQuantidadeNoCarrinho(1); // Atualiza a quantidade local para refletir no render
  };

  const removerDoCarrinhoLocal = () => {
    setQuantidadeNoCarrinho(0);
    dispatch(removerDoCarrinho({ produtoId: id }));
  };

  if (!produto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='container'>
    <Link to="/menu">
        <button className='voltar-button'>←</button>
      </Link>
      <h2>{produto.nome}</h2>
      <img src={`${produto.imagem}`} />
      <p>Preço: {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p> {produto.ingredientes}</p>

      
      {quantidadeNoCarrinho > 0 ? (
        <div className='quantity-container'>
          <button  onClick={removerDoCarrinhoLocal}>Remover do carrinho</button>
        </div>
      ) : (
        <Link to="/carrinho">
        <button  className="ver-carrinho-button" onClick={adicionarAoCarrinhoLocal}>Adicionar ao Carrinho</button>
        </Link>
      )}
      

      <Link to="/carrinho">
        <button className='ver-carrinho-button'>Carrinho</button>
      </Link>

      
    </div>
  );
};

export default ProdutoDetalhes;
