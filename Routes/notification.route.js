import express from "express"
import { sendDailyReminders } from "../Controllers/notification.controller.js"

const router = express.Router()
/**
 * @swagger
 * /api/notifications/send-daily-reminder:
 *   post:
 *     summary: Notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */




router.post("/send-daily-reminder", sendDailyReminders)


const notificationRoute = router

export default notificationRoute