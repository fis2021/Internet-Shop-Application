const { Pool } = require("pg")

//change Postgres connection credentials if necessary
const credentials = {
    host: "localhost",
    schemaName: "internet-shop-application",
    port: 5430,
    user: "postgres",
    password: "postgres",

    //Connection configuration
    max : 20,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 3_000
}

//Aliases for tables for avoid code duplicates
//More tables will be added to during development
const SchemaName = '"internet-shop-application"'
const Tables = {
    customers : SchemaName.concat(".", "customers"),
    sellers :   SchemaName.concat(".", "sellers"),
    products :  SchemaName.concat(".", "products"),
    carts :     SchemaName.concat(".", "carts")
}

const pool = new Pool(credentials)


function CheckConnection() {
    pool.connect((err) => {
        if(err) console.error("New connection couldn't be established with database", err.stack)
    })
}
CheckConnection() // Establish a test connection to database


async function query(stmt, params){
    try {
        return await pool.query(stmt, params)
    } catch (err) {
        console.error("Query execution error. ", err.stack)
    }
}

module.exports = {
    Tables : Tables,
    query : query,
    end : async () => { await pool.end() }
};
