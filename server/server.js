//server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { BASE_URL_DATABASE } from '../src/config/config.js';
const app = express();
const port = process.env.PORT || 8000;


import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//importar os controladores

import { criarProduto, listarProdutos, atualizarProduto, excluirProduto, encontrarProdutoEspecifico} from './controllers/produtoController.js';
import { criarUsuario, listarUsuarios, verificarLogin } from './controllers/userController.js';
import { criarPedido, verPedidos, encontrarPedido} from './controllers/pedidoController.js';


app.use(express.static("../public"));

app.use(express.json());

app.use(cors());


//rotas de produtos

app.get('/api/produtos', listarProdutos);
app.post('/api/produtos', criarProduto);
app.put('/api/produtos/:id', atualizarProduto);
app.delete('/api/produtos/:id', excluirProduto);
app.get('/api/produtos/:id', encontrarProdutoEspecifico);

//rotas de usuarios
app.get('/api/usuarios', listarUsuarios);
app.post('/api/usuarios', criarUsuario);
app.post('/api/verificarLogin', verificarLogin);

//rotas de pedidos
app.post('/api/criarpedido', criarPedido);
app.get('/api/pedidos', verPedidos);
app.get('/api/pedidos/:id', encontrarPedido);




// Conexão com o MongoDB
const produtosDBConnection = mongoose.connect(`${BASE_URL_DATABASE}/produtosDB`, { useNewUrlParser: true, useUnifiedTopology: true });

const usersDBConnection = mongoose.createConnection(`${BASE_URL_DATABASE}/usersDB`, { useNewUrlParser: true, useUnifiedTopology: true });

const pedidosDBConnection = mongoose.createConnection(`${BASE_URL_DATABASE}/pedidosDB`, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
