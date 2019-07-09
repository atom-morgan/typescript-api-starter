import * as express from 'express';
import Users from './users';
import Sessions from './sessions';
import Posts from './posts';
import Questions from './questions';
import Relationships from './relationships';
import Test from './test';

const router = express.Router();

router.route('/')
  .get((req: express.Request, res: express.Response) => {
    res.send('Welcome to the TypeScript API!');
  });

router.use('/users', Users);
router.use('/sessions', Sessions);
router.use('/posts', Posts);
router.use('/questions', Questions);
router.use('/relationships', Relationships);

if (process.env.NODE_ENV === 'test') {
  router.use('/test', Test);
}

export default router;
