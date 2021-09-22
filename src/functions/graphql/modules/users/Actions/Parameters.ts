import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { IsEmail, Matches, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(12)
    @Matches(/^639\d{9}$/)
    mobile: string;

    @Field()
    @MaxLength(100)
    password: string;

    @Field()
    @MaxLength(100)
    name: string;
}

@InputType()
export class UpdateUserInput {
    @Field()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(12)
    @Matches(/^639\d{9}$/)
    mobile: string;

    @Field()
    @MaxLength(100)
    password: string;

    @Field()
    @MaxLength(100)
    name: string;
}

@ArgsType()
export class ListUsersParams {
    @Field(() => Int, {
        nullable: true,
    })
    @Min(1)
    page?: number;

    @Field((type) => Int, {
        nullable: true,
    })
    @Min(1)
    @Max(50)
    limit?: number;
}
