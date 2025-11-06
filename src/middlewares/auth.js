import { verifyJwt } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if(!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success:false, message:"Unauthorized" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyJwt(token);

    req.user = decoded; // user info attached to req

    next();

  } catch (err) {
    return res.status(401).json({ success:false, message:"Invalid or expired token" });
  }
}
