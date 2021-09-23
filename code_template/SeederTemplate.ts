import { BaseTemplate } from './BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { <REPOSITORY> } from '../repositories/<REPOSITORY>';
import { <MODEL> } from '../models/<MODEL>';
import * as faker from 'faker';
import { CoreSeeder, SeederInterface } from './CoreSeeder';

@Service()
export class <NAME> extends CoreSeeder implements SeederInterface<<MODEL>> {
    constructor(
        @InjectRepository()
        private readonly repository: <REPOSITORY>,
    ) {
        super();
    }

    async run(): Promise<<MODEL>> {
        const entity = new <MODEL>();

        // TODO: Define the seed information

        return this.repository.save(entity);
    }
}
`;

export class SeederTemplate extends BaseTemplate {
    get path(): string {
        return './src/seeder';
    }

    get filename(): string {
        return pascalCase(`${this.module}_seeder`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`${this.module}_seeder`);
        const MODEL = pascalCase(`${this.module}_model`);
        const REPOSITORY = pascalCase(`${this.module}_repository`);

        return this.process(TEMPLATE, {
            NAME,
            MODEL,
            REPOSITORY,
        });
    }
}
