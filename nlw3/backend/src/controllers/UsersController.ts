import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import { NewRequest } from '../config/globalInterfaces';

import User from '../models/User';

export default {
    async create(req: Request, res: Response) {
        const {email, password} = req.body;
        const userRepository = getRepository(User);

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });

        await schema.validate({email, password}, {
            abortEarly: false
        });

        const user = userRepository.create({email, password: await bcrypt.hash(password, 7)});

        await userRepository.save(user);

        return res.sendStatus(201);
    },

    async delete(req: NewRequest, res: Response) {
        const userRepository = getRepository(User);
        
        const user = await userRepository.findOne(req.userId);

        if (user) {
            await userRepository.delete(user);

            return res.sendStatus(200);
        }
        return res.sendStatus(500);
    }
}