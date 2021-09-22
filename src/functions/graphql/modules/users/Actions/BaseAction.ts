import { CoreAction } from '../../core/CoreAction';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../../../../../repositories/UserRepository';

export class BaseAction extends CoreAction {
    constructor(
        @InjectRepository()
        protected readonly repository: UserRepository,
    ) {
        super();
    }
}
