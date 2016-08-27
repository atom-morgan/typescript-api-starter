import express from 'express';
import UsersCtrl from '../../controllers/users';

const router = express.Router();

router.route('/')
  .get(UsersCtrl.get)
  .post(UsersCtrl.create);

export default router;