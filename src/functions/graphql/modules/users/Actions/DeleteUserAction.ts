import { BaseAction } from './BaseAction';
import { Service } from 'typedi';
import { Logger } from '../../../../../libs/Logger';
import { UserNotFound } from './Errors';

@Service()
export class DeleteUserAction extends BaseAction {
    async execute(uuid: string): Promise<boolean> {
        const existing = await this.repository.isExisting(uuid);
        if (!existing) throw new UserNotFound();

        try {
            await this.repository.softDelete({
                uuid,
            });
            return true;
        } catch (error) {
            Logger.error('DeleteUserAction', error);
            return false;
        }
    }
}
