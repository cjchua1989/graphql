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
    async <CREATE_METHOD>(@Arg('<MODULE>') <MODULE>: <CREATE_INPUT>): Promise<<MODEL>> {
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
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}`;
    }

    get filename(): string {
        return pascalCase(`${this.module}_mutation_resolver`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`${this.module}_mutation_resolver`);
        const MODEL = pascalCase(`${this.module}_model`);
        const CREATE_ACTION = pascalCase(`create_${this.module}_action`);
        const UPDATE_ACTION = pascalCase(`update_${this.module}_action`);
        const DELETE_ACTION = pascalCase(`delete_${this.module}_action`);
        const CREATE_INPUT = pascalCase(`create_${this.module}_input`);
        const UPDATE_INPUT = pascalCase(`update_${this.module}_input`);

        const CREATE_METHOD = camelCase(`create_${this.module}`);
        const UPDATE_METHOD = camelCase(`update_${this.module}`);
        const DELETE_METHOD = camelCase(`delete_${this.module}`);
        const MODULE = this.module;

        return this.process(TEMPLATE, {
            NAME,
            MODEL,
            CREATE_ACTION,
            UPDATE_ACTION,
            DELETE_ACTION,
            CREATE_INPUT,
            UPDATE_INPUT,
            CREATE_METHOD,
            UPDATE_METHOD,
            DELETE_METHOD,
            MODULE,
        });
    }
}
