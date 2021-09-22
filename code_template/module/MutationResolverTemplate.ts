import { camelCase, pascalCase } from 'case-anything';
import { BaseTemplate } from '../BaseTemplate';

const TEMPLATE = `
import { Arg, Mutation, Resolver } from 'type-graphql';
import { <MODEL> } from '../../../../models/<MODEL>';
import { <CREATE_ACTION> } from './Actions/<CREATE_ACTION>';
import { Inject } from 'typedi';
import { <CREATE_INPUT>, <UPDATE_INPUT> } from './Actions/Parameters';
import { <DELETE_ACTION> } from './Actions/<DELETE_ACTION>';
import { <UPDATE_ACTION> } from './Actions/<UPDATE_ACTION>';

@Resolver()
export class <NAME> {
    @Inject() <CREATE_ACTION>: <CREATE_ACTION>;
    @Inject() <UPDATE_ACTION>: <UPDATE_ACTION>;
    @Inject() <DELETE_ACTION>: <DELETE_ACTION>;

    @Mutation(() => <MODEL>)
    async <CREATE_METHOD>(@Arg('<MODULE>') <MODULE>: <CREATE_INPUT>): Promise<<MODEL> {
        return await this.<CREATE_ACTION>.execute(<MODULE>);
    }

    @Mutation(() => <MODEL>)
    async <UPDATE_METHOD>(@Arg('uuid') uuid: string, @Arg('<MODULE>') <MODULE>: <UPDATE_INPUT>): Promise<<MODEL>> {
        return await this.<UPDATE_ACTION>.execute(uuid, <MODULE>);
    }

    @Mutation(() => Boolean)
    async <DELETE_METHOD>(@Arg('uuid') uuid: string): Promise<boolean> {
        return await this.<DELETE_ACTION>.execute(uuid);
    }
}
`;

export class MutationResolverTemplate extends BaseTemplate {
    generate(): void {
        const name = pascalCase(`${this.module}_mutation_resolver`);
        const model = pascalCase(`${this.module}_model`);
        const create_action = pascalCase(`create_${this.module}_action`);
        const update_action = pascalCase(`update_${this.module}_action`);
        const delete_action = pascalCase(`delete_${this.module}_action`);
        const create_input = pascalCase(`create_${this.module}_input`);
        const update_input = pascalCase(`update_${this.module}_input`);

        const create_method = camelCase(`create_${this.module}`);
        const update_method = camelCase(`update_${this.module}`);
        const delete_method = camelCase(`delete_${this.module}`);
        const filename = `${name}.ts`;

        const CONTENT = TEMPLATE.replace(/<NAME>/g, name)
            .replace(/<MODULE>/g, this.module)
            .replace(/<MODEL>/g, model)
            .replace(/<CREATE_ACTION>/g, create_action)
            .replace(/<UPDATE_ACTION>/g, update_action)
            .replace(/<DELETE_ACTION>/g, delete_action)
            .replace(/<CREATE_INPUT>/g, create_input)
            .replace(/<UPDATE_INPUT>/g, update_input)
            .replace(/<CREATE_METHOD>/g, create_method)
            .replace(/<UPDATE_METHOD>/g, update_method)
            .replace(/<DELETE_METHOD>/g, delete_method);

        super.generate(`./src/functions/graphql/${this.modules}`, filename, CONTENT);
    }
}
