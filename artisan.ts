import * as yargs from 'yargs';
import { Arguments } from 'yargs';
import { MigrationTemplate } from './code_template/MigrationTemplate';
import { existsSync, mkdirSync } from 'fs';
import * as pluralize from 'pluralize';
import { BaseActionTemplate } from './code_template/module/BaseActionTemplate';
import { CreateActionTemplate } from './code_template/module/CreateActionTemplate';
import { DeleteActionTemplate } from "./code_template/module/DeleteActionTemplate";
import { CreateActionTestTemplate } from "./code_template/module/CreateActionTestTemplate";
import { MutationResolverTemplate } from "./code_template/module/MutationResolverTemplate";
import { QueryResolverTemplate } from "./code_template/module/QueryResolverTemplate";

try {
    const commands = yargs.default(process.argv.slice(2));

    commands.command(
        'make:migration <table>',
        'Create a migration file',
        () => {},
        (argv: Arguments) => {
            const template = new MigrationTemplate(<string>argv.table);
            template.generate();
            console.log('Migration file successfully created');
        },
    );

    commands.command(
        'graphql <module>',
        'Create a graphql module',
        () => {},
        (argv: Arguments) => {
            const module = <string>argv.module;

            if (existsSync(`./src/functions/graphql/modules/${pluralize(module)}`))
                throw new Error('GraphQL module already existed');

            mkdirSync(`./src/functions/graphql/modules/${pluralize(module)}`);
            mkdirSync(`./src/functions/graphql/modules/${pluralize(module)}/Actions`);

            new BaseActionTemplate(module).generate();
            new CreateActionTemplate(module).generate();
            new CreateActionTestTemplate(module).generate();
            new DeleteActionTemplate(module).generate();
            new MutationResolverTemplate(module).generate();
            new QueryResolverTemplate(module).generate();

            console.log('Module files successfully created');
        },
    );

    commands.strictCommands();
    commands.argv;
} catch (error) {
    console.log(error.message);
}
