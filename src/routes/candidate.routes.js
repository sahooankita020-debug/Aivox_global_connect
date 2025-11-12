import { Router } from "express";
<<<<<<< HEAD
import { requireAuth } from "../middlewares/auth.js";
import { validateCandidate } from "../middlewares/validation.js";
import { createCandidateCtrl, getAllCandidatesCtrl } from "../controllers/candidate.controller.js";

const router = Router();

// ✅ Create new candidate
router.post("/", requireAuth, validateCandidate, createCandidateCtrl);

// ✅ Get all candidates (user-specific)
router.get("/", requireAuth, getAllCandidatesCtrl);
=======
import { addCandidate, listCandidates, addApplication } from "../controllers/candidate.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// ✅ Create candidate
router.post("/candidates", requireAuth, addCandidate);

// ✅ Get all candidates
router.get("/candidates", requireAuth, listCandidates);

// ✅ Create Application for a specific Candidate
router.post("/candidates/:id/applications", requireAuth, addApplication);
>>>>>>> c758860b719337ef852f65648bd34cc4e7d88870

export default router;
