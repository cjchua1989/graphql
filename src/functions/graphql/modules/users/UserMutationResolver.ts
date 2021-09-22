import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserModel } from '../../../../models/UserModel';
import { CreateUserAction, CreateUserInput } from './Actions/CreateUserAction';
import { Inject } from 'typedi';

@Resolver(() => UserModel)
export class UserMutationResolver {
    @Inject() CreateUserAction: CreateUserAction;

    @Mutation((returns) => UserModel)
    async createUser(@Arg('user') user: CreateUserInput): Promise<UserModel> {
        return await this.CreateUserAction.execute(user);
    }
}
