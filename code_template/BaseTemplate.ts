import * as pluralize from 'pluralize';
import { existsSync, writeFileSync } from 'fs';

interface IBaseTemplate {
    generate(path: string, filename: string, content: string): void;
}

export class BaseTemplate implements IBaseTemplate {
    module: string;

    constructor(module: string) {
        this.module = module;
    }

    generate(path: string, filename: string, content: string): void {
        if (existsSync(`${path}/${filename}`)) throw new Error(`${filename} file already existed`);
        writeFileSync(`${path}/${filename}`, content.trim());
    }

    get modules(): string {
        return pluralize(this.module);
    }
}
