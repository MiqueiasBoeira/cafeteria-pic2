//server.js

import express, { json } from 'express';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import { BASE_URL_DATABASE } from '../src/config/config.js';
import { connectToDatabase, produtosCollection } from './database.js';
const app = express();
const port = process.env.PORT || 8000;


import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//importar os controladores

import { listarProdutos, encontrarProdutoEspecifico } from './controllers/produtoController.js';
import { criarUsuario, listarUsuarios, verificarLogin } from './controllers/userController.js';
import { criarPedido, verPedidos, encontrarPedido } from './controllers/pedidoController.js';


app.use(express.static("../public"));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//rotas de produtos

connectToDatabase();

app.get('/api/produtos', listarProdutos); 
app.get('/api/produtos/:id', encontrarProdutoEspecifico);
app.get('/api/teste', function(req,res){
  res.json('tá funcionando');
})

//rotas de usuarios
app.get('/api/usuarios', listarUsuarios);
app.post('/api/usuarios', criarUsuario);
app.post('/api/verificarLogin', verificarLogin);

//rotas de pedidos
app.post('/api/criarpedido', criarPedido);
app.get('/api/pedidos', verPedidos);
app.get('/api/pedidos/:id', encontrarPedido);









app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});


