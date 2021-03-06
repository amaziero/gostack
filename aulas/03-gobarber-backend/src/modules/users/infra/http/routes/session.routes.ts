import { Router } from 'express';
import SessionController from '../controllers/SessionsControllers';
import { celebrate, Segments, Joi } from 'celebrate'

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionController.create);

export default sessionsRouter;
