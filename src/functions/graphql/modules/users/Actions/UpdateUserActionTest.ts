import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { UpdateUserAction } from './UpdateUserAction';
import faker from 'faker';
import { Logger } from '../../../../../libs/Logger';
import { UserSeeder } from '../../../../../seeder/UserSeeder';

TypeORM.useContainer(Container);

test('USER_NOT_FOUND', async () => {
    await Databases.getConnection();
    const action = Container.get(UpdateUserAction);

    try {
        await action.execute(faker.datatype.uuid(), {
            email: faker.internet.email(),
            mobile: '09' + faker.datatype.number(999999999).toString().padStart(9, '0'),
            name: faker.name.firstName(),
            password: faker.random.alphaNumeric(10),
        });
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

test('EMAIL_EXIST', async () => {
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const user = await seeder.run();

    const action = Container.get(UpdateUserAction);
    try {
        await action.execute(user.uuid, {
            email: user.email,
            mobile: '09' + faker.datatype.number(999999999).toString().padStart(9, '0'),
            name: faker.name.firstName(),
            password: faker.random.alphaNumeric(10),
        });
    } catch (error) {
        Logger.info('EMAIL_EXIST', error);
        expect(error).toHaveProperty('code');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('name');

        expect(error.code).toEqual('EMAIL_EXIST');
        expect(error.name).toEqual('EmailExist');
        expect(error.message).toEqual('Email Address already exist');
    }
});
test('MOBILE_EXIST', async () => {
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const user = await seeder.run();

    const action = Container.get(UpdateUserAction);
    try {
        await action.execute(user.uuid, {
            email: faker.internet.email(),
            mobile: user.mobile,
            name: faker.name.firstName(),
            password: faker.random.alphaNumeric(10),
        });
    } catch (error) {
        Logger.info('MOBILE_EXIST', error);
        expect(error).toHaveProperty('code');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('name');

        expect(error.code).toEqual('MOBILE_EXIST');
        expect(error.name).toEqual('MobileExist');
        expect(error.message).toEqual('Mobile Number already exist');
    }
});
test('SUCCESS', async () => {
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const existing = await seeder.run();

    const action = Container.get(UpdateUserAction);
    const user = await action.execute(existing.uuid, {
        email: faker.internet.email(),
        mobile: '09' + faker.datatype.number(999999999).toString().padStart(9, '0'),
        name: faker.name.firstName(),
        password: faker.random.alphaNumeric(10),
    });
    Logger.info('UPDATE_USER', user);

    expect(user).toHaveProperty('uuid');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('mobile');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
    expect(user).toHaveProperty('deleted_at');
});
