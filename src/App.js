import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from '../src/pages/Menu.js';
import ProdutoDetalhes from '../src/pages/ProdutoDetalhes.js';
import CarrinhoCompras from '../src/pages/CarrinhoCompras.js'
import Checkout from '../src/pages/Checkout.js'
import Login from '../src/pages/Login.js'
import RegistroUsuario from '../src/pages/RegistroUsuario.js'
import Pedidos from '../src/pages/Pedidos.js'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/produto/:id" element={<ProdutoDetalhes />} />
      <Route path="/carrinho" element={<CarrinhoCompras />} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/menu" element={<Menu />} />
      <Route path='/registrousuario' element={<RegistroUsuario/>} />
      <Route path='/historicopedidos' element={<Pedidos/>} />
    </Routes>
  );
};

export default App;
