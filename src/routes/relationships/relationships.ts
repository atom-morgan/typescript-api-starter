import * as express from 'express';
import RelationshipsCtrl from '../../controllers/relationships';
import auth from '../../middleware/auth';

const router = express.Router();

router.route('/')
  .post(auth.isAuthenticated, RelationshipsCtrl.create)
  .delete(auth.isAuthenticated, RelationshipsCtrl.destroy);

export default router;
