import { supabase } from "../config/supabaseClient.js";

// ✅ Create new candidate
export async function createCandidate(userId, candidateData) {
  const { first_name, last_name, email, skills, experience } = candidateData;

  const { data, error } = await supabase
    .from("candidates")
    .insert([
      {
        first_name,
        last_name,
        email,
        skills,
        experience,
        created_by: userId, // optional if column exists
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllCandidates(userId) {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}



// ✅ Create a new application for a candidate
export async function createApplication(candidateId, userId, appData) {
  const { job_id, position, cover_letter, resume_link, source } = appData;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        candidate_id: candidateId,
        job_id,
        position,
        cover_letter,
        resume_link,
        source,
        applied_by: userId, // jis user ne application banaya
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}