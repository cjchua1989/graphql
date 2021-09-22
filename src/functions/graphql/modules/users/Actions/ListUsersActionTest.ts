import { ListUsersAction } from './ListUsersAction';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { Databases } from '../../../../../libs/Mysql';
import { Logger } from '../../../../../libs/Logger';
import { UserSeeder } from '../../../../../seeder/UserSeeder';

test('SUCCESS', async () => {
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const seeder = Container.get(UserSeeder);
    await seeder.run();

    const action = Container.get(ListUsersAction);
    const response = await action.execute(1, 50);

    Logger.info('Response', response);

    expect(response).toHaveProperty('items');
    expect(response).toHaveProperty('max_page');
    expect(response).toHaveProperty('current_page');
    expect(response).toHaveProperty('has_more');
    expect(response.items[0]).toHaveProperty('uuid');
    expect(response.items[0]).toHaveProperty('name');
    expect(response.items[0]).toHaveProperty('email');
    expect(response.items[0]).toHaveProperty('mobile');
    expect(response.items[0]).toHaveProperty('created_at');
    expect(response.items[0]).toHaveProperty('updated_at');
    expect(response.items[0]).toHaveProperty('deleted_at');
});
