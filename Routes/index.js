import express from "express";
import userRoutes from "./user.route.js";
import expenseRoutes from "./expense.route.js";
import incomeRoutes from "./income.route.js";
import downloadRoutes from "./download.route.js";
import notificationRoute from "./notification.route.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/expense", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/download", downloadRoutes);
router.use("/notifications", notificationRoute);

const routes = router;
export default routes;
