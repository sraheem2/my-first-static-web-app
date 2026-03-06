const { app } = require('@azure/functions');

// app.http('message', {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         return { body: JSON.stringify({ "text": `Hello, from the API!` }) };
//     }
// });
// const { app } = require('@azure/functions');

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        
        return { body: JSON.stringify({"text": "This message comes from the API"})}
    }
});