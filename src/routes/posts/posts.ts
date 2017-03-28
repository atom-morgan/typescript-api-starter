import * as express from 'express';
import PostsCtrl from '../../controllers/posts';
import auth from '../../middleware/auth';

const router = express.Router();

router.route('/')
  .post(auth.isAuthenticated, PostsCtrl.create);

router.route('/user/:id')
  .get(PostsCtrl.getByUserId);

router.route('/:id')
  .get(PostsCtrl.get);

export default router;
