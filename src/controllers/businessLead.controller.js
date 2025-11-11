import {
  createBusinessLead,
  getUserLeads,
  updateLeadStatus,
} from "../services/businessLead.service.js";

// ✅ POST /api/business-leads
export async function createLead(req, res) {
  try {
    const data = await createBusinessLead(req.user.id, req.body);
    return res.status(201).json({ success: true, lead: data });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

// ✅ GET /api/business-leads
export async function getLeads(req, res) {
  try {
    const data = await getUserLeads(req.user.id);
    return res.status(200).json({ success: true, leads: data });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

// ✅ PATCH /api/business-leads/:id/status
export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { lead_status } = req.body;

    // 🔍 validate field
    if (!lead_status) {
      return res.status(400).json({
        success: false,
        message: "lead_status is required",
      });
    }

    // 🔍 validate allowed values
    const allowed = ["open", "in_progress", "closed"];
    if (!allowed.includes(lead_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid lead_status. Allowed: ${allowed.join(", ")}`,
      });
    }

    const data = await updateLeadStatus(id, lead_status);
    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead: data,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}
