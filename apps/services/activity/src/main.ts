import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { setIsCompleted, getActivity } from './service';
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
    Query: {
        getActivity: async (_, { articleId, username }) => {
            try {
                const activity = await getActivity(articleId, username);
                return activity;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        ActivityCompleted: async (_, { articleId, username }) => {
            try {
                await setIsCompleted(articleId, username);
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
