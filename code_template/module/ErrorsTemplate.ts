import { BaseTemplate } from '../BaseTemplate';
import { pascalCase, snakeCase } from 'case-anything';

const TEMPLATE = `
export class <NOT_FOUND> extends Error {
    name = '<NOT_FOUND>';
    code = '<UC_NOT_FOUND>';
    message = '<UC_MODULE> Not Found';
}
`;

export class ErrorsTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return 'Errors.ts';
    }

    get content(): string {
        const NOT_FOUND = pascalCase(`${this.module}_not_found`);
        const UC_NOT_FOUND = snakeCase(`${this.module}_not_found`).toUpperCase();
        const UC_MODULE = pascalCase(this.module);

        return this.process(TEMPLATE, {
            NOT_FOUND,
            UC_NOT_FOUND,
            UC_MODULE,
        });
    }
}
