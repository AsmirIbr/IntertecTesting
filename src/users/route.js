import { Router } from 'express';
import actions from './actions';

const usersRouter = Router();

usersRouter.get('/users', actions.list);
usersRouter.post('/users', actions.create);
usersRouter.get('/users/:email', actions.getByEmail);

export default usersRouter;