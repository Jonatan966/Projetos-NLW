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

routes.post('/user', UsersController.create);
routes.post('/login', AuthController.login);

routes.use(AuthController.auth);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.put('/orphanages/:id', upload.array('images'), OrphanagesController.edit);
routes.delete('/orphanages/:id', OrphanagesController.delete);
routes.post('/orphanages/:id/approve', OrphanagesController.approve);

routes.delete('/user', UsersController.delete);
routes.get('/user/orphanages', OrphanagesController.userList);

export default routes;