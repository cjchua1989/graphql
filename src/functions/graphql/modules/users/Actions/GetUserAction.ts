import { UserModel } from '../../../../../models/UserModel';
import { Service } from 'typedi';
import { UserNotFound } from './Errors';
import { BaseAction } from './BaseAction';

@Service()
export class GetUserAction extends BaseAction {
    async execute(id: string): Promise<UserModel> {
        const user = await this.repository.getById(id);
        if (!user) throw new UserNotFound();
        return user;
    }
}
