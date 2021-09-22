import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../../../../../repositories/UserRepository';
import { UserModel } from '../../../../../models/UserModel';
import { CoreAction } from '../../core/CoreAction';
import { Service } from "typedi";

class UserNotFound extends Error {
    name = 'UserNotFound';
    code = 'USER_NOT_FOUND';
    constructor() {
        super('User Not Found');
    }
}

@Service()
export class GetUserAction extends CoreAction {
    constructor(
        @InjectRepository()
        private readonly repository: UserRepository,
    ) {
        super();
    }

    async execute(id: string): Promise<UserModel> {
        const user = await this.repository.getById(id);
        if (!user) throw new UserNotFound();
        return user;
    }
}
