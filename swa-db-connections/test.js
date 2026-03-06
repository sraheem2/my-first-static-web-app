module.exports = async function (context, req) {
  const conn = process.env.SQL_CONNECTION_STRING;
  context.res = {
    status: 200,
    body: { connection: conn ? "VISIBLE" : "MISSING" }
  };
};