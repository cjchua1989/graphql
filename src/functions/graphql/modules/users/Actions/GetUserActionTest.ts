import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { UserSeeder } from '../../../../../seeder/UserSeeder';
import { GetUserAction } from './GetUserAction';
import * as faker from 'faker';
import { Logger } from '../../../../../libs/Logger';

test('USER_NOT_FOUND', async () => {
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const action = Container.get(GetUserAction);

    try {
        await action.execute(faker.internet.email());
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
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const user = await seeder.run();

    const action = Container.get(GetUserAction);

    const by_uuid = await action.execute(user.uuid);
    Logger.info('ByUuid', by_uuid);

    expect(by_uuid).toHaveProperty('uuid');
    expect(by_uuid).toHaveProperty('name');
    expect(by_uuid).toHaveProperty('email');
    expect(by_uuid).toHaveProperty('mobile');
    expect(by_uuid).toHaveProperty('created_at');
    expect(by_uuid).toHaveProperty('updated_at');
    expect(by_uuid).toHaveProperty('deleted_at');

    const by_email = await action.execute(user.email);
    Logger.info('ByEmail', by_email);

    expect(by_email).toHaveProperty('uuid');
    expect(by_email).toHaveProperty('name');
    expect(by_email).toHaveProperty('email');
    expect(by_email).toHaveProperty('mobile');
    expect(by_email).toHaveProperty('created_at');
    expect(by_email).toHaveProperty('updated_at');
    expect(by_email).toHaveProperty('deleted_at');

    const by_mobile = await action.execute(user.mobile);
    Logger.info('ByMobile', by_mobile);

    expect(by_mobile).toHaveProperty('uuid');
    expect(by_mobile).toHaveProperty('name');
    expect(by_mobile).toHaveProperty('email');
    expect(by_mobile).toHaveProperty('mobile');
    expect(by_mobile).toHaveProperty('created_at');
    expect(by_mobile).toHaveProperty('updated_at');
    expect(by_mobile).toHaveProperty('deleted_at');
});
