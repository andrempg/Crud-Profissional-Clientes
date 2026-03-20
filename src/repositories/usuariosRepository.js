const db = require("../config/database.js");

//Função pra salvar o usuario adm no banco de dados
exports.criar = async (dadosUsuario) => {
    const query = "INSERT INTO usuarios (usuario, senha_hash, papel) VALUES (?, ?, ?)";
    const valores = [dadosUsuario.usuario, dadosUsuario.senha_hash, "admin"];

    const [resultado] = await db.execute(query, valores);
    
    return {
        id: resultado.id,
        usuario: resultado.usuario,
        papel: resultado.papel
    };
};

//Função pra pegar o usuario adm no banco de dados para que não haja criação de dois 
// adms com nome de usuario igual e também para possibilitar a checagem dos clientes do adm 
exports.buscarPorUsuario = async (nomeUsuario) => {
    const query = "SELECT * FROM usuarios WHERE usuario = ? AND ativo = true";
    const valor = [nomeUsuario];

    const [resultado] = await db.execute(query, valor);

    return resultado[0];
};