import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import AuthController from './controllers/AuthController';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', AuthController.auth, upload.array('images'), OrphanagesController.create);
routes.put('/orphanages/:id', AuthController.auth, /*upload.array('images'),*/ OrphanagesController.edit);
routes.delete('/orphanages/:id', AuthController.auth, OrphanagesController.delete);
routes.get('/orphanages/:id/approve', AuthController.auth, OrphanagesController.approve);

routes.post('/user', UsersController.create);
routes.delete('/user', AuthController.auth, UsersController.delete);
routes.post('/login', AuthController.login);

routes.delete('/user/orphanages/:id', AuthController.auth, OrphanagesController.delete);
routes.get('/user/orphanages', AuthController.auth, OrphanagesController.index);
routes.get('/user/orphanages/:id', AuthController.auth, OrphanagesController.show);


export default routes;