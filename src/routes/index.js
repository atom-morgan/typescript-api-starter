import express from 'express';
import Users from './users';
import Sessions from './sessions';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Welcome to the API!');
  });

router.use('/users', Users);
router.use('/sessions', Sessions);

export default router;