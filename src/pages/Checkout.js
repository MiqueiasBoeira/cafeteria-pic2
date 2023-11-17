// Checkout.js
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './estilosGlobais.css';
import { finalizarPedido } from '../actions.js'; // Certifique-se de ajustar o caminho para suas ações
import axios from 'axios';
import { BASE_URL_SERVER } from '../config/config.js';

const Checkout = () => {
  const dispatch = useDispatch();
  const mapStatetoProps = (state) => ({
    carrinho: state.carrinho,
  });

  const { carrinho } = useSelector(mapStatetoProps, shallowEqual);
  const [produtos, setProdutos] = useState([]);
  const [cupomDesconto, setCupomDesconto] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const userId = useSelector((state) => state.user.usernameId);

  const [cupomInvalido, setCupomInvalido] = useState(false);

  

  const handleAplicarCupom = () => {
    setCupomInvalido(true); // a ideia aqui é que todos os cupons sejam inválidos, apenas para não deixar sem funcionalidade

  };
  useEffect(() => {
    // Realize uma solicitação GET ao servidor para buscar produtos
    axios.get(`${BASE_URL_SERVER}/api/produtos`)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const todosProdutosCarrinho = [];

  // Função para calcular o total da compra
  const calcularTotalCompra = () => {
    if (!produtos || produtos.length === 0 || !carrinho || Object.keys(carrinho).length === 0) {
      return 0;
    }

    const totalCompra = Object.keys(carrinho).reduce((total, produtoId) => {
      const produtoNoCarrinho = produtos.find((produto) => String(produto._id) === String(produtoId));


      if (produtoNoCarrinho) {
        const quantidadeNoCarrinho = carrinho[produtoId];
        total += produtoNoCarrinho.preco * quantidadeNoCarrinho;
        const quantidade = quantidadeNoCarrinho
        todosProdutosCarrinho.push({ produtoId, quantidade });

      }

      return total;
    }, 0);

    // Lógica para aplicar desconto, se houver cupom (não implementado)
    return totalCompra;
  };



  // Função para finalizar o pedido
  const handleFinalizarPedido = (produtosCarrinho) => {

    const produtos = todosProdutosCarrinho;
    // Despacha a ação para finalizar o pedido
    try {
      const response = axios.post(`${BASE_URL_SERVER}/api/criarpedido`, { userId, produtos });
      dispatch(finalizarPedido());

    } catch (error) {
      console.error('Erro ao finalizar pedido: ', error);
    }
  };


  return (
    <div className='checkout-container'>
      <h1>Checkout</h1>
      <p>{todosProdutosCarrinho.produtoId} </p>

      <div className='checkout-summary'>
        <p>Total da Compra: {calcularTotalCompra().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <div className='cupom-container'>
          <label>Cupom de Desconto:</label>
          <input
            type='text'
            value={cupomDesconto}
            onChange={(e) => setCupomDesconto(e.target.value)}
          />




          <button onClick={handleAplicarCupom}>Aplicar</button>
        </div>

        {cupomInvalido && <p className='cupom-invalido'>Cupom inválido</p>}
      </div>

      <div className='checkout-form'>
        <label>Endereço de Entrega:</label>
        <textarea
          value={enderecoEntrega}
          onChange={(e) => setEnderecoEntrega(e.target.value)}
        />

        <label>Forma de Pagamento:</label>
        <select
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option value=''>Selecione...</option>
          <option value='cartao'>Dinheiro</option>
          <option value='boleto'>Cartão de Crédito</option>
        </select>
      </div>

      <Link to='/'>
        <button onClick={() => handleFinalizarPedido(todosProdutosCarrinho)}>
          Finalizar Pedido
        </button>
      </Link>
      <Link to='/carrinho'>
        <button>Voltar ao Carrinho</button>
      </Link>
    </div>
  );
};

export default Checkout;
