import { BaseEntity, Repository, SelectQueryBuilder } from 'typeorm';

export interface PaginationResponse<T> {
    max_page: number;
    data: T[];
    current_page: number;
}

export class RdsRepository<T extends BaseEntity> extends Repository<T> {
    async getList(page = 1, limit = 50): Promise<T[]> {
        const { data } = await this.paginate(this.createQueryBuilder(), page, limit);
        return data;
    }

    async paginate(query: SelectQueryBuilder<T>, page = 1, limit = 50): Promise<PaginationResponse<T>> {
        const count = await query.getCount();
        const modulus = count % limit;
        const max_page = (count - modulus) / limit + (modulus > 0 ? 1 : 0);

        query.limit(limit).offset((page - 1) * limit);
        return {
            max_page,
            current_page: page,
            data: await query.getMany(),
        };
    }
}
