import { Field, InputType } from 'type-graphql';
import { MaxLength, IsEmail, Matches } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../../../../../repositories/UserRepository';
import { UserModel } from '../../../../../models/UserModel';
import { CoreAction } from '../../core/CoreAction';
import { Service } from "typedi";

@InputType()
export class CreateUserInput {
    @Field()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(12)
    @Matches(/^639\d{9}$/)
    mobile: string;

    @Field()
    @MaxLength(100)
    password: string;

    @Field()
    @MaxLength(100)
    name: string;
}

class EmailExist extends Error {
    name = 'EmailExist';
    code = 'EMAIL_EXIST';
    constructor() {
        super('Email Address already exist');
    }
}

class MobileExist extends Error {
    name = 'MobileExist';
    code = 'MOBILE_EXIST';
    constructor() {
        super('Mobile Number already exist');
    }
}

@Service()
export class CreateUserAction extends CoreAction {
    constructor(
        @InjectRepository()
        private readonly repository: UserRepository,
    ) {
        super();
    }

    async execute(request: CreateUserInput): Promise<UserModel> {
        const email_exist = await this.repository.isEmailExisting(request.email);
        if (email_exist) throw new EmailExist();

        const mobile_exist = await this.repository.isMobileExisting(request.mobile);
        if (mobile_exist) throw new MobileExist();

        const user = new UserModel();

        user.email = request.email;
        user.mobile = request.mobile;
        user.password = request.password;
        user.name = request.name;

        return this.repository.save(user);
    }
}
