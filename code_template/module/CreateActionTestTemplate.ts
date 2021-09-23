import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { <CREATE_ACTION> } from './<CREATE_ACTION>';
import { <SEEDER> } from '../../../../../seeder/<SEEDER>';
import faker from 'faker';
import { Logger } from '../../../../../libs/Logger';

TypeORM.useContainer(Container);

test('SUCCESS', async () => {
    await Databases.getConnection();
    const action = Container.get(<CREATE_ACTION>);

    const entity = await action.execute({
        // TODO: Add parameter attribute here
    });
    Logger.info('CREATE_ACTION', entity);

    expect(entity).toHaveProperty('uuid');
    // TODO: Add field checker here
});
`;

export class CreateActionTestTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`create_${this.module}_action_test`) + '.ts';
    }

    get content(): string {
        const CREATE_ACTION = pascalCase(`create_${this.module}_action`);
        const SEEDER = pascalCase(`${this.module}_seeder`);
        return this.process(TEMPLATE, {
            CREATE_ACTION,
            SEEDER,
        });
    }
}
