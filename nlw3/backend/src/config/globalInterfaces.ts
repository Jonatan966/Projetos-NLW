import {Request} from 'express';

export interface EnvProps extends NodeJS.ProcessEnv {
    SECRET_KEY: string;
}

export interface NewRequest extends Request {
    userId?: string;
}

