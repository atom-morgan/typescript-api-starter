import * as express from 'express';
import TestCtrl from '../../controllers/test';

const router = express.Router();

router.route('/')
  .delete(TestCtrl.destroy);

export default router;
