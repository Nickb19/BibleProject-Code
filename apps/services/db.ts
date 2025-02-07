export const pg = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE,
    searchPath: ['knex', 'public'],
});
