// CarrinhoCompras.js
import './estilosGlobais.css';
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { adicionarAoCarrinho, removerDoCarrinho } from '../actions.js';


const CarrinhoCompras = () => {
  const dispatch = useDispatch();
  const mapStateToProps = (state) => ({
    carrinho: state.carrinho,
  });

  const { carrinho } = useSelector(mapStateToProps, shallowEqual);
  const [produtos, setProdutos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const userID = useSelector((state) => state.user.usernameId);

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

  useEffect(() => {
    // Calcula o valor total da compra sempre que o carrinho é atualizado
    const novoTotalCompra = Object.keys(carrinho).reduce((total, produtoId) => {
      const produtoNoCarrinho = produtos.find((produto) => String(produto._id) === String(produtoId));

      if (produtoNoCarrinho) {
        const quantidadeNoCarrinho = carrinho[produtoId];
        total += produtoNoCarrinho.preco * quantidadeNoCarrinho;
      }

      return total;
    }, 0);

    setTotalCompra(novoTotalCompra);
  }, [carrinho, produtos]);

  const incrementarQuantidade = (produtoId) => {
    const novaQuantidade = carrinho[produtoId] + 1;
    dispatch(adicionarAoCarrinho({ produtoId, quantidade: novaQuantidade }));
  };

  /*

  const decrementarQuantidade = (produtoId) => {
    const novaQuantidade = Math.max(carrinho[produtoId] - 1, 0);
    dispatch(adicionarAoCarrinho({ produtoId, quantidade: novaQuantidade }));



  };

*/

const decrementarQuantidade = (produtoId) => {
  const novaQuantidade = Math.max(carrinho[produtoId] - 1, 0);
  
  if (novaQuantidade === 0) {
    if (window.confirm('Deseja remover este item do carrinho?')) {
      dispatch(removerDoCarrinho({ produtoId }));
    }
  } else {
    dispatch(adicionarAoCarrinho({ produtoId, quantidade: novaQuantidade }));
  }
};


  const removerDoCarrinhoLocal = (produtoId) => {
    dispatch(removerDoCarrinho({ produtoId }));
  };

  return (
    <div className='container'>
    <Link to="/menu">
        <button className='voltar-button'>←</button>
      </Link>
      <h1>Carrinho de Compras</h1>
      <div className='carrinho-compras'>
        {Object.keys(carrinho).length === 0 ? (
          <p>O seu carrinho está vazio.</p>
        ) : (
          <>
            {Object.keys(carrinho).map((produtoId) => {
              const produtoNoCarrinho = produtos.find((produto) => String(produto._id) === String(produtoId));

              if (produtoNoCarrinho) {
                const quantidadeNoCarrinho = carrinho[produtoId];

                return (
                  <div key={produtoId} className='product-item'>
                    <div className='product-info'>
                      <div>
                        <img src={produtoNoCarrinho.imagem} alt={produtoNoCarrinho.nome} />
                        <p>{produtoNoCarrinho.nome}</p>
                        <p>Preço: {produtoNoCarrinho.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <p>Total do item: {(produtoNoCarrinho.preco * quantidadeNoCarrinho).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        

                        <div className='quantity-container'>
                          <button className='quantity-button' onClick={() => decrementarQuantidade(produtoId)}>-</button>
                          <p className='quantity-text'>{quantidadeNoCarrinho}</p>
                          <button className='quantity-button' onClick={() => incrementarQuantidade(produtoId)}>+</button>
                        </div>

                        <button onClick={() => removerDoCarrinhoLocal(produtoId)}>Remover do carrinho</button>
                      </div>
                    </div>
                    <h1></h1>
                  </div>
                );
              }

              return null; // Caso o produto não seja encontrado
            })}

            <div className='total-container'>
              <p>Total da Compra: {totalCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>

            <Link to='/checkout'>
              <button className='back-button'>Checkout</button>
            </Link>
          </>
        )}

      </div>



    </div>
  );
};

export default CarrinhoCompras;
