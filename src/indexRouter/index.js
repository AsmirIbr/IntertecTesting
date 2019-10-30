import { Router } from 'express';

import auth from '../auth/index';
import authUsers from '../authUsers/index';
import lottery from '../lottery/index';
import users from '../users/index';
import codes from '../codes/index';
import prize from '../prize/index';
import draw from '../draw/index';

const indexRouter = Router();

indexRouter.use('/auth', auth.route);
indexRouter.use(authUsers.route);
indexRouter.use(lottery.route);
indexRouter.use(users.route);
indexRouter.use(codes.route);
indexRouter.use(prize.route);
indexRouter.use(draw.route);

export default indexRouter;