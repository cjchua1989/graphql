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
    generate(): void {
        const name = pascalCase(`delete_${this.module}_action`);
        const not_found = pascalCase(`${this.module}_not_found`);
        const filename = `${name}Test.ts`;
        const CONTENT = TEMPLATE.replace(/<NAME>/, name).replace(/<NOT_FOUND>/, not_found);
        super.generate(`./src/functions/graphql/${this.modules}/Actions`, filename, CONTENT);
    }
}
