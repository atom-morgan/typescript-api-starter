import express from 'express';
import Users from './users';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Welcome to the API!');
  });

router.use('/users', Users);

export default router;