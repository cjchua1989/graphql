import * as yargs from 'yargs';
import { Arguments } from 'yargs';
import { MigrationTemplate } from './code_template/MigrationTemplate';
import { existsSync, mkdirSync } from 'fs';
import * as pluralize from 'pluralize';
import { BaseActionTemplate } from './code_template/module/BaseActionTemplate';
import { CreateActionTemplate } from './code_template/module/CreateActionTemplate';
import { DeleteActionTemplate } from './code_template/module/DeleteActionTemplate';
import { CreateActionTestTemplate } from './code_template/module/CreateActionTestTemplate';
import { MutationResolverTemplate } from './code_template/module/MutationResolverTemplate';
import { QueryResolverTemplate } from './code_template/module/QueryResolverTemplate';
import { DeleteActionTestTemplate } from './code_template/module/DeleteActionTestTemplate';
import { ErrorsTemplate } from './code_template/module/ErrorsTemplate';
import { GetActionTemplate } from './code_template/module/GetActionTemplate';
import { GetActionTestTemplate } from './code_template/module/GetActionTestTemplate';
import { ListActionTemplate } from './code_template/module/ListActionTemplate';
import { ListActionTestTemplate } from './code_template/module/ListActionTestTemplate';
import { PaginationTemplate } from './code_template/module/PaginationTemplate';
import { ParametersTemplate } from './code_template/module/ParametersTemplate';
import { UpdateActionTemplate } from './code_template/module/UpdateActionTemplate';
import { UpdateActionTestTemplate } from './code_template/module/UpdateActionTestTemplate';
import { ModelTemplate } from './code_template/ModelTemplate';
import { RepositoryTemplate } from './code_template/RepositoryTemplate';
import { SeederTemplate } from './code_template/SeederTemplate';
import { ActionTemplate } from './code_template/ActionTemplate';
import { ActionTestTemplate } from './code_template/ActionTestTemplate';

try {
    const commands = yargs.default(process.argv.slice(2));

    commands.command('make:migration <module>', 'Create a migration file', {}, (argv: Arguments) => {
        const module = <string>argv.module;
        new MigrationTemplate(module).generate();
        console.log('Migration file successfully created');
    });

    commands.command(
        'graphql:action <module> <action>',
        'Create a module custom action file',
        {},
        (argv: Arguments) => {
            const module = <string>argv.module;
            const action = <string>argv.action;

            new ActionTemplate(module, action).generate();
            new ActionTestTemplate(module, action).generate();

            console.log('Action file successfully created');
        },
    );

    commands.command('make:seeder <module>', 'Create a seeder, repository and model file', {}, (argv: Arguments) => {
        const module = <string>argv.module;

        new ModelTemplate(module).generate(true);
        new RepositoryTemplate(module).generate(true);
        new SeederTemplate(module).generate();

        console.log('Seeder file successfully created');
    });

    commands.command('make:repository <module>', 'Create a repository and model file', {}, (argv: Arguments) => {
        const module = <string>argv.module;

        new ModelTemplate(module).generate(true);
        new RepositoryTemplate(module).generate();

        console.log('Repository file successfully created');
    });

    commands.command('make:model <module>', 'Create a model file', {}, (argv: Arguments) => {
        const module = <string>argv.module;

        new ModelTemplate(module).generate();

        console.log('Model file successfully created');
    });

    commands.command('graphql:module <module>', 'Create a graphql module', {}, (argv: Arguments) => {
        const module = <string>argv.module;

        if (existsSync(`./src/functions/graphql/modules/${pluralize.default(module)}`))
            throw new Error('GraphQL module already existed');

        mkdirSync(`./src/functions/graphql/modules/${pluralize.default(module)}`);
        mkdirSync(`./src/functions/graphql/modules/${pluralize.default(module)}/Actions`);

        new ModelTemplate(module).generate(true);
        new RepositoryTemplate(module).generate(true);
        new SeederTemplate(module).generate(true);

        new BaseActionTemplate(module).generate();
        new CreateActionTemplate(module).generate();
        new CreateActionTestTemplate(module).generate();
        new DeleteActionTemplate(module).generate();
        new DeleteActionTestTemplate(module).generate();
        new ErrorsTemplate(module).generate();
        new GetActionTemplate(module).generate();
        new GetActionTestTemplate(module).generate();
        new ListActionTemplate(module).generate();
        new ListActionTestTemplate(module).generate();
        new PaginationTemplate(module).generate();
        new ParametersTemplate(module).generate();
        new UpdateActionTemplate(module).generate();
        new UpdateActionTestTemplate(module).generate();
        new MutationResolverTemplate(module).generate();
        new QueryResolverTemplate(module).generate();

        console.log('Module files successfully created');
    });

    commands.strictCommands();
    commands.argv;
} catch (error) {
    console.log(error.message);
}
