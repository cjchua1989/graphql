import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { CreateUserAction } from './CreateUserAction';
import { UserSeeder } from '../../../../../seeder/UserSeeder';
import faker from 'faker';
import { Logger } from '../../../../../libs/Logger';

test('EMAIL_EXIST', async () => {
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const user = await seeder.run();

    const action = Container.get(CreateUserAction);
    try {
        await action.execute({
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
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    const user = await seeder.run();

    const action = Container.get(CreateUserAction);
    try {
        await action.execute({
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
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const action = Container.get(CreateUserAction);

    const user = await action.execute({
        email: faker.internet.email(),
        mobile: '09' + faker.datatype.number(999999999).toString().padStart(9, '0'),
        name: faker.name.firstName(),
        password: faker.random.alphaNumeric(10),
    });
    Logger.info('CREATE_USER', user);

    expect(user).toHaveProperty('uuid');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('mobile');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
    expect(user).toHaveProperty('deleted_at');
});
