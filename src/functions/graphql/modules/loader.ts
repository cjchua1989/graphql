import { NonEmptyArray } from 'type-graphql/dist/interfaces/NonEmptyArray';
import { loadFilesSync } from '@graphql-tools/load-files';

export enum Type {
    QUERY,
    MUTATION,
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function loader(type: Type): NonEmptyArray<Function> {
    const suffix = type === Type.QUERY ? 'QueryResolver.{ts,js}' : 'MutationResolver.{ts,js}';
    // eslint-disable-next-line @typescript-eslint/ban-types
    const loaded = loadFilesSync<Function>(__dirname + '/**/*' + suffix).map<Function>((item) =>
        Object.values(item).pop(),
    );

    // eslint-disable-next-line @typescript-eslint/ban-types
    return <NonEmptyArray<Function>>loaded;
}
