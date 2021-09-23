export class EmailExist extends Error {
    name = 'EmailExist';
    code = 'EMAIL_EXIST';
    message = 'Email Address already exist';
}

export class MobileExist extends Error {
    name = 'MobileExist';
    code = 'MOBILE_EXIST';
    message = 'Mobile Number already exist';
}

export class UserNotFound extends Error {
    name = 'UserNotFound';
    code = 'USER_NOT_FOUND';
    message = 'User Not Found';
}