import { BaseTemplate } from './BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { Field, ObjectType } from 'type-graphql';
import { Model } from './Model';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({
    name: '<MODULES>',
})
export class <NAME> extends Model {
    // TODO: Define the model properties
    // @Field({ description: 'Field description in here' })
    // @Column({
    //     type: 'varchar',
    //     length: 100,
    // })
    // field_name: string;
}

`;

export class ModelTemplate extends BaseTemplate {
    get path(): string {
        return './src/models';
    }

    get filename(): string {
        return pascalCase(`${this.module}_model`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`${this.module}_model`);
        const MODULES = this.modules;

        return this.process(TEMPLATE, {
            NAME,
            MODULES,
        });
    }
}
