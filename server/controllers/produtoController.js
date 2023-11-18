//produtoController.js


import { produtosCollection } from '../database.js';
import { ObjectId } from 'mongodb';

export async function listarProdutos(req,res){
    try {
        const produtos = await produtosCollection.find().toArray(); // Usando Mongoose para buscar os produtos
    
        res.json(produtos);
      } catch (err) {
        console.error('Erro ao listar produtos: ', err);
        res.status(500).send(err);
      }
}




export async function encontrarProdutoEspecifico(req,res){
    
        const productId = new ObjectId(req.params.id);
            
        try {
          // Consulte o banco de dados ou a fonte de dados para obter os detalhes do produto com o ID fornecido
          const produto = await produtosCollection.findOne({_id: productId});

      
          if (!produto) {
            // Se o produto não for encontrado, retorne um status 404 (não encontrado)
            return res.status(404).json({ error: 'Produto não encontrado' });
          }
      
          // Se o produto for encontrado, retorne os detalhes
          res.json(produto);
        } catch (error) {
          // Se ocorrer um erro, retorne um status 500 (erro interno do servidor)
          res.status(500).json({ error: 'Erro ao buscar os detalhes do produto' });
        }
      
};

