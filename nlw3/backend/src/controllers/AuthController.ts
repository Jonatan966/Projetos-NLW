import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import {promisify} from 'util';
import * as bcrypt from 'bcrypt';

import User from "../models/User";
import { EnvProps, NewRequest } from "../config/globalInterfaces";

export default {
    async auth(req: NewRequest, res: Response, nxt: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ error: "No token provided" });
        }

        const [scheme, token] = authHeader.split(" ");

        try {
            const decoded = await promisify(jwt.verify)(token, (process.env as EnvProps).SECRET_KEY);
            const user = await getRepository(User).findOne((decoded as {id: string}).id);

            if (user) {
                req.user = user;

                return nxt();    
            }

            throw "User not found";
        } catch (err) {
            return res.status(401).send({ error: "Token invalid" });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userRepository = getRepository(User);
        
            const user = await userRepository.findOne({email});
        
            if (!user || !await bcrypt.compare(password, user.password)) {
              return res.status(400).json({ error: "Username or password is invalid" });
            }

            return res.json({
                user: {email: user.email},
                token: jwt.sign({id: user.id}, (process.env as EnvProps).SECRET_KEY, {expiresIn: "7d"})
            });
          } catch (err) {
              console.log(err);
            return res.status(400).json({ error: "User authentication failed" });
        }
    }
}