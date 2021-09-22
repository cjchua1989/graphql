import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserModel } from '../../../../models/UserModel';
import { CreateUserAction } from './Actions/CreateUserAction';
import { Inject } from 'typedi';
import { CreateUserInput, UpdateUserInput } from './Actions/Parameters';
import { DeleteUserAction } from './Actions/DeleteUserAction';
import { UpdateUserAction } from './Actions/UpdateUserAction';

@Resolver()
export class UserMutationResolver {
    @Inject() CreateUserAction: CreateUserAction;
    @Inject() UpdateUserAction: UpdateUserAction;
    @Inject() DeleteUserAction: DeleteUserAction;

    @Mutation(() => UserModel)
    async createUser(@Arg('user') user: CreateUserInput): Promise<UserModel> {
        return await this.CreateUserAction.execute(user);
    }

    @Mutation(() => UserModel)
    async updateUser(@Arg('uuid') uuid: string, @Arg('user') user: UpdateUserInput): Promise<UserModel> {
        return await this.UpdateUserAction.execute(uuid, user);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('uuid') uuid: string): Promise<boolean> {
        return await this.DeleteUserAction.execute(uuid);
    }
}
