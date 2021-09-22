export class EmailExist extends Error {
    name = 'EmailExist';
    code = 'EMAIL_EXIST';
    constructor() {
        super('Email Address already exist');
    }
}

export class MobileExist extends Error {
    name = 'MobileExist';
    code = 'MOBILE_EXIST';
    constructor() {
        super('Mobile Number already exist');
    }
}

export class UserNotFound extends Error {
    name = 'UserNotFound';
    code = 'USER_NOT_FOUND';
    constructor() {
        super('User Not Found');
    }
}