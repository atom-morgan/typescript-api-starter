import * as express from 'express';
import UsersCtrl from '../../controllers/users';
import auth from '../../middleware/auth';

const router = express.Router();

router.route('/')
  .post(UsersCtrl.create);

router.route('/:username')
  .get(UsersCtrl.get);

export default router;
