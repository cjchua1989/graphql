import * as joi from 'joiful';

export const mobile = () =>
    joi
        .string()
        .regex(/^09\d{9}$/)
        .max(11)
        .min(11);
