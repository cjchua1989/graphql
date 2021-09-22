import { Service } from 'typedi';
import { BaseAction } from './BaseAction';
import { UserPagination } from './UserPagination';

@Service()
export class ListUsersAction extends BaseAction {
    async execute(page?: number, limit?: number): Promise<UserPagination> {
        return await this.repository.getList(page, limit);
    }
}
