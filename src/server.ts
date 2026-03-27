import logger from './config/logger.config';
import { connectDB } from './config/db';
import { ApolloServer } from 'apollo-server';
import typeDefs from './typedefs';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

async function start() {
    const serverInfo = await server.listen();
    logger.info(`Graphql server is up on: ${serverInfo.url}`);

    await connectDB();
    logger.info("Database connected!")
}

start();