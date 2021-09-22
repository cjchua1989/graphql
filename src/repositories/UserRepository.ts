import { UserModel } from '../models/UserModel';
import { EntityRepository, Not } from 'typeorm';
import { RdsRepository } from './RdsRepository';

@EntityRepository(UserModel)
export class UserRepository extends RdsRepository<UserModel> {
    async getById(id: string): Promise<UserModel | undefined> {
        return await this.createQueryBuilder()
            .where('email = :id', { id })
            .orWhere('mobile = :id', { id })
            .orWhere('uuid = :id', { id })
            .getOne();
    }

    async isEmailExisting(email: string, exclude = ''): Promise<boolean> {
        const count = await this.count({
            email,
            uuid: Not(exclude),
        });

        return count > 0;
    }

    async isMobileExisting(mobile: string, exclude = ''): Promise<boolean> {
        const count = await this.count({
            mobile,
            uuid: Not(exclude),
        });

        return count > 0;
    }
}
