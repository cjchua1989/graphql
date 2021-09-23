import { Carbon } from '../src/libs/Carbon';
import { snakeCase } from 'case-anything';
import { BaseTemplate } from './BaseTemplate';

const TEMPLATE = `
const up =
    'CREATE TABLE \`<TABLE>\` ( ' +
    '  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
    '  \`uuid\` VARCHAR(50) NOT NULL, ' +
    '  \`created_at\` DATETIME NOT NULL DEFAULT NOW(),  ' +
    '  \`updated_at\` DATETIME NOT NULL DEFAULT NOW(), ' +
    '  \`deleted_at\` DATETIME NULL, ' +
    '  PRIMARY KEY (\`id\`), ' +
    '  UNIQUE INDEX \`uuid_UNIQUE\` (\`uuid\` ASC));';
const down = 'DROP TABLE \`<TABLE>\`;';
module.exports = {
    up,
    down
}
`;

export class MigrationTemplate extends BaseTemplate {
    get path(): string {
        return `./migrations`;
    }

    get filename(): string {
        return `${Carbon.now().valueOf()}_${this.module}_table.js`;
    }

    get content(): string {
        const TABLE = snakeCase(this.modules);
        return this.process(TEMPLATE, {
            TABLE,
        });
    }
}
