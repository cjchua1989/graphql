import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { <MODEL> } from '../../../../../models/<MODEL>';
import { Service } from 'typedi';
import { <CREATE_INPUT> } from './Parameters';
import { BaseAction } from './BaseAction';

@Service()
export class <NAME> extends BaseAction {
    async execute(request: <CREATE_INPUT>): Promise<<MODEL>> {
        const entity = new <MODEL>();

        // TODO: ADD CREATION FIELD HERE //

        return this.repository.save(entity);
    }
}
`;

export class CreateActionTemplate extends BaseTemplate {
    generate(): void {
        const name = pascalCase(`create_${this.module}_action`);
        const filename = `${name}.ts`;
        const model = pascalCase(`${this.module}_model`);
        const create_input = pascalCase(`create_${this.module}_input`);
        const CONTENT = TEMPLATE.replace(/<NAME>/g, name)
            .replace(/<MODEL>/g, model)
            .replace(/<CREATE_INPUT>/g, create_input);
        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
