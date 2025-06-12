import express from 'express';
import userRoutes from './user.route.js';
import expenseRoutes from './expense.route.js';

const router = express.Router()

router.use('/users', userRoutes)
router.use('/expense', expenseRoutes)

const routes = router;
export default routes
