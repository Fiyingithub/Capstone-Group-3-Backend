import downloadProfile from "../Controllers/download.controller.js";
import express from "express";
import { protectedAction } from "../Middlewares/protected.js";

const router = express.Router();

/**
 * @swagger
 * /api/download/{incomeId}:
 *   get:
 *     summary: Download image by file name(protected)
 *     tags: [Download]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: incomeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image file to download
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/:incomeId", protectedAction, downloadProfile);

const downloadRoutes = router;

export default downloadRoutes;
