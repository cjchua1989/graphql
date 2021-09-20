import 'reflect-metadata';
import { Context, APIGatewayProxyEvent, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';

import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';

import { Container } from 'typeorm-typedi-extensions';

import { Databases } from '../../../libs/Mysql';
import { GraphQLSchema } from 'graphql';
import { UserQueryResolver } from '../modules/users/UserQueryResolver';
import { Logger } from '../../../libs/Logger';

let SCHEMA: GraphQLSchema | undefined;

async function bootstrap(event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>) {
    // register 3rd party IOC container
    TypeORM.useContainer(Container);
    await Databases.getConnection();

    // build TypeGraphQL executable schema
    const schema =
        SCHEMA ||
        (await TypeGraphQL.buildSchema({
            resolvers: [UserQueryResolver],
            validate: false,
            container: Container,
        }));

    const server = new ApolloServer({ schema });
    return server.createHandler()(event, context, callback);
}

export async function execute(
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback<APIGatewayProxyResult>,
): Promise<void> {
    try {
        return await bootstrap(event, context, callback);
    } catch (error) {
        Logger.error('Query', error);
    }
}
