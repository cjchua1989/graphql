import { BaseTemplate } from '../BaseTemplate';
import { pascalCase } from 'case-anything';

const TEMPLATE = `
import { BaseAction } from './BaseAction';
import { Service } from 'typedi';
import { Logger } from '../../../../../libs/Logger';
import { <NOT_FOUND> } from './Errors';

@Service()
export class <NAME> extends BaseAction {
    async execute(uuid: string): Promise<boolean> {
        const existing = await this.repository.isExisting(uuid);
        if (!existing) throw new <NOT_FOUND>();

        try {
            await this.repository.softDelete({
                uuid,
            });
            return true;
        } catch (error) {
            Logger.error('<NAME>', error);
            return false;
        }
    }
}
`;

export class DeleteActionTemplate extends BaseTemplate {
    get path(): string {
        return `./src/functions/graphql/modules/${this.modules}/Actions`;
    }

    get filename(): string {
        return pascalCase(`delete_${this.module}_action`) + '.ts';
    }

    get content(): string {
        const NAME = pascalCase(`delete_${this.module}_action`);
        const NOT_FOUND = pascalCase(`${this.module}_not_found`);
        return this.process(TEMPLATE, {
            NAME,
            NOT_FOUND,
        });
    }
}
