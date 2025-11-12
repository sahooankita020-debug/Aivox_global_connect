import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validateCandidate } from "../middlewares/validation.js";
import {
  createCandidateCtrl,
  getAllCandidatesCtrl,
  createApplicationCtrl,
} from "../controllers/candidate.controller.js";

const router = Router();

// ✅ Create new candidate
router.post("/", requireAuth, validateCandidate, createCandidateCtrl);

// ✅ Get all candidates (user-specific)
router.get("/", requireAuth, getAllCandidatesCtrl);

// ✅ Create application for candidate
router.post("/:id/applications", requireAuth, createApplicationCtrl);

export default router;
