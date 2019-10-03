import { Router } from 'express';

import lottery from '../lottery/index';
import users from '../users/index';
import codes from '../codes/index';
import prize from '../prize/index';
import draw from '../draw/index';

const indexRouter = Router();

indexRouter.use(lottery.route);
indexRouter.use(users.route);
indexRouter.use(codes.route);
indexRouter.use(prize.route);
indexRouter.use(draw.route);

export default indexRouter;