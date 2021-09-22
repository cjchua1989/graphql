import { Arg, Args, Query, Resolver } from 'type-graphql';
import { ListUsersAction, ListUsersParams } from './Actions/ListUsersAction';
import { UserModel } from '../../../../models/UserModel';
import { Inject } from 'typedi';
import { GetUserAction } from './Actions/GetUserAction';

@Resolver(() => UserModel)
export class UserQueryResolver {
    @Inject() GetUserAction: GetUserAction;
    @Inject() ListUsersAction: ListUsersAction;

    @Query(() => UserModel)
    async user(@Arg('id') id: string): Promise<UserModel> {
        return await this.GetUserAction.execute(id);
    }

    @Query(() => [UserModel])
    async users(@Args() { page, limit }: ListUsersParams): Promise<UserModel[]> {
        return await this.ListUsersAction.execute(page, limit);
    }
}
