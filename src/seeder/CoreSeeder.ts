import { Model } from '../models/Model';

export interface SeederInterface<T extends Model> {
    run(): Promise<T>;
}

export abstract class CoreSeeder {}
