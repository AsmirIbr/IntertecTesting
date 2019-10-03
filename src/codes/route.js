import { Router } from 'express';
import actions from './actions';

const codesRouter = Router();

codesRouter.get('/codes', actions.list);
codesRouter.post('/codes', actions.create);
codesRouter.get('/code/:code', actions.getByCode);
codesRouter.get('/codes/:status', actions.getByStatus);
codesRouter.get('/codeid/:id', actions.getById);
codesRouter.put('/codes/:id', actions.update);
codesRouter.delete('/codedelete/:id', actions.del);


export default codesRouter;