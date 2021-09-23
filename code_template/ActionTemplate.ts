import { BaseTemplate } from './BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { Service } from 'typedi';
import { BaseAction } from './BaseAction';

@Service()
export class <NAME> extends BaseAction {
    async execute(): Promise<void> {
        // TODO: Define the action logic here
    }
}
`;

export class ActionTemplate extends BaseTemplate {
    private readonly action: string;

    constructor(module: string, action: string) {
        super(module);
        this.action = action;
    }

    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`${this.action}_${this.module}_action`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`${this.action}_${this.module}_action`);

        return this.process(TEMPLATE, {
            NAME,
        });
    }
}
