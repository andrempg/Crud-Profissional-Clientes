const db = require("../config/database.js");

//Função pra salvar o cliente adm no banco de dados
exports.criar = async (dadosCliente, idUsuario) => {
    const query = "INSERT INTO clientes (nome, email, cpf, logradouro, numero, bairro, municipio, cep, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const valores =  [dadosCliente.nome, dadosCliente.email, dadosCliente.cpf, dadosCliente.logradouro, dadosCliente.numero, dadosCliente.bairro, dadosCliente.municipio, dadosCliente.cep, idUsuario];

    const [resultado] = await db.execute(query, valores);

    return {
        id: resultado.insertId,
        ...dadosCliente,
        usuario_id: idUsuario
    };

}
