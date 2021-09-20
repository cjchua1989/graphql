import { Field, ObjectType } from 'type-graphql';
import { Model } from './Model';
import { Column, Entity } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@ObjectType()
@Entity({
    name: 'users',
})
export class UserModel extends Model {
    @Field({ description: 'Email address of the user' })
    @Column({
        type: 'varchar',
        length: 100,
    })
    email: string;

    @Field({ description: 'Mobile number of the user in 639XXXXXXXXX format' })
    @Column({
        type: 'varchar',
        length: 11,
    })
    mobile: string;

    @Column({
        type: 'text',
        name: 'password',
    })
    private _password: string;

    set password(value: string) {
        const salt = genSaltSync(5);
        this._password = hashSync(value, salt);
    }

    get password(): string {
        return this._password;
    }
}
