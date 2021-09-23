import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { Service } from 'typedi';
import { BaseAction } from './BaseAction';
import { <UPDATE_INPUT> } from './Parameters';
import { <MODEL> } from '../../../../../models/<MODEL>';
import { <NOT_FOUND> } from './Errors';

@Service()
export class <NAME> extends BaseAction {
    async execute(uuid: string, request: <UPDATE_INPUT>): Promise<<MODEL>> {
        const entity = await this.repository.getByUuid(uuid);
        if (!entity) throw new <NOT_FOUND>();

        // TODO: Do validation and update of entity properties

        return await this.repository.save(entity);
    }
}
`;

export class UpdateActionTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`update_${this.module}_action`) + '.ts';
    }

    get content(): string {
        const MODEL = pascalCase(`${this.module}_model`);
        const UPDATE_INPUT = pascalCase(`update_${this.module}_input`);
        const NOT_FOUND = pascalCase(`${this.module}_not_found`);
        const NAME = pascalCase(`update_${this.module}_action`);

        return this.process(TEMPLATE, {
            UPDATE_INPUT,
            MODEL,
            NOT_FOUND,
            NAME,
        });
    }
}
