import { pascalCase } from 'case-anything';
import { BaseTemplate } from '../BaseTemplate';

const TEMPLATE = `
import { Arg, Args, Query, Resolver } from 'type-graphql';
import { <LIST_ACTION> } from './Actions/<LIST_ACTION>';
import { <MODEL> } from '../../../../models/<MODEL>';
import { Inject } from 'typedi';
import { <GET_ACTION> } from './Actions/<GET_ACTION>';
import { <LIST_PARAMS> } from './Actions/Parameters';
import { <PAGINATION> } from './Actions/<PAGINATION>';

@Resolver()
export class <NAME> {
    @Inject() <GET_ACTION>: <GET_ACTION>;
    @Inject() <LIST_ACTION>: <LIST_ACTION>;

    @Query(() => <MODEL>)
    async <GET_METHOD>(@Arg('id') id: string): Promise<<MODEL>> {
        return await this.<GET_ACTION>.execute(id);
    }

    @Query(() => <PAGINATION>)
    async <LIST_METHOD>(@Args() { page, limit }: <LIST_PARAMS>): Promise<<PAGINATION>> {
        return await this.<LIST_ACTION>.execute(page, limit);
    }
}
`;

export class QueryResolverTemplate extends BaseTemplate {
    generate(): void {
        const name = pascalCase(`${this.module}_query_resolver`);
        const model = pascalCase(`${this.module}_model`);
        const list_action = pascalCase(`list_${this.modules}_action`);
        const get_action = pascalCase(`get_${this.module}_action`);
        const list_params = pascalCase(`list_${this.modules}_input`);
        const pagination = pascalCase(`${this.module}_pagination`);
        const filename = `${name}.ts`;

        const CONTENT = TEMPLATE.replace(/<NAME>/g, name)
            .replace(/<MODULE>/g, this.module)
            .replace(/<MODEL>/g, model)
            .replace(/<LIST_ACTION>/g, list_action)
            .replace(/<GET_ACTION>/g, get_action)
            .replace(/<LIST_PARAMS>/g, list_params)
            .replace(/<PAGINATION>/g, pagination)
            .replace(/<GET_METHOD>/g, this.module)
            .replace(/<LIST_METHOD>/g, this.modules);

        super.generate(`./src/functions/graphql/${this.modules}`, filename, CONTENT);
    }
}
