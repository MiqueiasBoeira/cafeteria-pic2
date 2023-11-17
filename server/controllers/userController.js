import User from '../models/userSchema.js';

//listar todos os usuarios

export async function listarUsuarios(req,res){
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    }catch (err){
        res.status(500).send(err);
    }
};


//criar um novo usuario

export async function criarUsuario(req,res){
    try{
        const novoUsuario = new User(req.body);
        const usuarioSalvo = await novoUsuario.save();
        res.status(201).json(usuarioSalvo);
    }catch (err){
        res.status(400).send.err;
    }
};

//rota para validar login

export async function verificarLogin(req,res){
   
        const username = req.body.username;
        const senha = String(req.body.password);
      
        try {
          const foundUser = await User.findOne({ email: username });
      
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