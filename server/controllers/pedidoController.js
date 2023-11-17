import Pedido from '../models/pedidoSchema.js';




export async function verPedidos(req,res){
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    }catch (err){
        res.status(500).send(err);
    }
};




export async function criarPedido(req,res){
    try{
         
        const novoPedido = new Pedido(req.body);
        novoPedido.dataFormatada = novoPedido.data.toLocaleString();
        const pedidoSalvo = await novoPedido.save();

        res.status(201).json(pedidoSalvo);
    }catch (err){
        res.status(400).send.err;
    }
};




export async function encontrarPedido(req,res){
    const {id} = req.params;

    try{
        const pedido = await Pedido.findById(id);

    if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
  
      res.json(pedido);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar o pedido' });
    }
};

