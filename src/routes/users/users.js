import express from 'express';
import UsersCtrl from '../../controllers/users';
import auth from '../../middleware/auth';

const router = express.Router();

router.route('/')
  .get(auth.isAuthenticated, UsersCtrl.get)
  .post(UsersCtrl.create);

export default router;