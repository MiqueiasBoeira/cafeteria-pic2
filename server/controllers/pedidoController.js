
import { pedidosCollection } from '../database.js';
import { ObjectId } from 'mongodb';



export async function verPedidos(req, res) {
    try {
        const pedidos = await pedidosCollection.find().toArray();
        res.json(pedidos);
    } catch (err) {
        res.status(500).send(err);
    }
};




export async function criarPedido(req, res) {
    try {

        const novoPedido = req.body;
        //novoPedido.data = new Date();
        //const pedidoSalvo = await pedidosCollection.insertOne(novoPedido);

        //res.status(201).json(pedidoSalvo);

        console.log(pedidoSalvo);
    } catch (err) {
        res.status(400).send.err;
    }
};





export async function encontrarPedido(req, res) {
    const pedidoId = new ObjectId(req.params.id);

    
    
            
    try {
        const pedido = await pedidosCollection.findOne({_id:pedidoId});
        
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        res.json(pedido);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar o pedido' });
    }
};

