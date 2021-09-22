import { PrimaryColumn, CreateDateColumn, DeleteDateColumn, Generated, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Model extends BaseEntity {
    @Field((type) => ID)
    @PrimaryColumn({
        type: 'varchar',
        length: 50,
    })
    @Generated('uuid')
    public readonly uuid!: string;

    // timestamps
    @Field({ description: 'Date the data was created' })
    @CreateDateColumn({
        type: 'varchar',
    })
    public created_at: string;

    @Field({ description: 'Date the data was updated' })
    @UpdateDateColumn({
        type: 'varchar',
    })
    public updated_at: string;

    @DeleteDateColumn({
        type: 'varchar',
    })
    public deleted_at?: string;
}
