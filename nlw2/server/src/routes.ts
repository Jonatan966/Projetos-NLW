import express from 'express';
import ConnectionsController from './controllers/ConnectionsController';
import ClassesController from './controllers/classesController';

const routes = express.Router();
// GET: Obtem uma informação
// PUT: Atualiza uma informação
// POST: Insere uma informação
// DELETE: Deleta uma informação

// Corpo (Request Boby) - Contém os dados para inserção, atualização ou deleção
// Route Params: Identificar qual recurso será atualizado ou deletado
// Query Params: Geralmente usado para paginação, filtros ou ordenação

routes.get('/classes', ClassesController.index);
routes.post('/classes', ClassesController.create);

routes.get('/connections', ConnectionsController.index);
routes.post('/connections', ConnectionsController.create);

export default routes;