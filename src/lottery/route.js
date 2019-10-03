import { Router } from 'express';
import actions from './actions';
import createlottery from './createLottery';

const lotteryRouter = Router();

lotteryRouter.post('/lottery', actions.create);
lotteryRouter.get('/lottery', actions.list);
lotteryRouter.get('/lottery/:id', actions.getById);
lotteryRouter.delete('/lottery/:id', actions.del);
lotteryRouter.put('/lottery/:id', actions.update);
lotteryRouter.post('/createlottery', createlottery.createLottery);

export default lotteryRouter;