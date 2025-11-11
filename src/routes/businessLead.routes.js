import { Router } from "express";
import {
  createLead,
  getLeads,
  updateStatus,
} from "../controllers/businessLead.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// ✅ Create lead
router.post("/business-leads", requireAuth, createLead);

// ✅ Get all leads
router.get("/business-leads", requireAuth, getLeads);

// ✅ Update lead status
router.patch("/business-leads/:id/status", requireAuth, updateStatus);

export default router;
