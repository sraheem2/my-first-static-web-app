const { app } = require('@azure/functions');
const { TableClient } = require("@azure/data-tables"); 

const tableName = "sampletable";
const client = TableClient.fromConnectionString(
    process.env.DATABASE_CONNECTION_STRING,
    tableName
);

app.setup({
    enableHttpStream: true,
});

console.log(process.env.DATABASE_CONNECTION_STRING);

app.http('GetItems', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        const items = [];
        // items.push("test_item1")
        // items.push("test")
        for await (const entity of client.listEntities()) {
            items.push(entity);
        }
        return { status: 200, jsonBody: items };
    }
});


// POST endpoint
app.http('SubmitItem', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        const body = await req.json();
        const entity = {
            partitionKey: "itemstest",
            rowKey: Date.now().toString(),
            Fruit: body.Fruit,
            Color: body.Color
        };
        await client.createEntity(entity);
        return { status: 200, jsonBody: { success: true } };
    }
});

