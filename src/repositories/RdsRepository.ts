import { Repository, SelectQueryBuilder } from 'typeorm';
import { Service } from 'typedi';
import { Model } from '../models/Model';

export interface PaginationResponse<T> {
    max_page: number;
    items: T[];
    current_page: number;
    has_more
}

@Service()
export class RdsRepository<T extends Model> extends Repository<T> {
    async getList(page = 1, limit = 50): Promise<PaginationResponse<T>> {
        return await this.paginate(this.createQueryBuilder(), page, limit);
    }

    async paginate(query: SelectQueryBuilder<T>, page = 1, limit = 50): Promise<PaginationResponse<T>> {
        const count = await query.getCount();
        const modulus = count % limit;
        const max_page = (count - modulus) / limit + (modulus > 0 ? 1 : 0);

        query.limit(limit).offset((page - 1) * limit);
        return {
            max_page,
            current_page: page,
            has_more: max_page > page,
            items: await query.getMany(),
        };
    }

    async getByUuid(uuid: string): Promise<T | undefined> {
        return await this.findOne({ uuid });
    }

    async isExisting(uuid: string): Promise<boolean> {
        const count = await this.count({
            uuid,
        });

        return count > 0;
    }
}
