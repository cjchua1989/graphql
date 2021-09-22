import { UserModel } from '../../../../../models/UserModel';
import { Service } from 'typedi';
import { EmailExist, MobileExist } from './Errors';
import { CreateUserInput } from './Parameters';
import { BaseAction } from './BaseAction';

@Service()
export class CreateUserAction extends BaseAction {
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
