const database = require('../../database/index')

test('Check connection to database', async() => {
    const result = await database.query("SELECT 1;")
    expect(result.rows[0]).toStrictEqual({"?column?" :1})
})

test('Create new table to database', async () => {
    await database.query("CREATE TABLE myTable ();")
    const checkifExists = await database.query("select * from pg_catalog.pg_tables WHERE tablename = \'myTable\';")
    await database.query("drop table myTable")
    expect(checkifExists.rows).toStrictEqual([])
})

