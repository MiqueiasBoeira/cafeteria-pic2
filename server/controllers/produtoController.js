//produtoController.js

import Produto from '../models/produtoSchema.js';


//listar todos os produtos

export async function listarProdutos(req,res){
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    }catch (err){
        res.status(500).send(err);
    }
};


//criar um novo produto

export async function criarProduto(req,res){
    try{
        const novoProduto = new Produto(req.body);
        const produtoSalvo = await novoProduto.save();
        res.status(201).json(produtoSalvo);
    }catch (err){
        res.status(400).send.err;
    }
};

//atualiza um produto já existente

export async function atualizarProduto(req,res){
    const { id } = req.params;
    try{
        const produto = await Produto.findByIdAndUpdate(id, req.body, {new:true});
        if(!produto){
            return res.status(404).send('Produto não encontrado');
        }
        res.json(produto);
    }catch (err){
        res.status(400).send.err;
    }
};

//exclui um produto existente

export async function excluirProduto(req,res){
    const {id} = req.params;
    try{
        const produto = await Produto.findByIdAndRemove(id);
    
        if(!produto){
            return res.status(404).send("Produto não encontrado");
        }
        res.json(produto);

    }catch (err){
        res.status(400).send.err
    }
};

export async function encontrarProdutoEspecifico(req,res){
    
        const productId = req.params.id;
      
        try {
          // Consulte o banco de dados ou a fonte de dados para obter os detalhes do produto com o ID fornecido
          const produto = await Produto.findById(productId);
      
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

