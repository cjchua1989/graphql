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
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`create_${this.module}_action`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`create_${this.module}_action`);
        const MODEL = pascalCase(`${this.module}_model`);
        const CREATE_INPUT = pascalCase(`create_${this.module}_input`);

        return this.process(TEMPLATE, {
            NAME,
            MODEL,
            CREATE_INPUT,
        });
    }
}
