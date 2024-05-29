const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

async function query(querySQL, values) {
  const { rows } = await client.query(querySQL, values);
  return rows;
}

export { query };
