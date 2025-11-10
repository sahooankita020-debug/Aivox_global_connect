import { getMyProfile, updateMyProfile } from '../services/profile.service.js';

export async function getProfile(req, res) {
  try {
    const user = await getMyProfile(req.user.id);

    return res.json({
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        created_at: user.created_at,
        first_name: user.profiles?.first_name ?? null,
        last_name: user.profiles?.last_name ?? null
      }
    });
  } catch (e) {
    return res.status(400).json({ success:false, message:e.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { first_name, last_name } = req.body;
    const profile = await updateMyProfile(req.user.id, { first_name, last_name });

    return res.json({
      success:true,
      profile: {
        first_name: profile.first_name,
        last_name: profile.last_name
      }
    });

  } catch (e) {
    return res.status(400).json({ success:false, message:e.message });
  }
}

