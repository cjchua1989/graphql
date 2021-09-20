import { UserModel } from '../models/UserModel';
import { EntityRepository } from 'typeorm';
import { RdsRepository } from './RdsRepository';
import { Service } from 'typedi';

@Service()
@EntityRepository(UserModel)
export class UserRepository extends RdsRepository<UserModel> {}
