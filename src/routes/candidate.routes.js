import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validateCandidate } from "../middlewares/validation.js";
import { createCandidateCtrl, getAllCandidatesCtrl } from "../controllers/candidate.controller.js";

const router = Router();

// ✅ Create new candidate
router.post("/", requireAuth, validateCandidate, createCandidateCtrl);

// ✅ Get all candidates (user-specific)
router.get("/", requireAuth, getAllCandidatesCtrl);

export default router;
