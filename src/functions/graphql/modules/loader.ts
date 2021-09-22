import { NonEmptyArray } from 'type-graphql/dist/interfaces/NonEmptyArray';
import { loadFilesSync } from '@graphql-tools/load-files';
import { GraphQLError, GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-lambda';
import { Logger } from '../../../libs/Logger';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typeorm-typedi-extensions';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import * as TypeORM from 'typeorm';
import { Databases } from '../../../libs/Mysql';

// eslint-disable-next-line @typescript-eslint/ban-types
function resolverLoader(): NonEmptyArray<Function> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const loaded = loadFilesSync<Function>(__dirname + '/**/*Resolver.{ts,js}').map<Function>((item) =>
        Object.values(item).pop(),
    );

    // eslint-disable-next-line @typescript-eslint/ban-types
    return <NonEmptyArray<Function>>loaded;
}

export function loadApollo(): ApolloServer {
    return new ApolloServer({
        schema: ApolloSchema.getInstance(),
        formatError: (error): GraphQLError => {
            Logger.debug('Handler.error', error);
            return {
                locations: undefined,
                name: error.extensions?.exception?.name ?? error.name,
                nodes: undefined,
                originalError: undefined,
                positions: undefined,
                source: undefined,
                stack: error.stack,
                message: error.message,
                path: error.path,
                extensions: {
                    code: error.extensions?.exception?.code ?? 'INTERNAL_SERVER_ERROR',
                },
            };
        },
    });
}

class ApolloSchema {
    private static apollo_schema: ApolloSchema | undefined;
    private schema: GraphQLSchema;

    private constructor() {
        this.schema = TypeGraphQL.buildSchemaSync({
            resolvers: resolverLoader(),
            validate: false,
            container: Container,
        });
    }

    static getInstance(): GraphQLSchema {
        if (!ApolloSchema.apollo_schema) ApolloSchema.apollo_schema = new ApolloSchema();
        return ApolloSchema.apollo_schema.schema;
    }
}

export async function bootstrap(
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback<APIGatewayProxyResult>,
) {
    try {
        // register 3rd party IOC container
        TypeORM.useContainer(Container);
        await Databases.getConnection();

        const server = loadApollo();
        return server.createHandler()(event, context, callback);
    } catch (error) {
        Logger.error('Handler.bootstrap', error);
    }
}
