import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { setIsCompleted } from './store';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';
import { GraphQLError } from 'graphql';

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(
        path.resolve('./apps/services/activity/src/schema.graphql'),
        { encoding: 'utf8' }
    )
);

// Resolvers
// ---------
const resolvers = {
    Mutation: {
        ActivityCompleted: async (_, { articleId }) => {
            try {
                await setIsCompleted(articleId);
                return true;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.CONTENT_SERVICE_PORT) || 6130 },
    });

    console.log('Activity server ready at:', url);
})();
