import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { <LIST_ACTION> } from './<LIST_ACTION>';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { Databases } from '../../../../../libs/Mysql';
import { Logger } from '../../../../../libs/Logger';
import { <SEEDER> } from '../../../../../seeder/<SEEDER>';

TypeORM.useContainer(Container);

test('SUCCESS', async () => {
    await Databases.getConnection();
    const seeder = Container.get(<SEEDER>);
    await seeder.run();

    const action = Container.get(<LIST_ACTION>);
    const response = await action.execute(1, 50);

    Logger.info('Response', response);

    expect(response).toHaveProperty('items');
    expect(response).toHaveProperty('max_page');
    expect(response).toHaveProperty('current_page');
    expect(response).toHaveProperty('has_more');

    // TODO: Add validation of item properties
});
`;

export class ListActionTestTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`list_${this.modules}_action_test`) + '.ts';
    }

    get content(): string {
        const LIST_ACTION = pascalCase(`list_${this.modules}_action`);
        const SEEDER = pascalCase(`${this.module}_seeder`);

        return this.process(TEMPLATE, {
            LIST_ACTION,
            SEEDER,
        });
    }
}
