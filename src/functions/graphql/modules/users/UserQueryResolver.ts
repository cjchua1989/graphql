import { Arg, Args, Query, Resolver } from 'type-graphql';
import { ListUsersAction } from './Actions/ListUsersAction';
import { UserModel } from '../../../../models/UserModel';
import { Inject } from 'typedi';
import { GetUserAction } from './Actions/GetUserAction';
import { ListUsersParams } from './Actions/Parameters';
import { UserPagination } from './Actions/UserPagination';

@Resolver()
export class UserQueryResolver {
    @Inject() GetUserAction: GetUserAction;
    @Inject() ListUsersAction: ListUsersAction;

    @Query(() => UserModel)
    async user(@Arg('id') id: string): Promise<UserModel> {
        return await this.GetUserAction.execute(id);
    }

    @Query(() => UserPagination)
    async users(@Args() { page, limit }: ListUsersParams): Promise<UserPagination> {
        return await this.ListUsersAction.execute(page, limit);
    }
}
