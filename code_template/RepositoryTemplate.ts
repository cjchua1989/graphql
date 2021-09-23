import { BaseTemplate } from './BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { <MODEL> } from '../models/<MODEL>';
import { EntityRepository } from 'typeorm';
import { RdsRepository } from './RdsRepository';

@EntityRepository(<MODEL>)
export class <NAME> extends RdsRepository<<MODEL>> {
    // TODO: Add Query methods here
}

`;

export class RepositoryTemplate extends BaseTemplate {
    get path(): string {
        return './src/repositories';
    }

    get filename(): string {
        return pascalCase(`${this.module}_repository`) + '.ts';
    }

    get content(): string {
        const MODEL = pascalCase(`${this.module}_model`);
        const NAME = pascalCase(`${this.module}_repository`);

        return this.process(TEMPLATE, {
            MODEL,
            NAME,
        });
    }
}
