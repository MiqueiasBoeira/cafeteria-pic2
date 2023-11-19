
import { usersCollection } from '../database.js';

//listar todos os usuarios

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await usersCollection.find().toArray();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send(err);
  }
};


//criar um novo usuario

export async function criarUsuario(req, res) {
  try {

    const novoUsuario = req.body;
    
    const result = await usersCollection.insertOne(novoUsuario);

    if (result) {
      res.status(201).json(novoUsuario);
    } else {
      res.status(500).json({ message: 'Falha ao criar usuário' });
    }
  } catch (err) {
    res.status(400).send.err;
  }
};

//rota para validar login

export async function verificarLogin(req, res) {

  const username = req.body.username;
  const senha = String(req.body.password);


  try {
    const foundUser = await usersCollection.findOne({ email: username });


    if (foundUser) {
      const senhaCorreta = senha === foundUser.password;

      if (senhaCorreta) {
        res.json({ success: true, userId: foundUser._id }); // Se a senha estiver correta
      } else {
        res.json({ success: false }); // Se a senha estiver incorreta
      }
    } else {
      res.json({ success: false }); // Se o usuário não for encontrado
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao verificar login' });
  }


}