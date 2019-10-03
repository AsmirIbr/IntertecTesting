import { Router } from 'express';
import actions from './actions';

const prizeRouter = Router();

prizeRouter.get('/prize', actions.list);
prizeRouter.post('/prize', actions.create);
prizeRouter.get('/prize/:id', actions.getById);
prizeRouter.put('/prize/:id', actions.update);
prizeRouter.delete('/prize/:id', actions.del);


export default prizeRouter;