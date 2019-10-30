import { Router } from 'express';
import actions from './actions';

const userRouter = Router();

// userRouter.post('/signup', actions.create);
userRouter.post('/auth/users', actions.create);
userRouter.get('/auth/users', actions.list);
userRouter.get('/users/:id', actions.get);
userRouter.put('/users/:id', actions.update);
userRouter.delete('/users/:id', actions.del);

export default userRouter;