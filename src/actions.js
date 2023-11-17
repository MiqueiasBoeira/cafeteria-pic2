// actions.js
import { createAction } from '@reduxjs/toolkit';

export const adicionarAoCarrinho = createAction('ADICIONAR_AO_CARRINHO');
export const removerDoCarrinho = createAction('REMOVER_DO_CARRINHO');
export const finalizarPedido = createAction('FINALIZAR_PEDIDO');
