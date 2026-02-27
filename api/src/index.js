const { app } = require('@azure/functions');
const { TableClient } = require("@azure/data-tables"); // Table Storage SDK

app.setup({
    enableHttpStream: true,
});

// template
// app.http('FunctionName', {
//     methods: ['GET'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         // logic comes here
//         return { status: 200, jsonBody: result };
//     }
// });

//
app.http('GetItems', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        // const client = TableClient.fromConnectionString(
        //     process.env.AZURE_STORAGE_CONNECTION_STRING,
        //     "sampletable"
        // );
        const items = [];
        items.push("test_item1")
        items.push("test")
        // for await (const entity of client.listEntities()) {
        //     items.push(entity);
        // }
        return { status: 200, jsonBody: items };
    }
});


// POST endpoint
app.http('SubmitItem', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, ctx) => {
        const body = await req.json();
        const client = TableClient.fromConnectionString(
            process.env.AZURE_STORAGE_CONNECTION_STRING,
            "sampletable"
        );
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


