import { UserRepository } from '../../../../../repositories/UserRepository';
import { UserModel } from '../../../../../models/UserModel';
import { ArgsType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class ListUsersParams {
    @Field((type) => Int)
    @Min(1)
    page?: number;

    @Field((type) => Int)
    @Min(1)
    @Max(50)
    limit?: number;
}

export class ListUsersAction {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async execute(page: number, limit: number): Promise<UserModel[]> {
        return await this.repository.getList(page, limit);
    }
}
