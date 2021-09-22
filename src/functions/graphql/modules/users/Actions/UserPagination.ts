import PaginatedResponse from '../../core/PaginationResponse';
import { UserModel } from '../../../../../models/UserModel';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class UserPagination extends PaginatedResponse(UserModel) {}
