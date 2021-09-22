import { UserRepository } from '../../../../../repositories/UserRepository';
import { UserModel } from '../../../../../models/UserModel';
import { ArgsType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CoreAction } from '../../core/CoreAction';
import { Service } from "typedi";

@ArgsType()
export class ListUsersParams {
    @Field((type) => Int)
    @Min(1)
    page: number;

    @Field((type) => Int)
    @Min(1)
    @Max(50)
    limit: number;
}

@Service()
export class ListUsersAction extends CoreAction {
    constructor(
        @InjectRepository()
        private readonly repository: UserRepository,
    ) {
        super();
    }

    async execute(page: number, limit: number): Promise<UserModel[]> {
        return await this.repository.getList(page, limit);
    }
}
