const { app } = require('@azure/functions');
const { TableClient } = require("@azure/data-tables"); // Table Storage SDK

app.setup({
    enableHttpStream: true,
});

app.http('GetItems', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const tableName = "sampletable"; // storage account is called webapptestaccount008

        const client = TableClient.fromConnectionString(conn, tableName);

        const items = [];
        for await (const entity of client.listEntities()) {
            items.push(entity);
        }

        return {
            status: 200,
            jsonBody: items
        };
    }
});