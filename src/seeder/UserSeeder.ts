import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories/UserRepository';
import { UserModel } from '../models/UserModel';
import * as faker from 'faker';
import { CoreSeeder, SeederInterface } from './CoreSeeder';

@Service()
export class UserSeeder extends CoreSeeder implements SeederInterface<UserModel> {
    constructor(
        @InjectRepository()
        private readonly repository: UserRepository,
    ) {
        super();
    }

    async run(): Promise<UserModel> {
        const user = new UserModel();

        user.email = faker.internet.email();
        user.mobile = '09' + faker.datatype.number(999999999).toString().padStart(9, '0');
        user.password = faker.random.alphaNumeric(10);
        user.name = faker.name.firstName();

        return this.repository.save(user);
    }
}
