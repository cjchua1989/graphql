import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { ArgsType, Field, InputType, Int } from 'type-graphql';
import * as joi from 'joiful';

@InputType()
export class <CREATE_INPUT> {
    // TODO: Add create request schema
    // @Field()
    // @(joi.string().required())
    // field_name: string;
}

@InputType()
export class <UPDATE_INPUT> {
    // TODO: Add update request schema
    // @Field()
    // @(joi.string().required())
    // field_name: string;
}

@ArgsType()
export class <LIST_PARAMS> {
    @Field(() => Int, {
        nullable: true,
    })
    @(joi.number().min(1).optional())
    page?: number;

    @Field(() => Int, {
        nullable: true,
    })
    @(joi.number().min(1).max(100).optional())
    limit?: number;
}
`;

export class ParametersTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return 'Parameters.ts';
    }

    get content(): string {
        const CREATE_INPUT = pascalCase(`create_${this.module}_input`);
        const UPDATE_INPUT = pascalCase(`update_${this.module}_input`);
        const LIST_PARAMS = pascalCase(`list_${this.modules}_input`);

        return this.process(TEMPLATE, {
            CREATE_INPUT,
            UPDATE_INPUT,
            LIST_PARAMS,
        });
    }
}
