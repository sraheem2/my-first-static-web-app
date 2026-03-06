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

app.http('showtable', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        context.log("Calling showtable function")
        const items = [];
        for await (const entity of client.listEntities()) {
            items.push(entity);
        }
        const fruits = []
        const colors = []
        for (let i = 0; i < items.length; i++){
            tablerow = items[i]
            fruit = tablerow.Fruit
            color = tablerow.Color
            fruits.push(fruit)
            colors.push(color)
        }
        return { status: 200, jsonBody: {"Fruits": fruits, "Colors": colors}};

    }
});
