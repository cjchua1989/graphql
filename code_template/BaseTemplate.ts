import * as pluralize from 'pluralize';
import { existsSync, writeFileSync } from 'fs';

interface IBaseTemplate {
    generate(skip: boolean): void;
}

interface Attributes {
    [key: string]: string;
}

export class BaseTemplate implements IBaseTemplate {
    module: string;
    get path(): string {
        return '';
    }
    get filename(): string {
        return '';
    }
    get content(): string {
        return '';
    }
    get fullpath(): string {
        return `${this.path}/${this.filename}`;
    }

    get modules(): string {
        return pluralize.default(this.module);
    }

    constructor(module: string) {
        this.module = module;
    }

    isExisting(): boolean {
        return existsSync(`${this.fullpath}`);
    }

    generate(skip = false): void {
        if (this.isExisting()) {
            if (skip) return;
            throw new Error(`${this.filename} file already existed`);
        }
        writeFileSync(`${this.fullpath}`, this.content.trim());
    }

    process(template: string, attributes: Attributes): string {
        for (const index in attributes) {
            template = template.replace(new RegExp(`<${index}>`, 'g'), attributes[index]);
        }
        return template;
    }
}
