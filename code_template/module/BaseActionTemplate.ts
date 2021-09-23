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
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }
    get filename(): string {
        return 'BaseAction.ts';
    }
    get content(): string {
        const REPOSITORY = pascalCase(`${this.module}_repository`);
        return this.process(TEMPLATE, {
            REPOSITORY,
        });
    }
}
