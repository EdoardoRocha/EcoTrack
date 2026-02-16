import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;



//Configuração da conexão
const conn = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
});

async function connection() {
    try {
        await conn.authenticate()
        console.log("Conexão estabelecida com o MySQL!")
    } catch (error) {
        console.error(error)
    }
}

connection();
export default conn;