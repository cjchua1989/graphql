import { Service } from 'typedi';
import { BaseAction } from './BaseAction';
import { UpdateUserInput } from './Parameters';
import { UserModel } from '../../../../../models/UserModel';
import { EmailExist, MobileExist, UserNotFound } from './Errors';

@Service()
export class UpdateUserAction extends BaseAction {
    async execute(uuid: string, request: UpdateUserInput): Promise<UserModel> {
        const user = await this.repository.getByUuid(uuid);
        if (!user) throw new UserNotFound();

        const email_exist = await this.repository.isEmailExisting(request.email, uuid);
        if (email_exist) throw new EmailExist();

        const mobile_exist = await this.repository.isMobileExisting(request.mobile, uuid);
        if (mobile_exist) throw new MobileExist();

        user.email = request.email;
        user.mobile = request.mobile;
        user.name = request.name;
        user.password = request.password;

        return await this.repository.save(user);
    }
}
