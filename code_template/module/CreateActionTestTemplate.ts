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

test('SUCCESS', async () => {
    TypeORM.useContainer(Container);
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
    generate(): void {
        const create_action = pascalCase(`create_${this.module}_action`);
        const seeder = pascalCase(`${this.module}_seeder`);
        const filename = `${create_action}Test.ts`;
        const CONTENT = TEMPLATE.replace(/<CREATE_ACTION>/g, create_action).replace(/<SEEDER>/g, seeder);
        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
