import { BaseTemplate } from '../BaseTemplate';
import { pascalCase, snakeCase } from 'case-anything';

const TEMPLATE = `
import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { <SEEDER> } from '../../../../../seeder/<SEEDER>';
import { <GET_ACTION> } from './<GET_ACTION>';
import * as faker from 'faker';
import { Logger } from '../../../../../libs/Logger';

test('<UC_NOT_FOUND>', async () => {
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const action = Container.get(<GET_ACTION>);

    try {
        await action.execute(faker.internet.email());
    } catch (error) {
        Logger.info('<UC_NOT_FOUND>', error);
        expect(error).toHaveProperty('code');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('name');

        expect(error.code).toEqual('<UC_NOT_FOUND>');
        expect(error.name).toEqual('<NOT_FOUND>');
        expect(error.message).toEqual('<UC_MODULE> Not Found');
    }
});

test('SUCCESS', async () => {
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const seeder = Container.get(<SEEDER>);
    const entity = await seeder.run();

    const action = Container.get(<GET_ACTION>);

    const found = await action.execute(entity.uuid);
    Logger.info('FOUND', found);

    // TODO: Do found property validation
});
`;

export class GetActionTestTemplate extends BaseTemplate {
    generate() {
        const get_action = pascalCase(`get_${this.module}_action`);
        const seeder = pascalCase(`${this.module}_seeder`);
        const uc_not_found = snakeCase(`${this.module}_not_found`).toUpperCase();
        const not_found = pascalCase(`${this.module}_not_found`);
        const uc_module = pascalCase(this.module);
        const filename = `${get_action}Test.ts`;

        const CONTENT = TEMPLATE.replace(/<GET_ACTION>/g, get_action)
            .replace(/<SEEDER>/g, seeder)
            .replace(/<UC_NOT_FOUND>/g, uc_not_found)
            .replace(/<NOT_FOUND>/g, not_found)
            .replace(/<UC_MODULE>/g, uc_module);

        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
