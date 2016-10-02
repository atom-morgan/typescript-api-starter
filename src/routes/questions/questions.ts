import * as express from 'express';
import QuestionsCtrl from '../../controllers/questions';
import auth from '../../middleware/auth';

const router = express.Router();

router.route('/')
  .post(auth.isAuthenticated, QuestionsCtrl.create);

router.route('/:id')
  .get(QuestionsCtrl.get);

export default router;