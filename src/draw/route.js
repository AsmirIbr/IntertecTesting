import { Router } from 'express';
import actions from './actions';

const drawRouter = Router();

drawRouter.get('/draw', actions.list);
drawRouter.get('/draws/:id', actions.get);
drawRouter.post('/draw/:id', actions.create);
drawRouter.get('/draw/:id', actions.getByPrizeId);
export default drawRouter;