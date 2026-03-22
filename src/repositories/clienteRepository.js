const db = require("../config/database.js");

//Função pra salvar o cliente no banco de dados
exports.criar = async (dadosCliente, idUsuario) => {
    const query = "INSERT INTO clientes (nome, email, cpf, logradouro, numero, bairro, municipio, cep, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const valores =  [dadosCliente.nome, dadosCliente.email, dadosCliente.cpf, dadosCliente.logradouro, dadosCliente.numero, dadosCliente.bairro, dadosCliente.municipio, dadosCliente.cep, idUsuario];

    const [resultado] = await db.execute(query, valores);

    return {
        id: resultado.insertId,
        ...dadosCliente,
        usuario_id: idUsuario
    };
};


//Função pra listar os clientes no banco de dados
exports.listarTodos = async (idUsuario) => {
    const query = "SELECT * FROM clientes WHERE usuario_id = ? AND ativo = true";
    const valores = [idUsuario];

    const [linhas] = await db.execute(query, valores);

    return linhas
};


//Função pra listar o cliente especifico no banco de dados
exports.listarId = async (idCliente, idUsuario) => {
    const query = "SELECT * FROM clientes WHERE id= ? AND usuario_id = ? AND ativo = true";
    const valores = [idCliente, idUsuario];

    const [linha] = await db.execute(query, valores);

    return linha[0]
};


//Função pra deletar o cliente especifico no banco de dados
//Em sistemas grandes não se deleta, coloca o cliente como inativo, pois senão suas ações passadas ficam órfãs
//É um soft delete
exports.deletar = async (idCliente, idUsuario) => {
    const query = "UPDATE clientes SET ativo = false WHERE id = ? AND id_usuario = ? AND ativo = true";
    const valores = [idCliente, idUsuario];

    const [resultado] = await db.execute(query, valores);

    //retorna se uma linha foi mexida, ou seja "deletada";
    return resultado.affectedRows > 0;
};


//É um soft delete
exports.atualizar = async (dadosCliente, idUsuario) => {
    const query = "UPDATE clientes SET nome = ?, email = ?, cpf = ?, logradouro = ?, numero = ?, bairro = ?, municipio = ?, cep = ? WHERE id = ? AND usuario_id = ? AND ativo = true ";
    const valores = [
        dadosCliente.nome,        
        dadosCliente.email,       
        dadosCliente.cpf,         
        dadosCliente.logradouro,  
        dadosCliente.numero,      
        dadosCliente.bairro,      
        dadosCliente.municipio,   
        dadosCliente.cep,         
        idCliente,                
        idUsuario                 
    ];

    const [resultado] = await db.execute(query, valores);

    //retorna se uma linha foi mexida, ou seja "atualizada";
    return resultado.affectedRows > 0;
};