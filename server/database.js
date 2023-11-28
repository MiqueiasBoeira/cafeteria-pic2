// database.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://mickajp:159357@cluster0.tlq3gtq.mongodb.net/';
const client = new MongoClient(uri);


let produtosCollection, usersCollection, pedidosCollection; // Variável para armazenar a referência à coleção

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db('appDB'); // Acessando o banco de dados
    produtosCollection = database.collection('produtosDB'); // Acessando a coleção 'produtosDB'
    usersCollection = database.collection('usersDB');
    pedidosCollection = database.collection('pedidosDB')

  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}

export { connectToDatabase, produtosCollection, usersCollection, pedidosCollection};
