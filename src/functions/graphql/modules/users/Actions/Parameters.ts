import { ArgsType, Field, InputType, Int } from 'type-graphql';
import * as joi from 'joiful';
import { mobile } from '../../core/CustomValidator';

@InputType()
export class CreateUserInput {
    @Field()
    @(joi.string().email().max(50).required())
    email: string;

    @Field()
    @(mobile().required())
    mobile: string;

    @Field()
    @(joi.string().max(100).required())
    password: string;

    @Field()
    @(joi.string().max(100).required())
    name: string;
}

@InputType()
export class UpdateUserInput {
    @Field()
    @(joi.string().email().max(50).required())
    email: string;

    @Field()
    @(mobile().required())
    mobile: string;

    @Field()
    @(joi.string().max(100).required())
    password: string;

    @Field()
    @(joi.string().max(100).required())
    name: string;
}

@ArgsType()
export class ListUsersParams {
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
