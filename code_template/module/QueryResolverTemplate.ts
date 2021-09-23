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
    async <GET_METHOD>(@Arg('uuid') uuid: string): Promise<<MODEL>> {
        return await this.<GET_ACTION>.execute(uuid);
    }

    @Query(() => <PAGINATION>)
    async <LIST_METHOD>(@Args() { page, limit }: <LIST_PARAMS>): Promise<<PAGINATION>> {
        return await this.<LIST_ACTION>.execute(page, limit);
    }
}
`;

export class QueryResolverTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}`;
    }

    get filename(): string {
        return pascalCase(`${this.module}_query_resolver`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`${this.module}_query_resolver`);
        const MODEL = pascalCase(`${this.module}_model`);
        const LIST_ACTION = pascalCase(`list_${this.modules}_action`);
        const GET_ACTION = pascalCase(`get_${this.module}_action`);
        const LIST_PARAMS = pascalCase(`list_${this.modules}_input`);
        const PAGINATION = pascalCase(`${this.modules}_pagination`);
        const GET_METHOD = this.module;
        const LIST_METHOD = this.modules;

        return this.process(TEMPLATE, {
            NAME,
            MODEL,
            LIST_ACTION,
            GET_ACTION,
            LIST_PARAMS,
            PAGINATION,
            GET_METHOD,
            LIST_METHOD,
        });
    }
}
