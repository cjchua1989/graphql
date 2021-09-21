import { Args, Query, Resolver } from 'type-graphql';
import { ListUsersAction, ListUsersParams } from './Actions/ListUsersAction';
import { UserModel } from '../../../../models/UserModel';
import { UserRepository } from '../../../../repositories/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver((of) => UserModel)
export class UserQueryResolver {
    constructor(
        @InjectRepository()
        private readonly userRepository: UserRepository,
    ) {}

    @Query((returns) => [UserModel])
    async users(@Args() { page, limit }: ListUsersParams): Promise<UserModel[]> {
        const action = new ListUsersAction(this.userRepository);
        return await action.execute(page, limit);
    }
}
