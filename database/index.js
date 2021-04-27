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
    sellers :   SchemaName.concat(".", "sellers")
}

const pool = new Pool(credentials)

async function query(stmt, params){
    pool.connect((err) => {
        if(err) console.err("New connection couldn't be established with database", err.stack)
    })
    return await pool.query(stmt, params)
}

module.exports = {
    Tables : Tables,
    query : query,
    end : async () => { await pool.end() }
};