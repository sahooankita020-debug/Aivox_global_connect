import { supabase } from "../config/supabaseClient.js";

// ✅ Create a new lead
export async function createBusinessLead(userId, leadData) {
  const {
    company_name,
    contact_person,
    email,
    phone,
    industry,
    notes,
  } = leadData;

  const { data, error } = await supabase
    .from("business_leads")
    .insert([
      {
        created_by: userId,
        company_name,
        contact_person,
        email,
        phone,
        industry,
        notes,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ✅ Get all leads by logged-in user
export async function getUserLeads(userId) {
  const { data, error } = await supabase
    .from("business_leads")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ✅ Update lead status
export async function updateLeadStatus(leadId, newStatus) {
  // 🧩 Supabase table ke hisaab se allowed statuses:
  const validStatuses = ["open", "in_progress", "closed"];

  if (!validStatuses.includes(newStatus)) {
    throw new Error(
      `Invalid lead_status value. Allowed: ${validStatuses.join(", ")}`
    );
  }

  const { data, error } = await supabase
    .from("business_leads")
    .update({ lead_status: newStatus }) // ✅ column name matches Supabase
    .eq("id", leadId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
