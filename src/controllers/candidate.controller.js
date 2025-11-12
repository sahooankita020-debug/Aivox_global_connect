import { createCandidate, getAllCandidates, createApplication } from "../services/candidate.service.js";

// ✅ POST /api/candidates
export async function addCandidate(req, res) {
  try {
    const userId = req.user.id; // requireAuth middleware se milega
    const data = await createCandidate(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      candidate: data,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}


// ✅ GET /api/candidates
export async function listCandidates(req, res) {
  try {
    const userId = req.user.id; // from requireAuth middleware
    const data = await getAllCandidates(userId);

    return res.status(200).json({
      success: true,
      total: data.length,
      candidates: data,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}


// ✅ POST /api/candidates/:id/applications
export async function addApplication(req, res) {
  try {
    const { id } = req.params;  // Candidate ID
    const userId = req.user.id; // Logged in user ID
    const data = await createApplication(id, userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application: data,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}