import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import PaginatedResponse from '../../core/PaginationResponse';
import { <MODEL> } from '../../../../../models/<MODEL>';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class <NAME> extends PaginatedResponse(<MODEL>) {}
`;

export class PaginationTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`${this.modules}_pagination`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`${this.modules}_pagination`);
        const MODEL = pascalCase(`${this.module}_model`);

        return this.process(TEMPLATE, {
            NAME,
            MODEL,
        });
    }
}
