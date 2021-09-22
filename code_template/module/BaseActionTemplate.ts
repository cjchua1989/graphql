import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { CoreAction } from '../../core/CoreAction';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { <REPOSITORY> } from '../../../../../repositories/<REPOSITORY>';

export class BaseAction extends CoreAction {
    constructor(
        @InjectRepository()
        protected readonly repository: <REPOSITORY>,
    ) {
        super();
    }
}
`;

export class BaseActionTemplate extends BaseTemplate {
    generate(): void {
        const filename = 'BaseAction.ts';
        const repository = pascalCase(`${this.module}_repository`);
        const CONTENT = TEMPLATE.replace(/<REPOSITORY>/g, repository);
        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
