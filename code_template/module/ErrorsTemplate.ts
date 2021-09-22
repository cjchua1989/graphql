import { BaseTemplate } from '../BaseTemplate';
import { pascalCase, snakeCase } from 'case-anything';

const TEMPLATE = `
export class <NOT_FOUND> extends Error {
    name = '<NOT_FOUND>';
    code = '<UC_NOT_FOUND>';
    constructor() {
        super('<UC_MODULE> Not Found');
    }
}
`;

export class ErrorsTemplate extends BaseTemplate {
    generate(): void {
        const not_found = pascalCase(`${this.module}_not_found`);
        const uc_not_found = snakeCase(`${this.module}_not_found`).toUpperCase();
        const uc_module = pascalCase(this.module);
        const filename = 'Errors.ts';

        const CONTENT = TEMPLATE.replace(/<NOT_FOUND>/g, not_found)
            .replace(/<UC_NOT_FOUND>/g, uc_not_found)
            .replace(/<UC_MODULE>/g, uc_module);

        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
