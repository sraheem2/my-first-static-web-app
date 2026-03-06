const { app } = require('@azure/functions');
// const { TableClient } = require("@azure/data-tables"); 
const sql = require('mssql');

app.setup({ enableHttpStream: true });

const getConnection = async () => {
    return sql.connect(process.env.SQL_CONNECTION_STRING);
};

// GET /api/ListPeople
app.http('ListPeople', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        try {
            await getConnection();
            const result = await sql.query('SELECT TOP 5 * FROM dbo.Person');
            return { status: 200, jsonBody: result.recordset };
        } catch (err) {
            return { status: 500, jsonBody: { error: err.message } };
        }
    }
});

// GET /api/GetPerson?id=1
app.http('GetPerson1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        // const id = req.query.id;
        const id = 1;
        if (!id) return { status: 400, jsonBody: { error: 'Missing id' } };
        try {
            await getConnection();
            const result = await sql.query`SELECT * FROM dbo.Person WHERE Id = ${id}`;
            return { status: 200, jsonBody: result.recordset };
        } catch (err) {
            return { status: 500, jsonBody: { error: err.message } };
        }
    }
});

// POST /api/CreatePerson
app.http('CreatePerson', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        const body = await req.json();
        try {
            await getConnection();
            await sql.query`
                INSERT INTO dbo.Person (Id, FirstName, LastName, Age)
                VALUES (${body.Id}, ${body.FirstName}, ${body.LastName}, ${body.Age})
            `;
            return { status: 200, jsonBody: { success: true } };
        } catch (err) {
            return { status: 500, jsonBody: { error: err.message } };
        }
    }
});

// PUT /api/UpdatePerson?id=1
app.http('UpdatePerson', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        const id = req.query.id;
        const body = await req.json();
        if (!id) return { status: 400, jsonBody: { error: 'Missing id' } };
        try {
            await getConnection();
            await sql.query`
                UPDATE dbo.Person
                SET FirstName=${body.FirstName}, LastName=${body.LastName}, Age=${body.Age}
                WHERE Id=${id}
            `;
            return { status: 200, jsonBody: { success: true } };
        } catch (err) {
            return { status: 500, jsonBody: { error: err.message } };
        }
    }
});

// DELETE /api/DeletePerson?id=1
app.http('DeletePerson5', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        id=5
        // const id = req.query.id;
        if (!id) return { status: 400, jsonBody: { error: 'Missing id' } };
        try {
            await getConnection();
            await sql.query`DELETE FROM dbo.Person WHERE Id=${id}`;
            return { status: 200, jsonBody: { success: true } };
        } catch (err) {
            return { status: 500, jsonBody: { error: err.message } };
        }
    }
});

// module.exports = async function (context, req) {
//     const connStr = process.env.SQL_CONNECTION_STRING; 
//     try {
//         await sql.connect(connStr);
//         const result = await sql.query("SELECT TOP 3 * FROM dbo.Person");
//         context.res = {
//             status: 200,
//             body: result.recordset
//         };
//     } catch (err) {
//         context.res = {
//             status: 500,
//             body: { error: err.message }
//         };
//     }
// };

// const tableName = "sampletable";
// const client = TableClient.fromConnectionString(
//     process.env.DATABASE_CONNECTION_STRING,
//     tableName
// );

// app.setup({
//     enableHttpStream: true,
// });

// console.log(process.env.DATABASE_CONNECTION_STRING);

// app.http('GetItems', {
//     methods: ['GET'],
//     authLevel: 'anonymous',
//     handler: async (req, ctx) => {
//         const items = [];
//         // items.push("test_item1")
//         // items.push("test")
//         for await (const entity of client.listEntities()) {
//             items.push(entity);
//         }
//         return { status: 200, jsonBody: items };
//     }
// });


// // POST endpoint
// app.http('SubmitItem', {
//     methods: ['POST'],
//     authLevel: 'anonymous',
//     handler: async (req, ctx) => {
//         const body = await req.json();
//         const entity = {
//             partitionKey: "itemstest",
//             rowKey: Date.now().toString(),
//             Fruit: body.Fruit,
//             Color: body.Color
//         };
//         await client.createEntity(entity);
//         return { status: 200, jsonBody: { success: true } };
//     }
// });

