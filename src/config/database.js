const mysql = require('mysql2/promise');
require('dotenv').config(); // importa o modulo .env e faz ele ser lido

// Cria um estoque de conexões com o banco
// Não precisa ficar abrindo conexao e fechando pra fazer uma query
// O node pega uma conexao e devolve por estoque
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, 
    connectionLimit: 10, //limite de 10 conexoes simultaneas
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Conexão com MYSQL feita com sucesso!');
        connection.release(); // Devolve a conexao pra pool
    })
    .catch(err => {
        console.log('Não deu certo', err.message);
    });

module.exports = pool;