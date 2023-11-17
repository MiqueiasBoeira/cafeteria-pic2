// reducers.js
import { createReducer } from '@reduxjs/toolkit';
import { adicionarAoCarrinho, removerDoCarrinho, finalizarPedido } from './actions.js';

const initialState = {};

export const carrinhoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(adicionarAoCarrinho, (state, action) => {
      const { produtoId, quantidade } = action.payload;
      state[produtoId] = quantidade;
    })
    .addCase(removerDoCarrinho, (state, action) => {
      const { produtoId } = action.payload;
      delete state[produtoId];
    })
    .addCase(finalizarPedido, (state, action) => {
      // Limpar o carrinho após finalizar o pedido
      return initialState;
    });
});
  