import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const produtoSchema = new mongoose.Schema({
    nome: String,
    ingredientes: String,
    preco: Number,
    imagem: String,
    produto_id: String
});

const Produto = model('Produto', produtoSchema);
export default Produto;