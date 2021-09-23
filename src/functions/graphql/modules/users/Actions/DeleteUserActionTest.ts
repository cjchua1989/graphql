import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { DeleteUserAction } from './DeleteUserAction';
import faker from 'faker';
import { Logger } from '../../../../../libs/Logger';
import { UserSeeder } from '../../../../../seeder/UserSeeder';

TypeORM.useContainer(Container);

test('USER_NOT_FOUND', async () => {
    await Databases.getConnection();
    const action = Container.get(DeleteUserAction);

    try {
        await action.execute(faker.datatype.uuid());
    } catch (error) {
        Logger.info('USER_NOT_FOUND', error);
        expect(error).toHaveProperty('code');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('name');

        expect(error.code).toEqual('USER_NOT_FOUND');
        expect(error.name).toEqual('UserNotFound');
        expect(error.message).toEqual('User Not Found');
    }
});

test('SUCCESS', async () => {
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const user = await seeder.run();

    const action = Container.get(DeleteUserAction);
    const response = await action.execute(user.uuid);

    expect(response).toEqual(true);
});
