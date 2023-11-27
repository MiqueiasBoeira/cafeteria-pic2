
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


/*

export async function criarPedido(req, res) {
    try {

        const novoPedido = req.body;

        
        novoPedido.data = new Date();
        const pedidoSalvo = await pedidosCollection.insertOne(novoPedido);

        res.status(201).json(pedidoSalvo);

        
    } catch (err) {
        res.status(400).send.err;
    }
};

*/

export async function criarPedido(req, res) {
    try {
        const novoPedido = req.body;
        
        // Obter a data atual
        const dataAtual = new Date();

        // Ajustar para o fuso horário de São Paulo (GMT-3)
        const dataSaoPaulo = new Date(dataAtual.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

        // Formatar a data para o formato DD/MM/AAAA
        const dataFormatada = dataSaoPaulo.toLocaleDateString('pt-BR');

        // Adicionar a data formatada ao pedido
        novoPedido.data = dataFormatada;

        const pedidoSalvo = await pedidosCollection.insertOne(novoPedido);
        res.status(201).json(pedidoSalvo);
    } catch (err) {
        res.status(400).send(err);
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

