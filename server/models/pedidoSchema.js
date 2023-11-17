import mongoose from "mongoose";





const pedidoSchema = new mongoose.Schema({
    userId: String,
    produtos: [{}],
    data: {type: Date, default: Date.now},
    dataFormatada: {type: String, default: undefined},

});


const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;