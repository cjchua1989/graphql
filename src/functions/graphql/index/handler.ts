import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { Logger } from '../../../libs/Logger';
import { bootstrap } from '../modules/loader';
import { Databases } from '../../../libs/Mysql';

export async function execute(
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback<APIGatewayProxyResult>,
): Promise<void> {
    try {
        return await bootstrap(event, context, callback);
    } catch (error) {
        Logger.error('Handler.execute', error);
    } finally {
        await Databases.closeConnection();
    }
}
