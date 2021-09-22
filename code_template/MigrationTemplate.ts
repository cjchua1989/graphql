import { Carbon } from '../src/libs/Carbon';
import { writeFileSync, existsSync } from 'fs';
import { snakeCase } from 'case-anything';
import * as pluralize from 'pluralize';
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
    generate(): void {
        const name = snakeCase(pluralize(this.module));
        const filename = `${Carbon.now().valueOf()}_${this.module}_table.js`;

        if (existsSync(`./migrations/${filename}`)) throw new Error('Migration file already existed');

        const CONTENT = TEMPLATE.replace(/<TABLE>/g, name).trim();
        writeFileSync(`./migrations/${filename}`, CONTENT);
    }
}
