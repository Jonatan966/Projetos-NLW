import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanagesView';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import { NewRequest } from '../config/globalInterfaces';
import User from '../models/User';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: {pending: false},
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async userList(request: NewRequest, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: {user_id: request.userId, pending: !!request.query.pending},
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOne(id, {
            relations: ['images'],
            where: {pending: false},
        });

        if (orphanage) {
            return response.json(orphanage);
        }
        return response.json({});
    },

    async create(request: NewRequest, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
        
        const orphanagesRepository = getRepository(Orphanage);
    
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename };
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            user_id: request.userId,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    },

    async edit(request: NewRequest, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const id = request.params.id;

        const orphanage = await orphanagesRepository.findOne(id, {where: {user_id: request.userId}});

        if(orphanage) {
            const {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends
            } = request.body;
            
            let requestImages = request.files as Express.Multer.File[];

            if (!requestImages) {
                requestImages = [];
            }

            const images = requestImages.map(image => {
                return { path: image.filename };
            });
    
            const data = {
                id: Number(id),
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends: open_on_weekends === 'true',
                images
            };
                
            let orphanage = orphanagesRepository.create(data);
    
            await orphanagesRepository.save(orphanage);

            return response.status(200).json(orphanage);
        }

        return response.sendStatus(500);
    },

    async delete(req: NewRequest, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOne(req.params.id, {where: {user_id: req.userId}});

        if (orphanage) {
            await orphanagesRepository.delete(orphanage);

            return res.sendStatus(200);
        }

        return res.sendStatus(500);
    },

    async approve(req: NewRequest, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const user = await getRepository(User).findOne(req.userId);

        if (user?.admin) {
            let orphanage = await orphanagesRepository.findOne(req.params.id);
            
            if (orphanage) {
                if (orphanage?.pending) {
                    orphanage.pending = false;
    
                    orphanagesRepository.save(orphanage);
    
                    return res.sendStatus(200);
                }
                return res.status(500).json({message: 'This orphanage is already approved.'});    
            }
            return res.status(500).json({message: 'Orphanage not found.'});    
        }
        return res.sendStatus(401);
    }
};