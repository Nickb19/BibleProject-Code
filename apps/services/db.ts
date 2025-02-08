export const pg = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE,
    searchPath: ['knex', 'public'],
    pool: { min: 1, max: 3 },
});
