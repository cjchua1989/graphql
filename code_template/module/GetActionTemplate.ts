import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { <MODEL> } from '../../../../../models/<MODEL>';
import { Service } from 'typedi';
import { <NOT_FOUND> } from './Errors';
import { BaseAction } from './BaseAction';

@Service()
export class <NAME> extends BaseAction {
    async execute(id: string): Promise<<MODEL>> {
        const entity = await this.repository.getById(id);
        if (!entity) throw new <NOT_FOUND>();
        return entity;
    }
}
`;

export class GetActionTemplate extends BaseTemplate {
    generate(): void {
        const model = pascalCase(`${this.module}_model`);
        const name = pascalCase(`get_${this.module}_action`);
        const not_found = pascalCase(`${this.module}_not_found`);
        const filename = `${name}.ts`;

        const CONTENT = TEMPLATE.replace(/<MODEL>/g, model)
            .replace(/<NAME>/g, name)
            .replace(/<NOT_FOUND>/g, not_found);

        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
