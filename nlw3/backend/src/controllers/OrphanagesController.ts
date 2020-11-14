import { Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanagesView';
import orphanageCardsView from '../views/orphanageCardsView';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import { NewRequest } from '../config/globalInterfaces';

export default {
    async index(request: NewRequest, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        let orphanages = [] as Orphanage[];
        let where = {pending: false} as any;

        if (request.user) {
            if (request.query.my) {
                where = {
                    pending: !!request.query.pending,
                    user: request.user?.id
                }
            }
            else if (request.user?.admin) {
                where = {
                    pending: !!request.query.pending
                };       
            }
            else return response.json([]);
        }

        orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where
        });        

        if (request.query.complete) {
            return response.json(orphanageView.renderMany(orphanages));
        }
        return response.json(orphanageCardsView.renderMany(orphanages));
    },

    async show(request: NewRequest, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        let where = {pending: false} as any;

        if (request.user) {
            if (request.user.admin) {
                where = {};
            }
            else {
                where = {
                    user: request.user?.id
                };
            }
        }

        const orphanage = await orphanagesRepository.findOne(id, {
            relations: ['images'],
            where
        });

        if (orphanage) {
            if (request.query.complete) {
                return response.json(orphanageView.render(orphanage));
            }
            return response.json(orphanageCardsView.render(orphanage));    
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
            user: request.user?.id,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            pending: !request.user?.admin,
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

        const coiso = await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(coiso);
    },

    async edit(request: NewRequest, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const id = request.params.id;

        const orphanage = await orphanagesRepository.findOne(id, {
            where: {
                user: request.user?.id
            }
        });

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

            // const images = requestImages.map(image => {
            //     return { path: image.filename };
            // });
    
            const data = {
                id: Number(id),
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends: !!open_on_weekends,
                /*images*/
            };
                
            let orphanage = orphanagesRepository.create(data);
    
            await orphanagesRepository.save(orphanage);

            return response.status(200).json(orphanage);
        }

        return response.sendStatus(500);
    },

    async delete(req: NewRequest, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        let where = {
            user: req.user?.id, 
            pending: false
        } as any;

        if (req.user?.admin) {
            where = {};
        }

        const orphanage = await orphanagesRepository.findOne(req.params.id, {where});

        if (orphanage) {
            await orphanagesRepository.delete(orphanage);

            return res.sendStatus(200);
        }

        return res.sendStatus(500);
    },

    async approve(req: NewRequest, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        
        if (req.user?.admin) {
            let orphanage = await orphanagesRepository.findOne(req.params.id);
            
            if (orphanage) {
                if (orphanage?.pending) {
                    orphanage.pending = false;
    
                    orphanagesRepository.save(orphanage);
    
                    return res.sendStatus(200);
                }
                return res.status(500).json({
                    message: 'This orphanage is already approved.'
                });    
            }
            return res.status(500).json({
                message: 'Orphanage not found.'
            });    
        }
        return res.sendStatus(401);
    }
};