import { Router } from "express";
import { auth } from "../infra/middleware/middleware.js";
import { DailyChallengeService } from "../services/daily-challenge.service.js";
import { AddPointsRequest } from "../interfaces/requests.js";

const router = Router();

const dailyChallenge = new DailyChallengeService();

router.get('/get', auth, async (req: any, res) => {
    try {
        const userId = req.user;

        res.status(201).json(await dailyChallenge.get(userId));
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.patch('/addPoints', auth, async (req: any, res) => {
    try {
        const addPointsRequestRequest: AddPointsRequest = req.body;        
        const userId = req.user;

        await dailyChallenge.addPoints(addPointsRequestRequest, userId)

        res.status(204).json();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

export default router;
