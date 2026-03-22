const clienteRepository = require("../repositories/clienteRepository");

// Serviço para Criar Cliente
exports.criarCliente = async (dadosCliente, idUsuario) => {
    if (!dadosCliente.nome || !dadosCliente.email || !dadosCliente.cpf) {
        throw new Error("O nome, o e-mail e o cpf são obrigatórios!");
    }

    //põe na forma matematica e valida se é formato email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(dadosCliente.email)) {
        throw new Error("O formato do e-mail é inválido!");
    }

    //tira sinais, deixa só os numeros e faz a checagem
    const cpfLimpo = dadosCliente.cpf.replace(/\D/g, ''); 
    if (cpfLimpo.length !== 11) {
        throw new Error("O CPF deve conter exatamente 11 números!");
    }

    //pra por o cpf limpo no bd
    dadosCliente.cpf = cpfLimpo; 
    
    return await clienteRepository.criar(dadosCliente, idUsuario);
};


exports.listarClientes = async (idUsuario) => {
    return await clienteRepository.listarTodos(idUsuario);
};


exports.listarCliente = async (idCliente, idUsuario) => {
    return await clienteRepository.listarId(idCliente, idUsuario);
};


exports.deletarCliente = async (idCliente, idUsuario) => {
    return await clienteRepository.deletarCliente(idCliente, idUsuario);
};


exports.atualizarCliente = async (dadosCliente, idUsuario) => {
    if (!dadosCliente.nome || !dadosCliente.email || !dadosCliente.cpf) {
        throw new Error("O nome, o e-mail e o cpf são obrigatórios!");
    }

    //põe na forma matematica e valida se é formato email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(dadosCliente.email)) {
        throw new Error("O formato do e-mail é inválido!");
    }

    //tira sinais, deixa só os numeros e faz a checagem
    const cpfLimpo = dadosCliente.cpf.replace(/\D/g, ''); 
    if (cpfLimpo.length !== 11) {
        throw new Error("O CPF deve conter exatamente 11 números!");
    }

    //pra por o cpf limpo no bd
    dadosCliente.cpf = cpfLimpo; 
    
    return await clienteRepository.atualizar(dadosCliente, idUsuario);
}