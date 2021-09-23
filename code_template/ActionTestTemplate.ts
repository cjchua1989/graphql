import { BaseTemplate } from './BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import * as TypeORM from 'typeorm';
import { Container } from 'typedi';
import { Databases } from '../../../../../libs/Mysql';
import { <ACTION> } from './<ACTION>';
import faker from 'faker';
import { Logger } from '../../../../../libs/Logger';

test('SUCCESS', async () => {
    TypeORM.useContainer(Container);
    await Databases.getConnection();
    const action = Container.get(<ACTION>);

    // TODO: Define the action needed to be tested
    // await action.execute();
});
`;

export class ActionTestTemplate extends BaseTemplate {
    private readonly action: string;

    constructor(module: string, action: string) {
        super(module);
        this.action = action;
    }

    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`${this.action}_${this.module}_action_test`) + '.ts';
    }

    get content(): string {
        const ACTION = pascalCase(`${this.action}_${this.module}_action`);

        return this.process(TEMPLATE, {
            ACTION,
        });
    }
}
