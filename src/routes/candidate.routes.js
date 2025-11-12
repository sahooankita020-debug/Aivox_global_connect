import { Router } from "express";
import { addCandidate, listCandidates, addApplication } from "../controllers/candidate.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// ✅ Create candidate
router.post("/candidates", requireAuth, addCandidate);

// ✅ Get all candidates
router.get("/candidates", requireAuth, listCandidates);

// ✅ Create Application for a specific Candidate
router.post("/candidates/:id/applications", requireAuth, addApplication);

export default router;
