import * as express from 'express';
import SessionsCtrl from '../../controllers/sessions';

const router = express.Router();

router.route('/')
  .post(SessionsCtrl.create);

export default router;