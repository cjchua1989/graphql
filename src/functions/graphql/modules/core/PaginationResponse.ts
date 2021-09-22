import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass {
        // here we use the runtime argument
        @Field(() => [TItemClass])
        // and here the generic type
        items: TItem[];

        @Field(() => Int)
        max_page: number;

        @Field(() => Int)
        current_page: number;

        @Field(() => Boolean)
        has_more: boolean;
    }

    return PaginatedResponseClass;
}
