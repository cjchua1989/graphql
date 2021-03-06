import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { <MODEL> } from '../../../../../models/<MODEL>';
import { Service } from 'typedi';
import { <NOT_FOUND> } from './Errors';
import { BaseAction } from './BaseAction';

@Service()
export class <NAME> extends BaseAction {
    async execute(uuid: string): Promise<<MODEL>> {
        const entity = await this.repository.getByUuid(uuid);
        if (!entity) throw new <NOT_FOUND>();
        return entity;
    }
}
`;

export class GetActionTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`get_${this.module}_action`) + '.ts';
    }

    get content(): string {
        const MODEL = pascalCase(`${this.module}_model`);
        const NAME = pascalCase(`get_${this.module}_action`);
        const NOT_FOUND = pascalCase(`${this.module}_not_found`);

        return this.process(TEMPLATE, {
            MODEL,
            NAME,
            NOT_FOUND,
        });
    }
}
