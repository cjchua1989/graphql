import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { Service } from 'typedi';
import { BaseAction } from './BaseAction';
import { <PAGINATION> } from './<PAGINATION>';

@Service()
export class <NAME> extends BaseAction {
    async execute(page?: number, limit?: number): Promise<<PAGINATION>> {
        return await this.repository.getList(page, limit);
    }
}
`;

export class ListActionTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`list_${this.modules}_action`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`list_${this.modules}_action`);
        const PAGINATION = pascalCase(`${this.modules}_pagination`);

        return this.process(TEMPLATE, {
            NAME,
            PAGINATION,
        });
    }
}
