import { BaseTemplate } from '../BaseTemplate';
import { pascalCase, snakeCase } from 'case-anything';

const TEMPLATE = `
import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { <UPDATE_ACTION> } from './<UPDATE_ACTION>';
import faker from 'faker';
import { Logger } from '../../../../../libs/Logger';
import { <SEEDER> } from '../../../../../seeder/<SEEDER>';

TypeORM.useContainer(Container);

test('<UC_NOT_FOUND>', async () => {
    await Databases.getConnection();
    const action = Container.get(<UPDATE_ACTION>);

    try {
        await action.execute(faker.datatype.uuid(), {
            // TODO: Add here the request details
        });
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
    await Databases.getConnection();
    const seeder = Container.get(<SEEDER>);
    const existing = await seeder.run();

    const action = Container.get(<UPDATE_ACTION>);
    const entity = await action.execute(existing.uuid, {
        // TODO: Add here the request details
    });
    Logger.info('UPDATE_ACTION', entity);

    // TODO: Add here the property validation
});

`;

export class UpdateActionTestTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`update_${this.module}_action_test`) + '.ts';
    }

    get content(): string {
        const UPDATE_ACTION = pascalCase(`update_${this.module}_action`);
        const SEEDER = pascalCase(`${this.module}_seeder`);
        const UC_NOT_FOUND = snakeCase(`${this.module}_not_found`).toUpperCase();
        const NOT_FOUND = pascalCase(`${this.module}_not_found`);
        const UC_MODULE = pascalCase(this.module);

        return this.process(TEMPLATE, {
            UPDATE_ACTION,
            SEEDER,
            UC_NOT_FOUND,
            NOT_FOUND,
            UC_MODULE,
        });
    }
}
