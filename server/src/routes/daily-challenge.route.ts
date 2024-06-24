import { Router } from "express";
import { auth } from "../infra/middleware/middleware.js";
import { DailyChallengeService } from "../services/daily-challenge.service.js";
import { ProgressRequest } from "../interfaces/requests.js";

const router = Router();

const dailyChallenge = new DailyChallengeService();

router.get('/get/:getNextDay', auth, async (req: any, res) => {
    try {
        const userId = req.user;

        const getNextDay = req.params.getNextDay == 'true';

        res.status(201).json(await dailyChallenge.get(userId, getNextDay));
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.patch('/saveProgress', auth, async (req: any, res) => {
    try {
        const progressRequest: ProgressRequest = req.body;        
        const userId = req.user;

        await dailyChallenge.saveProgress(progressRequest, userId);

        res.status(204).json();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

export default router;
